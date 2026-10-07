# Purpose

Work in this directory develops the Toa documentation. It has two sections, each a directory
whose `0.intro.md` is its table of contents and whose subdirectories are chapters.

- `model` explains what Toa is: the runtime's foundational concepts, its main mechanisms, and
  how they fit together. The goal is conceptual understanding, not teaching readers how to use
  it.
- `userspace` teaches a developer to turn business requirements into a working application: what
  to write, which files to create, how to run and test it, how to declare resources. It follows
  the path of someone getting to know the system — an application, a component, a call from the
  command line, an API, a test, configuration, and on by increasing complexity — on one running
  example (a shop: `store.orders`, `store.accounts`). Every article answers "how do I do X?" for
  an X a requirement asks for, and is titled after it. Internals and guarantees are kept to the
  rule they impose on the developer's code, with a link to `model` for the rest. Its last
  chapter, Patterns, is where design decisions are reasoned out — when a call and when an event,
  how a payment is taken — for developers new to distributed systems.

Neither section names or depends on a particular application built on Toa.

# Conventions

An operation refuses by returning an error whose message is its code: `return new Error('CODE')`.

Examples are TypeScript. A whole-file example imports its types from `'../types/index.d.ts'`
under its path comment; see `userspace/logic/19.typescript.md`.

A text does not announce itself. No "this section teaches", "this article covers", "in this
chapter": say the thing.

## Userspace starts from a generated application

The reader's application is the one `toa create store` writes: `context.toa.yaml`,
`docker-compose.yaml`, `ecosystem.config.js`, the `hello` and `notes` components, `features` with
their steps, and the scripts `dock`, `env`, `sys`, `start`, `restart`, `stop`, `features` and
`typecheck`. No article has the reader write one of those files from nothing; a generated file
is explained where the reader first changes it. The application runs as two processes under PM2:
`sys` (the gateway and the services of Toa) and `app` (the components). After a change the
reader runs `npm run restart`; a scenario starts the components itself and needs `npm run sys`.

## An article of userspace stands on its own

The section reads as one story, and every article can still be read alone. An article relies
only on:

1. the generated application;
2. what the article itself shows;
3. what it links to, at the first mention.

So:

- A component, an operation, a property or a file of the shop that the article uses and does not
  create is either shown — the fragment of the manifest or the code the article builds on, under
  its path comment — or linked to the article that creates it. `store.accounts.debit` is not
  known to a reader who starts here.
- Nothing refers to the reader's past without a link: no "as before", "earlier", "the previous
  article", "already", "by now", "the operation from the last chapter".
- A command is written in full every time. Not "run it again", not "start the application as
  usual".
- A term of Toa used and not defined in the article links to where it is defined, once, at its
  first mention.
- A fragment says which file it is in and whether it replaces or adds to what is there.

## The shop

The running example is one application, `store`, and every article shows the same one. A
namespace groups components that make no sense apart; a component any application could use
stands alone, with no namespace. An article never puts a component into a namespace because it
is "part of the shop".

| Component | Is | Created in |
| --- | --- | --- |
| `hello`, `notes` | What `toa create` wrote. | `start/1.application.md` |
| `store.orders` | Orders and their life: `create`, `approve`, `cancel`, `refund`. | `start/3.component.md` |
| `store.catalog` | Products and prices, identified by SKU. | `logic/1.state.md` |
| `store.vouchers` | Counts redemptions of a voucher. | `patterns/8.ownership.md` |
| `store.board`, `store.reports`, `store.search` | Views of orders, kept from their events. | `patterns/6.order.md`, `logic/13.schedules.md`, `logic/15.collections.md` |
| `fulfilment.stock` | What is available; reserves without overselling. | `patterns/5.concurrency.md` |
| `fulfilment.warehouse` | Asks the warehouse to pick an approved order. | `patterns/10.processes.md` |
| `fulfilment.shipments` | Books a carrier and follows a shipment. | `patterns/6.order.md` |
| `fulfilment.dispatch` | Ships an approved order as a workflow of several steps. | `logic/12.workflows.md` |
| `billing.wallets` | A customer's money in the shop: `balance`, `held`; `debit`, `credit`, holds. | `logic/1.state.md` |
| `billing.ledger` | One line for every movement of a wallet. | `patterns/16.wallet.md` |
| `billing.topups` | A top-up from its start to a confirmed payment. | `patterns/14.webhooks.md` |
| `billing.memberships` | A copy of the customer's subscription at the provider. | `patterns/15.mirrors.md` |
| `billing.invoices` | Where an invoice kept by a third party is. | `api/9.streams.md` |
| `payments.gateway` | The one door to the payment provider. | `patterns/13.gateways.md` |
| `payments.webhooks` | What the provider sends, recorded once and published. | `patterns/14.webhooks.md` |
| `support.messages`, `support.contact` | Messages about an order; the "contact us" form. | `api/13.realtime.md`, `patterns/1.call-event-task.md` |
| `accounts` | A customer: the name, what signing up and in need. No money. Associated with the identity. | `access/1.identities.md` |
| `notifications` | Sends mail: `send` takes `{ to, text }`; `receipt` and `notify` are added in `logic/8.receivers.md`. | `logic/11.external.md` |
| `loyalty` | Points for approved orders, tiers (`bronze`, `silver`, `gold`), and a customer's perks. | `logic/8.receivers.md` |
| `pictures` | Product pictures. | `api/11.files.md` |
| `terminals`, `assistant`, `pages`, `audit`, `tools`, `documents`, `store.quotes` | One article each. | where they appear |

