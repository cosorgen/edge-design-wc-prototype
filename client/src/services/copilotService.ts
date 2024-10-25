import { Tab } from '#servicestabService.js';
import { observable } from '@microsoft/fast-element';

export type Message = {
  id: string;
  content: string;
  context?: string;
  timestamp: number;
  role: 'user' | 'system';
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
        messages: {
          'system-prompt': {
            id: 'system-prompt',
            content: `You are a helpful assistant that lives inside of Microsoft Edge. You can see the page I'm looking at and help me with anything I need.`,
            timestamp: Date.now(),
            role: 'system',
            status: 'complete',
          },
        },
      },
    };

    return threadId;
  }

  send(message: string, threadId: string, tab?: Tab) {
    let context = 'An unknown webpage';
    if (tab) {
      if (tab.url === 'edge://newtab')
        context =
          "A page with a beautiful sunset over a lake between two mountians, golden hour, there's a large searchbox in the middle of the page that says 'Search or enter web address'. There's also a news section at the bottom that says 'A stunning new museum in Dubai, an ancient forest discovered in a Chinese sinkhole, and a Korean Air plane’s safe evacuation after overshooting a runway highlight recent global events.' and 'Scroll for more news'.";
      else context = `A webpage titled: ${tab.title} at ${tab.url}`;
    }

    const messageId = 'message' + crypto.randomUUID();
    const thread = this.threadsById[threadId];
    thread.messages = {
      ...thread.messages,
      [messageId]: {
        id: messageId,
        content: message,
        context:
          Object.keys(thread.messages).length === 1
            ? `This is the page i'm looking at: ${context}`
            : undefined,
        timestamp: Date.now(),
        role: 'user',
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
    let thread = this.threadsById[threadId];

    // Sanitize the messages before adding the response message
    const sanitizedMessages = Object.values(thread.messages).map((m) => ({
      role: m.role,
      content:
        m.role === 'user'
          ? `Context: ${m.context}\n\nPrompt: ${m.content}`
          : m.content,
    }));

    // Set up the response
    const responseStart = Date.now();
    const responseId = 'message' + crypto.randomUUID();
    thread.messages[responseId] = {
      id: responseId,
      content: '',
      timestamp: responseStart,
      role: 'system',
      status: 'pending',
    };
    this.threadsById = { ...this.threadsById, thread };

    fetch(
      `/api/chat?q=${encodeURIComponent(message)}&threadId=${encodeURIComponent(threadId)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: sanitizedMessages }),
      },
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
