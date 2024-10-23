import { observable } from '@microsoft/fast-element';

export type Message = {
  id: string;
  tokens: string[];
  timestamp: number;
  author: 'user' | 'system';
  status: 'pending' | 'complete' | 'error';
};

export type Thread = {
  id: string;
  messages: Record<string, Message>;
};

const MAX_TOKEN_COUNT = 100;
const MAX_INTERVAL_BETWEEN_TOKENS = 1000;
const MAX_WORDS_IN_TOKEN = 3;
const words = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'Ut',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'ut',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'Duis',
  'aute',
  'irure',
  'dolor',
  'in',
  'reprehenderit',
  'in',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'dolore',
  'eu',
  'fugiat',
  'nulla',
  'pariatur',
  'Excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'in',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum',
];

export class CopilotService {
  @observable threadIds: string[] = [];
  @observable threadsById: Record<string, Thread> = {};
  _tokenCount: number = 0;

  send(message: string, threadId?: string) {
    const messageId = crypto.randomUUID();

    if (!threadId) {
      threadId = crypto.randomUUID();
      this.threadIds.push(threadId);
      this.threadsById = {
        ...this.threadsById,
        [threadId]: {
          id: threadId,
          messages: {
            [messageId]: {
              id: messageId,
              tokens: [message],
              timestamp: Date.now(),
              author: 'user',
              status: 'complete',
            },
          },
        },
      };
    } else {
      const thread = this.threadsById[threadId];
      thread.messages = {
        ...thread.messages,
        [messageId]: {
          id: messageId,
          tokens: [message],
          timestamp: Date.now(),
          author: 'user',
          status: 'complete',
        },
      };
      this.threadsById = { ...this.threadsById, thread };
    }

    this.listenForResponse(threadId);

    return threadId;
  }

  recieve(token: string, threadId: string, messageId: string) {
    const thread = this.threadsById[threadId];
    thread.messages[messageId].tokens.push(token);
    this.threadsById = { ...this.threadsById, thread };
  }

  async listenForResponse(threadId: string) {
    // Simulate a response from the server

    // Set up the response
    let thread = this.threadsById[threadId];
    const responseId = crypto.randomUUID();
    thread.messages[responseId] = {
      id: responseId,
      tokens: [],
      timestamp: Date.now(),
      author: 'system',
      status: 'pending',
    };
    this.threadsById = { ...this.threadsById, thread };

    // Generate tokens for the response
    this._tokenCount = Math.random() * MAX_TOKEN_COUNT;
    while (this._tokenCount > 0) {
      const token = await this.generateTokens();
      this.recieve(token, threadId, responseId);
      this._tokenCount--;
    }

    // Mark the response as complete
    thread = this.threadsById[threadId];
    thread.messages[responseId].status = 'complete';
    this.threadsById = { ...this.threadsById, thread };
  }

  generateTokens(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const numWords = 1 + Math.floor(Math.random() * MAX_WORDS_IN_TOKEN);
        let token = '';
        for (let i = 0; i < numWords; i++) {
          token += this.randomWord() + ' ';
        }
        resolve(token);
      }, Math.random() * MAX_INTERVAL_BETWEEN_TOKENS);
    });
  }

  randomWord() {
    return words[Math.floor(Math.random() * words.length - 1)];
  }
}
