export type Suggestion = {
  type: 'search' | 'entity' | 'history' | 'site' | 'label';
  title: string;
  value: string;
  entityImage?: string;
  subtitle?: string;
  subtitle2?: string;
};

export const generateSuggestions = (query: string) => {
  return fetch(`/api/suggest?q=${query}&enhance=true`).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });
};
