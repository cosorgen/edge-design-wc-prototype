import throwServerError, { ServerError } from './utils.js';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const messages = req.body.messages as string;
    if (!messages) throwServerError('Missing parameters', 400);

    if (process.env.OPENAI_API_KEY === undefined)
      throwServerError('Missing OPENAI_API_KEY', 500);

    const response = await fetch(
      'https://edge-design-prototype.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-08-01-preview',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': `${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.0-mini',
          messages,
        }),
      },
    ).then((r) => {
      if (r.status !== 200)
        throwServerError(
          'Error chat.ts fetch openai: ' + r.statusText,
          r.status,
        );
      return r.json();
    });

    return res.json(response);
  } catch (err) {
    console.error(err);
    const serverError = err as ServerError;
    if (serverError instanceof ServerError) {
      return res.sendStatus(serverError.statusCode || 500);
    }
  }
};
