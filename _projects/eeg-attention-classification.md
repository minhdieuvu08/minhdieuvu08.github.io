---
layout: page
title: Mental Attention States from EEG
description: Classifying focused, unfocused and drowsy states from raw EEG recordings, covering signal processing, feature engineering, and a comparison of classical and sequence models.
img: assets/img/projects/cover_eeg.svg
importance: 3
category: research
github: https://github.com/minhdieuvu08/Mental_Attention_States_Classification_Using_EEG_Data
---

A full pipeline from raw EEG recordings to attention-state predictions, built around the EEG mental-attention
dataset of continuous driving-simulator sessions.

## Signal processing

The raw MATLAB recordings are read channel by channel, keeping the valid leads (channels 4–17). Each channel
is then band-pass filtered with a Butterworth filter applied via `filtfilt` (zero-phase, so the filter does not
smear event timing) and z-transformed, giving per-channel signals on a comparable scale before any feature is
computed.

## Features

Spectral and statistical descriptors per channel and per window: Welch power spectral density across the
standard EEG bands, plus skewness, kurtosis and entropy. Dimensionality is handled with PCA and FastICA,
ICA in particular because EEG channels are heavily mixed at the scalp and independent components separate
sources better than variance-ranked ones. A graph view of inter-channel relationships (NetworkX + Louvain
community detection) is used to inspect which channel groups move together.

## Models

Classical baselines, namely SVM, logistic regression, random forest and k-NN, evaluated with stratified
k-fold cross-validation, against sequence models (SimpleRNN and LSTM, Keras) that use the temporal structure the
classical models discard. Scoring covers accuracy, precision, recall, F1 and confusion matrices, since the
classes are not equally represented and accuracy alone would flatter the majority class.
