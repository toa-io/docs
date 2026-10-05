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
