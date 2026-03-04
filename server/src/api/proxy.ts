import throwServerError, { ServerError } from './utils.js';
import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';
import NodeCron from 'node-cron';

const cache = new NodeCache();

NodeCron.schedule('0 0 * * *', () => {
  const { vsize, ksize } = cache.getStats();
  const cacheSize = (vsize + ksize) * 0.000001;
  if (cacheSize > 128) cache.flushAll();
});

type ProxyResponse = {
  page: string;
  url: string;
};

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const url = req.query.url as string;
    if (!url) throwServerError('Missing required parameters', 400);

    // validate URL
    const jsUrl = new URL(url); // will throw if invalid
    if (jsUrl.protocol !== 'http:' && jsUrl.protocol !== 'https:')
      throwServerError('Invalid URL', 400);

    // Check if the page is already in the cache
    let response = {
      page: '',
      url,
    };
    const cached = cache.has(url);
    if (cached) {
      response = cache.get(url) as ProxyResponse;
    } else {
      // Call proxy API to get the page, this takes some time.
      // We'll also cache the response for next time.
      if (!process.env.PROXY_API_ENDPOINT || !process.env.PROXY_API_KEY)
        throwServerError('Proxy API not configured', 500);

      fetch(
        `${process.env.PROXY_API_ENDPOINT}/?url=${encodeURIComponent(
          url,
        )}&key=${process.env.PROXY_API_KEY}`,
        { signal: AbortSignal.timeout(60000) }, // 60 second timeout
      )
        .then((res) => res.json())
        .then((res) => {
          // Cache the response
          cache.set(url, {
            page: res.page,
            url: res.url,
          });
        });

      await fetch(url)
        .then((res) => {
          response.url = res.url;
          return res.text();
        })
        .then((page) => {
          response.page = page;
        });
    }

    // Using cherrio to manipulate the DOM, we add a base tag
    // to the head of the document to ensure that relative URLs
    // are resolved correctly.
    const $ = cheerio.load(response.page);
    $('head').prepend(
      `<base href="${jsUrl.protocol + '//' + jsUrl.hostname}">`,
    );
    response.page = $.html();

    // No cache on the client side
    res.set(
      'Cache-Control',
      cached
        ? 'public, max-age=86400'
        : 'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    res.json(response);
  } catch (err) {
    console.error(err);
    if (err instanceof ServerError) {
      res.sendStatus(err.statusCode || 500);
    }
  }
};
