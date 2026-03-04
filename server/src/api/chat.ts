import throwServerError, { ServerError } from './utils.js';
import { Request, Response } from 'express';

type OpenAIApiEndpoints = Array<Record<string, string>>;

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = req.body.messages as string;
    if (!messages) throwServerError('Missing parameters', 400);

    if (!process.env.OPENAI_API_ENDPOINTS)
      throwServerError('Missing OpenAI configuration', 500);

    const endpoints = JSON.parse(
      process.env.OPENAI_API_ENDPOINTS!,
    ) as OpenAIApiEndpoints;

    let response;
    for (let x = 0; x < endpoints.length; x++) {
      const endpoint = endpoints[x];
      response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': `${endpoint.key}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages,
        }),
      }).then((r) => {
        if (r.status !== 200) {
          if (x === endpoints.length - 1) {
            // Throw error on last endpoint
            throwServerError(r.statusText, r.status);
          }
          console.warn(r.statusText, r.status);
          return;
        }
        return r.json();
      });

      if (response) break;
    }

    res.json(response);
  } catch (err) {
    console.error(err);
    if (err instanceof ServerError) {
      res.sendStatus(err.statusCode || 500);
    }
  }
};
