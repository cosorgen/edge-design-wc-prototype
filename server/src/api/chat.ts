import throwServerError, { ServerError } from './utils.js';
import { Request, Response } from 'express';

type ChatThread = {
  id: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
};

const threads: Record<string, ChatThread> = {};

const promptMessage =
  'You are a helpful assistant that lives inside of Microsoft Edge. Pretend you can see the web page that I am looking at and help me find the information I need. You also have access to all of my open tabs, history, and browsing habits.';

export default async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const threadId = req.query.threadId as string;
    if (!q || !threadId) throwServerError('Missing parameters', 400);

    if (process.env.OPENAI_API_KEY === undefined)
      throwServerError('Missing OPENAI_API_KEY', 500);

    // Create a new thread if it doesn't exist
    if (!threads[threadId]) {
      threads[threadId] = {
        id: threadId as string,
        messages: [
          {
            role: 'system',
            content: promptMessage,
          },
        ],
      };
    }

    // Push the user message to the thread
    threads[threadId].messages.push({
      role: 'user',
      content: q,
    });

    const response = await fetch(
      'https://edge-openai-labs.openai.azure.com/openai/deployments/edge-4o-prototype/chat/completions?api-version=2024-02-15-preview',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': `${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.0-mini',
          messages: threads[threadId].messages,
        }),
      },
    ).then((r) => {
      if (r.status !== 200)
        throwServerError(
          'Error /server/src/api/chat.ts line 29: ' + r.statusText,
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
