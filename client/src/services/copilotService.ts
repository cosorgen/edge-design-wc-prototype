import { Tab } from '#servicestabService.js';
import { observable } from '@microsoft/fast-element';
import minify from './html-minify.js';

export type Message = {
  id: string;
  content: string;
  timestamp: number;
  role: 'user' | 'system' | 'context';
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
  @observable composerActive = true;
  @observable threadsById: Record<string, Thread> = {};

  browserContextChanged(threadId: string, tab: Tab) {
    let content = 'An unknown webpage';
    if (tab) {
      if (tab.url === 'edge://newtab') {
        content =
          "I am now looking at a page with a beautiful sunset over a lake between two mountians, golden hour, there's a large searchbox in the middle of the page that says 'Search or enter web address'. There's also a news section at the bottom that says 'A stunning new museum in Dubai, an ancient forest discovered in a Chinese sinkhole, and a Korean Air plane’s safe evacuation after overshooting a runway highlight recent global events.' and 'Scroll for more news'.";
      } else if (tab.page) {
        // Prepare the page for the LLM
        const page = minify(tab.page);
        content = `I am now looking at this webpage: \`\`\` ${page} \`\`\``;
      }
    }

    const chunkSize = 1024;
    for (let i = 0; i < content.length; i += chunkSize) {
      const messageId = 'message' + crypto.randomUUID();
      const thread = this.threadsById[threadId];

      thread.messages = {
        ...thread.messages,
        [messageId]: {
          id: messageId,
          content: content.slice(i, i + chunkSize),
          timestamp: Date.now(),
          role: 'context',
          status: 'complete',
        },
      };
      this.threadsById = { ...this.threadsById, thread };
    }
  }

  newThread() {
    const threadId = 'thread-' + crypto.randomUUID();
    this.threadsById = {
      ...this.threadsById,
      [threadId]: {
        id: threadId,
        messages: {
          'system-prompt': {
            id: 'system-prompt',
            content: `You are a helpful assistant that lives inside of Microsoft Edge. You can see the pages I'm looking at and help me with anything I need.`,
            timestamp: Date.now(),
            role: 'system',
            status: 'complete',
          },
        },
      },
    };

    return threadId;
  }

  send(content: string, threadId: string) {
    const messageId = 'message' + crypto.randomUUID();
    const thread = this.threadsById[threadId];
    thread.messages = {
      ...thread.messages,
      [messageId]: {
        id: messageId,
        content,
        timestamp: Date.now(),
        role: 'user',
        status: 'complete',
      },
    };
    this.threadsById = { ...this.threadsById, thread };
    this.fetchResponse(threadId);
  }

  fetchResponse(threadId: string) {
    let thread = this.threadsById[threadId];

    // Sanitize the messages before adding the response message
    const sanitizedMessages = Object.values(thread.messages).map((m) => ({
      role: m.role === 'context' ? 'user' : m.role,
      content: m.content,
    }));
    console.log(sanitizedMessages);

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

    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: sanitizedMessages }),
    })
      .then((r) => {
        if (!r.ok) {
          console.error(r.statusText, r.status);
          // Update the response message with the error
          thread = this.threadsById[threadId];
          thread.messages[responseId].status = 'error';
          thread.messages[responseId].content =
            `Error: ${r.status} ${r.statusText}`;
          this.threadsById = { ...this.threadsById, thread };
        }
        return r.json();
      })
      .then((r: OpenAIResponse) => {
        if (r.choices.length <= 0) console.error('No response');
        // Update the response message with the content
        thread = this.threadsById[threadId];
        thread.messages[responseId].content = r.choices[0].message.content;
        this.threadsById = { ...this.threadsById, thread };

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
