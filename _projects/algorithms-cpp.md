---
layout: page
title: Algorithms in C++
description: A topic-organised collection of algorithm implementations and LeetCode solutions in modern C++, each with its own write-up.
img: assets/img/projects/cover_algorithms.svg
importance: 2
category: foundations
github: https://github.com/minhdieuvu08/algorithms-cpp
---

Algorithm practice in C++, filed by technique rather than by problem number, because the useful unit is the
pattern, not the puzzle.

```text
searching/
└── binary_search/
    ├── binary_search.cpp      # The canonical implementation
    ├── leetcode_34/           # Find first & last position of an element
    └── leetcode_35/           # Search insert position
```

Each technique folder starts with a clean reference implementation, then collects the problems that are really
that technique in disguise. Every problem keeps its own `README.md` alongside the solution, covering the
reasoning and the complexity, since writing the argument down is what separates having solved a problem from
being able to solve the next one like it.