What every article agrees on:

- **A component without a namespace** is the directory `components/<name>`, has no `namespace`
  line, is called `context.remote.<name>.<operation>` and `toa call <name>.<operation>`, is
  served under `/<name>/`, is configured in the Context under `<name>:`, publishes
  `<name>.<event>`, and its types are `@components/<name>`.
  The same bare name is what the Context lists it by — in `compositions`, `evicted`, a map of
  addresses, `events` — and what `context.delay` is given. `default.<name>` is its id, which
  the runtime prints: in a log, a trail, an exception, the name of a realtime event.
- **An associated entity has no id of its own: its id is the id of another entity.** That is
  the definition every article uses.
- **A customer's id is the id of everything kept about that customer.** `billing.wallets`,
  `loyalty` and `billing.memberships` are `associated`: nothing creates a wallet when an account
  is created, and reading one never written answers its blank.
  `patterns/9.associated.md` is where that is reasoned out.
- **`billing.wallets.debit`** takes `{ amount, ref }`, both required, and refuses with
  `INSUFFICIENT_FUNDS`. It is idempotent by `ref` and declares no `once`: the wallet keeps what
  it took in `paid` (an object, `ref` to amount, `{}` in the blank), and a debit whose `ref` is
  there sets `DISCARD` and answers as the first did. That is so from its smallest form, in
  `logic/3.errors.md`; no article shows a debit with `amount` alone. `patterns/16.wallet.md`
  states what remembering the refs costs. No runtime feature expires them.
- **`billing.wallets.credit`** takes `{ amount, type, ref }` and declares `once`. It is reached
  by a receiver, a staff route or an effect, never by a transition that retries.
- **`store.orders.cancel`** takes `{ reason }`, puts it in `TRAILERS`, and refuses an order that
  is not pending with `NOT_PENDING`; an article in which a later state can be cancelled shows
  that change.
- **`store.orders.approve`** declares no input (`input: null`) unless the article adds one, and
  then the article shows the declaration. It is `concurrency: retry` in every article, and from
  `logic/3.errors.md` on it calls `billing.wallets.debit` with `ref: entry.id`.
- **A transition declared `concurrency: retry` calls no operation that declares `once`**: the
  runtime refuses the call (`UnrepeatableException`). The way out the articles lead with is to
  make what is called safe to repeat by keying it with what it is for, as `debit` is, so that it
  needs no `once`. A receiver of the transition's event and an effect are the other ways;
  `concurrency: none` is mentioned as rarely right, and no article chooses it for this.
- An article may show less of a component than another does, and never something that
  contradicts it.

# Routines

## Approved content

The user marks approved content with `<!--ok-->...<!--/ok-->`. Everything enclosed by these
comment markers is immutable and must not be edited or deleted. Preserve the markers and their
contents exactly.

## Editorial remarks

Text enclosed in `((...))` is an editorial remark to address. Make the necessary changes,
then remove the remark once it has been addressed. Approved content remains immutable.

## Deferred notes

Text enclosed in `<!--todo-->...<!--/todo-->` contains notes or guidance for future work. Leave these
notes and their contents unchanged, and do not act on them unless the user explicitly asks.
Routine requests to process files do not activate these notes.

## The skill

`skills/toa` is generated from `userspace`. After changing anything in `userspace`, run
`npm run skill`; never edit the skill itself.

# Process

Commit or push changes only when the user explicitly requests it.
