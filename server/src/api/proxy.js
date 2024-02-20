import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import throwServerError, { ServerError } from './utils.js';
export default async (req, res) => {
    try {
        const url = req.query.url;
        if (url === undefined)
            throwServerError('Missing URL', 400);
        // validate URL
        const jsUrl = new URL(url); // will throw if invalid
        if (jsUrl.protocol !== 'http:' && jsUrl.protocol !== 'https:')
            throwServerError('Invalid URL', 400);
        const valid = await fetch(url, { method: 'HEAD' }).then((r) => r.ok);
        if (!valid)
            throwServerError(`${url} not found`, 404);
        return fetch(url)
            .then((r) => r.text())
            .then((text) => {
            const $ = cheerio.load(text);
            $('head').prepend(`<base href="${url}">`);
            res.set('Cache-Control', 'public, max-age=86400'); // one day
            return res.send($.html());
        });
    }
    catch (err) {
        console.error(err);
        const serverError = err;
        if (serverError instanceof ServerError) {
            return res.sendStatus(serverError.statusCode || 500);
        }
    }
};
