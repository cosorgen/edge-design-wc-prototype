import { Tab } from '#servicestabService.js';
import { observable } from '@microsoft/fast-element';

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

function recurseDoc(
  node: Node,
  parent: Node | null,
  searchFunc: (node: Node) => boolean,
  actionFunc: (node: Node, parent: Node) => void,
) {
  if (searchFunc(node)) {
    console.log('found node:', node);
    actionFunc(node, parent || node);
  } else {
    node.childNodes.forEach((child) =>
      recurseDoc(child, node, searchFunc, actionFunc),
    );
  }
}

export class CopilotService {
  @observable composerActive = true;
  @observable threadsById: Record<string, Thread> = {};

  compressPage(page: string) {
    // Prepare the page for the LLM
    const parser = new DOMParser();
    const doc = parser.parseFromString(page, 'text/html');

    // Remove everything from head except for the title, description, and keywords
    const head = doc.querySelector('head');
    if (!head) return;
    const title = head.querySelector('title');
    const description = head.querySelector('meta[name="description"]');
    const keywords = head.querySelector('meta[name="keywords"]');
    head.innerHTML = '';
    if (title) head.appendChild(title);
    if (description) head.appendChild(description);
    if (keywords) head.appendChild(keywords);

    // Remove any script tags
    doc.querySelectorAll('script').forEach((s) => s.remove());

    // Remove any styles
    doc.querySelectorAll('style').forEach((s) => s.remove());

    // Remove any svgs
    doc.querySelectorAll('svg').forEach((s) => s.remove());

    // Remove all attributes from all tags except in include set
    const skipAttrs = ['alt'];
    doc.querySelectorAll('*').forEach((el) => {
      for (let i = el.attributes.length - 1; i >= 0; i--) {
        if (!skipAttrs.includes(el.attributes[i].name))
          el.removeAttribute(el.attributes[i].name);
      }
    });

    // Remove any comment nodes from the page
    recurseDoc(
      doc,
      null,
      (node) => node.nodeType === Node.COMMENT_NODE, // Search function
      (node, parent) => parent.removeChild(node), // Action function
    );

    // Remove any empty tags
    // !!!NEEDS TO BE LAST!!!
    const selfClosingTags = [
      'IMG',
      'INPUT',
      'AREA',
      'BR',
      'COL',
      'HR',
      'SOURCE',
    ];
    recurseDoc(
      doc,
      null,
      (node) =>
        node.childNodes.length === 0 &&
        node.nodeType === Node.ELEMENT_NODE &&
        !selfClosingTags.includes((node as HTMLElement).tagName), // Search function
      (node, parent) => parent.removeChild(node), // Action function
    );

    // Serialize the page
    const serializer = new XMLSerializer();
    const string = serializer.serializeToString(doc.documentElement);

    return string
      .replace(/>[\s\n\t]+</gm, '><') // Remove whitespace between tags
      .replace(/\s{2,}/gm, ' '); // Collapse multiple spaces
  }

  browserContextChanged(threadId: string, tab: Tab) {
    const messageId = 'message' + crypto.randomUUID();
    const thread = this.threadsById[threadId];

    let content = 'An unknown webpage';
    if (tab) {
      if (tab.url === 'edge://newtab') {
        content =
          "I am now looking at a page with a beautiful sunset over a lake between two mountians, golden hour, there's a large searchbox in the middle of the page that says 'Search or enter web address'. There's also a news section at the bottom that says 'A stunning new museum in Dubai, an ancient forest discovered in a Chinese sinkhole, and a Korean Air plane’s safe evacuation after overshooting a runway highlight recent global events.' and 'Scroll for more news'.";
      } else if (tab.page) {
        // Prepare the page for the LLM
        const page = this.compressPage(tab.page);
        content = `I am now looking at this webpage: ${page}`;
      }
    }

    thread.messages = {
      ...thread.messages,
      [messageId]: {
        id: messageId,
        content,
        timestamp: Date.now(),
        role: 'context',
        status: 'complete',
      },
    };
    this.threadsById = { ...this.threadsById, thread };
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
