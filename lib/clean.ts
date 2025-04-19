import sanitize from 'sanitize-html';
export const clean = (str: string) =>
  sanitize(str, { allowedTags: [], allowedAttributes: {} });
