# docs

The [Toa](https://github.com/toa-io/toa) documentation and its website.

Pages are rendered from the documents in `content`. Each directory there is a section — `model`,
`userspace` — whose `0.intro.md` is its table of contents and whose directories are chapters.

```sh
npm install
npm run dev
```

## Agent skill

`skills/toa` is the `userspace` section as an [agent skill](https://skills.sh):

```sh
npx skills add toa-io/docs
```

It is generated, never edited: `npm run skill` writes it after `content/userspace` changes, and
`npm run lint` fails while it is stale.
