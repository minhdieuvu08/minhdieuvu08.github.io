---
layout: page
title: Instance Segmentation for Medical Equipment
description: Bachelor's thesis, graded 9.5/10, benchmarking 42 instance-segmentation configurations on hospital scenes, then picking the one a robot can actually run.
img: assets/img/projects/cover_instance_segmentation.svg
importance: 0
category: research
---

**Bachelor's thesis · Faculty of Mathematics and Computer Science, VNUHCM – University of Science ·
July 2026 · graded 9.5/10.**
Supervisor: M.Sc. Nguyen Thi Kieu Trang.

Service robots are no longer a futuristic proposition in hospitals, but they go blind in exactly the places
that matter. Equipment varies wildly in size, has highly specific shapes, and sits heavily occluded in crowded
wards. And in a clinical setting a misjudged boundary is not a benchmark loss. Failing to separate a
transparent IV fluid bag from the metal pole it hangs on, or merging two adjacent medical carts into one
object, is an operational failure. That is why the task here is *instance* segmentation rather than detection:
pixel-level delineation is a safety requirement, not an academic nicety.

The thesis is a systematic benchmark of state-of-the-art architectures on that problem, ending in a
deployability judgement rather than a leaderboard entry.

## The HAMP dataset

**HAMP** (Hospital interior Annotations for Multiple Purpose) covers **40 object categories**, 26 carried
over from the Hospital Indoor Object Detection (HIOD) dataset, plus 14 high-touch surfaces added for robotic
interaction. Images combine **2,417 HIOD baseline images with 447 newly collected ones**, filtered by manual
inspection down to **2,864** after removing low-resolution, motion-blurred and near-duplicate frames.

Annotation was bootstrapped with **SAM** for initial masks, then corrected by annotators with medical
backgrounds under a two-step protocol: batches of 100 images reviewed independently by two experts, then a
third expert re-labelling a random 20% of each batch, with the whole batch re-done if inter-reviewer
consistency fell below 90%.

Two properties of the data shape everything downstream:

- **A long tail.** "handle" exceeds 3,500 instances, followed by chair (~1,600), bedside monitor (1,400),
  dispenser (1,300) and bedrail (1,200), while thermometer, otoscope, scanner and linen hamper sit at the
  bottom. The rare classes are disproportionately the clinically interesting ones.
- **Genuine scale diversity.** By MS COCO area conventions: **26.2% small, 37.3% medium, 36.6% large**, with a
  mean of 253.8 contour points per mask. Nothing here lets a model get away with ignoring one scale.

## Benchmark

Forty-two configurations across two paradigms, 36 two-stage (three frameworks × fourteen backbones, minus
the combinations ruled out by baseline or architectural constraints) and 6 YOLO variants, all trained for
60 epochs:

| | Two-stage (MMDetection) | One-stage (YOLO) |
| --- | --- | --- |
| **Frameworks** | Mask R-CNN · Cascade Mask R-CNN · HTC | YOLOv8-Seg · YOLOv11-Seg (S/M/L) |
| **Backbones** | ResNet50/101 · ResNeXt101 · ConvNeXt-T/S/B/L · ConvNeXtv2-T/B/L · PVT-M/L · PVTv2-B3/B4 | n/a |
| **Optimizer** | AdamW, lr 2e-4, batch 8, FP32 | SGD, lr 0.01, batch 128, AMP |
| **Schedule** | Warmup + MultiStepLR | Cosine annealing |

## Accuracy

| Model | mAP | mAP<sub>75</sub> | mAP<sub>S</sub> |
| --- | ---: | ---: | ---: |
| YOLOv8seg-L | 39.1 | 41.0 | 13.2 |
| YOLOv11seg-L *(best single-stage)* | 40.3 | 42.4 | 13.6 |
| Cascade Mask R-CNN + ResNeXt101 | 50.2 | n/a | 20.4 |
| HTC + PVTv2-B4 | 54.6 | n/a | 27.7 |
| HTC + ConvNeXt-L | 56.9 | n/a | **33.5** |
| **HTC + ConvNeXtv2-L** *(peak)* | **57.4** | **62.3** | 30.8 |

The modernized CNNs dominate. ConvNeXtv2-L climbs 55.0 → 55.9 → 57.4 mAP as the head progresses from Mask
R-CNN to Cascade to HTC, confirming that backbone capacity and multi-stage refinement compound rather than
substitute for each other. Against the best single-stage model the gap is **17.1 absolute mAP**, and it is not
evenly spread: at the strict mAP<sub>75</sub> threshold it widens to 19.9 points, and on small objects the
two-stage paradigm is **nearly 2.5× more accurate** (33.5 vs 13.6), precisely the syringes and thermometer
tips that single-shot prototype masks cannot resolve.

## Efficiency, where the accuracy winner loses

| Model | Params (M) | FLOPs (T) | FPS |
| --- | ---: | ---: | ---: |
| YOLOv11seg-S | 10.10 | 0.076 | 37.16 |
| YOLOv8seg-S | 11.81 | 0.091 | 41.55 |
| **Mask R-CNN + ConvNeXt-T** | 47.88 | 0.232 | 5.4 |
| Cascade Mask R-CNN + ResNet50 | 77.17 | 1.177 | 6.2 |
| HTC + ConvNeXtv2-L | 250.00 | 2.202 | **1.0** |

The accuracy champion runs at **1 FPS**. For a robot that has to react to someone stepping into a corridor,
that is not a slow solution, it is not a solution at all.

The table also contains a useful warning against reading FLOPs as a proxy for speed: Cascade Mask R-CNN with
ResNet50 burns 1.177 TFLOPs yet sustains 6.2 FPS, while Mask R-CNN with ConvNeXt-T uses **five times fewer**
operations (0.232 TFLOPs) and still runs slower at 5.4 FPS. Modernized depthwise convolutions are
mathematically lean but introduce memory-access bottlenecks that raw operation counts do not capture.

## Conclusion

The thesis selects **Mask R-CNN with a ConvNeXt-T backbone** as the deployable configuration, 50.3 mAP at
47.88M parameters and 5.4 FPS. It sits on the Pareto frontier: detached from the unusably slow two-stage
cluster, an order of magnitude lighter than the HTC benchmarks, and free of the small-object recall failures
that disqualify the YOLO variants for clinical use.

Stated plainly: the highest number in the study is not the answer to the question the study asks.

## Future work

Semantic SLAM integration, so a robot can separate static structure from movable obstacles rather than
treating both as geometry. Reinforcement learning with reward shaping, to refine mask boundaries that
pixel-wise losses overlook. Unsupervised domain adaptation, for lighting and equipment that change between
wards. And structured pruning, knowledge distillation and INT8/TensorRT quantization, combined with RGB-D or
LiDAR fusion for edge deployment.

<!--
  TODO, once cleared for publication:
  - qualitative segmentation overlays (occlusion, glare, scale-diversity cases)
  - the full Appendix A results table
  - link to the thesis PDF
-->
