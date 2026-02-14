export type Suggestion = {
  type: 'search' | 'entity' | 'history' | 'site' | 'label';
  title: string;
  value: string;
  entityImage?: string;
  subtitle?: string;
  subtitle2?: string;
  attribution?: string;
};

const fakeSuggestions: Suggestion[] = [
  {
    type: 'search',
    title: 'ai chat',
    value: 'https://www.bing.com/search?q=ai+chat',
  },
  {
    type: 'entity',
    title: 'Airbnb',
    value: 'https://bing.com/search?q=airbnb',
    entityImage:
      'https://th.bing.com/th/id/OADD2.7627997325644_1IE4YGAOVBKCPKI5TI?w=32&h=32&o=6&pid=21.2',
  },
  {
    type: 'search',
    title: 'ai chat gpt',
    value: 'https://www.bing.com/search?q=ai+chat+gpt',
  },
  {
    type: 'search',
    title: 'airbnb rentals',
    value: 'https://www.bing.com/search?q=airbnb+rentals',
  },
  {
    type: 'search',
    title: 'airport',
    value: 'https://www.bing.com/search?q=airport',
  },
  {
    type: 'search',
    title: 'airport near me',
    value: 'https://www.bing.com/search?q=airport+near+me',
  },
  {
    type: 'site',
    title: 'Microsoft Copilot: Your AI companion',
    value: 'https://copilot.microsoft.com/',
    entityImage:
      'https://th.bing.com/th/id/OADD2.7490526621980_1LCXYA2OBGKMW1YVK2?w=32&h=32&o=6&pid=21.2',
  },
  {
    type: 'site',
    title: 'Microsoft AI',
    value: 'https://www.microsoft.ai',
    subtitle: 'Contoso results',
    entityImage:
      'https://th.bing.com/th/id/ODF.rqyqwwiFm44pHdWs4aPZ9Q?w=32&h=32&qlt=92&pcl=fffffa&o=6&pid=1.2',
  },
];

let apiWorking = true;

export const generateSuggestions = async (query: string) => {
  return fetch(`/api/suggest?q=${query}&enhance=true`).then((res) => {
    if (!res.ok && apiWorking) {
      apiWorking = false;
      console.error(res.status, res.statusText);
      return { q: query, suggestions: fakeSuggestions };
    } else if (!res.ok && !apiWorking) {
      return { q: query, suggestions: fakeSuggestions };
    }
    apiWorking = true;
    return res.json();
  });
};
