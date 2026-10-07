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

## Agent skill

`skills/toa` is the `userspace` section as an [agent skill](https://skills.sh): `0.intro.md` is
its `SKILL.md`, and links to `model` point at the website.

```sh
npx skills add toa-io/docs   # install
npx skills update            # get a newer version
```

That command clones this repository, so the skill is committed, unlike the pages. It is
generated, never edited: the pre-commit hook writes it (`npm run skill`) and adds it to the
commit, and `npm run lint`, which runs on every pull request, fails while it is stale.
