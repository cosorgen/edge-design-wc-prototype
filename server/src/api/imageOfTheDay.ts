import throwServerError, { ServerError } from './utils.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    // Fetch metadata if not cached
    const imageURL = await fetch(
      'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
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

    // Return
    return res.send(imageURL);
  } catch (err) {
    console.error(err);
    const serverError = err as ServerError;
    if (serverError instanceof ServerError) {
      return res.sendStatus(serverError.statusCode || 500);
    }
  }
};
