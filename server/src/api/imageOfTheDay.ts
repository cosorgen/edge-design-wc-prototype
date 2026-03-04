import throwServerError, { ServerError } from './utils.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    if (!process.env.IMAGE_OF_THE_DAY_API_ENDPOINT)
      throwServerError('Image of the day API not configured', 500);

    // Fetch metadata if not cached
    const imageURL = await fetch(
      `${process.env.IMAGE_OF_THE_DAY_API_ENDPOINT}?format=js&idx=0&n=1&mkt=en-US`,
    )
      .then((r) => {
        if (!r.ok) throwServerError('Failed to fetch', r.status);
        return r.json();
      })
      .then((data) => {
        if (!data.images || !data.images.length)
          throwServerError(
            'No images returned from Bing image of the day.',
            500,
          );
        return `https://www.bing.com${data.images[0].url}`;
      });

    // Calculate cache time
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const timeSinceStartOfDay = now.getTime() - startOfDay.getTime();
    const cacheTime = 24 * 60 * 60 * 1000 - timeSinceStartOfDay;

    // Set cache headers
    res.setHeader('Cache-Control', `public, max-age=${cacheTime / 1000}`);
    res.send(imageURL);
  } catch (err) {
    console.error(err);
    if (err instanceof ServerError) {
      res.sendStatus(err.statusCode || 500);
    }
  }
};
