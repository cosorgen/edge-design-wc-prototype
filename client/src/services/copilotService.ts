import { observable } from '@microsoft/fast-element';

export type Message = {
  content: string;
  timestamp: number;
  author: 'user' | 'system';
};

export type Thread = {
  id: string;
  messages: Message[];
};

const MAX_TOKEN_COUNT = 100;
const MAX_INTERVAL_BETWEEN_TOKENS = 1000;
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
  @observable threadById: Record<string, Thread> = {};
  _tokenCount: number = 0;

  send(message: string, threadId?: string): void {
    if (!threadId) {
      const threadId = crypto.randomUUID();
      this.threadIds.push(threadId);
      this.threadById[threadId] = {
        id: threadId,
        messages: [
          {
            content: message,
            timestamp: Date.now(),
            author: 'user',
          },
        ],
      };
    } else {
      this.threadById[threadId].messages = [
        ...this.threadById[threadId].messages,
        {
          content: message,
          timestamp: Date.now(),
          author: 'user',
        },
      ];
    }

    this.listenForResponse(threadId);
  }

  recieve(message: string, threadId: string): void {
    this.threadById[threadId].messages = [
      ...this.threadById[threadId].messages,
      {
        content: message,
        timestamp: Date.now(),
        author: 'system',
      },
    ];
  }

  listenForResponse(threadId: string): void {
    this._tokenCount = Math.random() * MAX_TOKEN_COUNT;

    // Simulate a response from the server
    this.generateTokens(threadId);
  }

  generateTokens(threadId: string): void {
    let response = '';
    setTimeout(() => {
      while (this._tokenCount > 0) {
        
        this._tokenCount--;
      }
    }, Math.random() * MAX_INTERVAL_BETWEEN_TOKENS);
  }
}
