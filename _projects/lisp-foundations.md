---
layout: page
title: Lisp Foundations
description: Working through Winston & Horn's LISP (3rd ed.) in SBCL — chapter by chapter, with independent solutions to every exercise.
img: assets/img/projects/cover_lisp.svg
importance: 1
category: foundations
github: https://github.com/minhdieuvu08/lisp-foundations
---

A long-running study of Common Lisp based on **Winston & Horn, *LISP* (3rd edition)**. The point is not the
language as a tool but the way it forces recursion, symbolic data and evaluation itself to be thought about
explicitly — which changes how you read every other language afterwards.

## Structure

The repository is organised by chapter, so the progression mirrors the book rather than a topic index:

```text
.
├── chapter03/
├── chapter04/
│   ├── implementation.lisp    # Predicates & conditionals
│   └── practices/
│       └── problem-4-1.lisp
├── ...
└── chapter11/
    ├── implementation.lisp    # Properties and arrays
    └── practices/
        └── problem-11-6.lisp  # Checkerboard evaluation
```

Each chapter holds two things: `implementation.lisp`, where the textbook's own examples are transcribed and
poked at, and `practices/`, where the end-of-chapter exercises are solved independently before checking
against the book.

## Environment

**SBCL (Steel Bank Common Lisp)**. Any file runs standalone from the repository root:

```bash
sbcl --script chapter11/practices/problem-11-6.lisp
```
