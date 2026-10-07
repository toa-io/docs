// a query shorter than this finds nothing worth showing
export const MIN = 2;

export const query = (url: URL) => url.searchParams.get('q')?.trim() ?? '';

// the page and the JSON are two representations of one address
export const headers = { vary: 'Accept', 'cache-control': 'private, max-age=3600' };
