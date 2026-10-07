# docs

The [Toa](https://github.com/toa-io/toa) documentation and its website.

Pages are rendered from the documents in `content`. Each directory there is a section — `model`,
`userspace` — whose `0.intro.md` is its table of contents and whose directories are chapters.

```sh
npm install
npm run dev
```

## Website

`npm run deploy` builds every document into a static page and uploads the pages to Cloudflare.
Nothing reads the documents at runtime, and nothing that is built is committed.

A file in `static/immutable` is served at `/immutable/…` and cached for a month, as `_headers`
says, so it never changes: a new version of it takes a new name.

## Agent skill

`skills/toa` is the `userspace` section as an [agent skill](https://skills.sh): `0.intro.md` is
its `SKILL.md`, and links to `model` point at the website.

```sh
npx skills add toa-io/docs   # install
npx skills update            # get a newer version
```

That command clones this repository, so the skill is committed, unlike the pages. It is
generated, never edited: the pre-commit hook writes it (`npm run skill`) and adds it to the
commit, and `npm run lint` fails while it is stale.

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
