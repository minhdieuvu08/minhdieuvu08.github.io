---
layout: page
title: LLM-Augmented Reinforcement Learning
description: Using Gemini-generated Python heuristics to shape rewards and Q-values for Atari Space Invaders agents (PPO & Q-Learning).
img: assets/img/projects/cover_llm_rl.svg
importance: 2
category: research
github: https://github.com/minhdieuvu08/LLM-Augmented-RL
---

Two experiments on the same question: can a large language model supply the prior knowledge that a
reinforcement-learning agent would otherwise have to discover by random exploration? The testbed is
**Atari Space Invaders** (Gymnasium/ALE), with a Tetris baseline as a secondary environment.

## 1. PPO with reward shaping

Proximal Policy Optimization (Stable-Baselines3) wrapped in a custom environment wrapper that attacks
the sparse-reward problem directly:

- **Penalties** up to `-5.0` when the agent loses a life.
- **Incentives**: small auxiliary rewards for firing and for strategic lateral movement.
- A dedicated experiment trains a baseline and a reward-shaped model side by side and plots the
  comparative learning curves, so the effect of shaping on convergence is visible rather than asserted.

{% include figure.liquid loading="lazy" path="assets/img/projects/rl_ppo_comparison.png" class="img-fluid rounded z-depth-1" zoomable=true caption="PPO baseline vs. reward-shaped agent: comparative learning curves." %}

## 2. LLM-guided Q-shaping

The more interesting direction. A population of 20 tabular Q-Learning agents is trained, with
**Google Gemini** inserted into the loop:

1. **Explore** — agents collect state-action data and discover relevant game states.
2. **Consult** — a simplified `14 × 14` spatial grid of the environment is sent to the Gemini API.
3. **Generate** — Gemini returns a Python function `heuristic_logic(grid_14x14)` encoding spatial reasoning rules.
4. **Inject** — the heuristic labels "good" and "bad" actions for discovered states, and those biases are
   written straight into the Q-table.

The shaping rules are then applied across the whole agent population, which cuts short the random-walk
phase that dominates early tabular Q-Learning.

{% include figure.liquid loading="lazy" path="assets/img/projects/rl_q_comparison.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Standard Q-Learning vs. LLM-shaped Q-Learning over a 100-episode evaluation window." %}

Evaluation is deliberately run over a 100-episode window and reported three ways — raw reward per episode,
cumulative reward (the "learning lead"), and per-episode score difference — because a single averaged number
hides how uneven the advantage is across episodes.

## Stack

Stable-Baselines3, PyTorch, Gymnasium (ALE), `google-generativeai`, NumPy, Matplotlib, TensorBoard.
