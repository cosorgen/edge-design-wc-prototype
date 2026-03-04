import { Request, Response } from 'express';
import throwServerError, { ServerError } from './utils.js';

export type WeatherResponse = {
  temp: number;
  condition: string;
  icon: string;
};

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const longitude = req.query.lon as string;
    const latitude = req.query.lat as string;
    const result: WeatherResponse = {
      temp: 0,
      condition: '',
      icon: '',
    };

    if (!longitude || !latitude)
      throwServerError(`Missing query parameter(s)`, 400);

    if (!process.env.WEATHER_APP_ENDPOINT)
      throwServerError('Missing weather app endpoint', 500);

    if (!process.env.WEATHER_APP_ID)
      throwServerError('Missing weather app id', 500);

    await fetch(
      `${process.env.WEATHER_APP_ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_APP_ID}`,
    )
      .then((res) => res.json())
      .then((data) => {
        result.temp = Math.round(((data.main.temp - 273.15) * 9) / 5 + 32);
        result.condition = data.weather[0].main;
        result.icon = data.weather[0].icon.substring(0, 2);
      })
      .catch((err) => {
        throwServerError(err, 500);
      });

    res.set('Cache-Control', 'public, max-age=3600'); // one hour
    res.json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof ServerError) {
      res.sendStatus(err.statusCode || 500);
    }
  }
};
