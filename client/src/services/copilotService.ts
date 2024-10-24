import { observable } from '@microsoft/fast-element';

export type Message = {
  id: string;
  content: string;
  timestamp: number;
  author: 'user' | 'system';
  status: 'pending' | 'complete' | 'error';
};

export type Thread = {
  id: string;
  messages: Record<string, Message>;
};

export type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    message: { role: string; content: string };
    index: number;
    finish_reason: string;
  }>;
};

export class CopilotService {
  @observable threadsById: Record<string, Thread> = {};

  newThread() {
    const threadId = 'thread-' + crypto.randomUUID();
    this.threadsById = {
      ...this.threadsById,
      [threadId]: {
        id: threadId,
        messages: {},
      },
    };

    return threadId;
  }

  send(message: string, threadId: string) {
    const messageId = 'message' + crypto.randomUUID();
    const thread = this.threadsById[threadId];
    thread.messages = {
      ...thread.messages,
      [messageId]: {
        id: messageId,
        content: message,
        timestamp: Date.now(),
        author: 'user',
        status: 'complete',
      },
    };
    this.threadsById = { ...this.threadsById, thread };
    this.fetchResponse(message, threadId);
  }

  recieve(response: string, threadId: string, messageId: string) {
    const thread = this.threadsById[threadId];
    thread.messages[messageId].content = response;
    this.threadsById = { ...this.threadsById, thread };
  }

  fetchResponse(message: string, threadId: string) {
    // Set up the response
    const responseStart = Date.now();
    let thread = this.threadsById[threadId];
    const responseId = 'message' + crypto.randomUUID();
    thread.messages[responseId] = {
      id: responseId,
      content: '',
      timestamp: responseStart,
      author: 'system',
      status: 'pending',
    };
    this.threadsById = { ...this.threadsById, thread };

    fetch(
      `/api/chat?q=${encodeURIComponent(message)}&threadId=${encodeURIComponent(threadId)}`,
    )
      .then((r) => {
        if (!r.ok) console.error(r.statusText, r.status);
        return r.json();
      })
      .then((r: OpenAIResponse) => {
        if (r.choices.length <= 0) console.error('No response');
        this.recieve(r.choices[0].message.content, threadId, responseId);

        // Mark the response as complete but not too fast or we won't see the animation
        const delayBeforeComplete = Math.max(
          0,
          1000 - (Date.now() - responseStart),
        );
        setTimeout(() => {
          thread = this.threadsById[threadId];
          thread.messages[responseId].status = 'complete';
          this.threadsById = { ...this.threadsById, thread };
        }, delayBeforeComplete);
      });
  }
}
