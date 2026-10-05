# Purpose

Work in this directory develops the Toa documentation. It has two sections, each a directory
whose `0.intro.md` is its table of contents and whose subdirectories are chapters.

- `model` explains what Toa is: the runtime's foundational concepts, its main mechanisms, and
  how they fit together. The goal is conceptual understanding, not teaching readers how to use
  it.
- `userspace` teaches how to build applications: what to declare, what to call, what comes back,
  and what the developer has to handle. It goes from simple to complicated, on one running
  example (a shop: `store.orders`, `store.accounts`), and links to `model` for the concepts
  instead of repeating them. Read front to back, it covers every option and feature.

Neither section names or depends on a particular application built on Toa.

# Conventions

An operation refuses by returning an error whose message is its code: `return new Error('CODE')`.

A text does not announce itself. No "this section teaches", "this article covers", "in this
chapter": say the thing.

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

# Process

Commit or push changes only when the user explicitly requests it.
