# docs

The [Toa](https://github.com/toa-io/toa) documentation and its website.

Pages are rendered from the documents in `content`. Each directory there is a section — `model`,
`userspace` — whose `0.intro.md` is its table of contents and whose directories are chapters.

```sh
npm install
npm run dev
```

## Search

`⌘K`, `Ctrl+K` or `/` opens the search; `/search/?q=…` is the same search as a page, and as JSON
for a request that accepts `application/json`.

It asks `toa-docs`, a [Cloudflare AI Search](https://developers.cloudflare.com/ai-search/)
instance that crawls `https://toa.io` by its `sitemap.xml` and is bound to the worker as `SEARCH`
in `wrangler.jsonc`. The instance was created once:

```sh
npx wrangler ai-search create toa-docs --type web-crawler --source toa.io \
  --hybrid-search --reranking --cache
```

`npm run deploy` asks it to crawl the site again, and it does so by itself every six hours.

The index is at Cloudflare only, so on a dev server the search answers that it is unavailable.
With the credentials of the account, `REMOTE=true npm run dev` asks the deployed index.
