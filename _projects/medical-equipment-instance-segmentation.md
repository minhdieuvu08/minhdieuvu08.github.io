---
layout: page
title: Instance Segmentation for Medical Equipment
description: Undergraduate thesis — benchmarking 30+ instance-segmentation configurations on hospital equipment, peaking at 57.4 mAP with Hybrid Task Cascade and ConvNeXtv2-L.
img: assets/img/projects/cover_instance_segmentation.svg
importance: 0
category: research
---

**Undergraduate thesis, VNUHCM – University of Science. July 2026 – present.**

Hospital corridors and wards are cluttered, mobile and visually repetitive: beds, IV stands, monitors and
trolleys move constantly, occlude each other, and often look alike across manufacturers. An autonomous system
operating in that environment needs to separate *instances*, not just recognise categories — knowing that
there are three trolleys and where each one ends is what makes navigation and interaction possible.

This thesis develops an instance-segmentation framework targeting exactly that setting, with robustness under
occlusion and viewpoint change as the guiding constraint. It follows on from my
[seminar research on skin-lesion detection]({{ '/projects/itobos-lesion-detection/' | relative_url }}),
which is where I first worked on detection in a medical-imaging setting.

## Dataset

Built on **HAMP**, a dataset specifically designed for detecting and segmenting medical equipment in complex
hospital environments. A substantial part of the work has gone into engineering and processing it into a form
the benchmark can consume consistently — the part of a thesis that never appears in the results table but
determines whether the numbers mean anything.

## Benchmark

Rather than tuning a single architecture, the study sweeps the design space: **30+ configurations** spanning

| | |
| --- | --- |
| **Detectors** | Cascade Mask R-CNN · Hybrid Task Cascade (HTC) · Mask R-CNN · YOLOv8 / YOLOv11 |
| **Backbones** | ConvNeXt (incl. ConvNeXtv2-L) · PVT · Vision Transformers |
| **Framework** | PyTorch |

The axis of interest is the **accuracy–efficiency tradeoff**, not accuracy alone. Every configuration is
measured on FLOPs and FPS alongside mAP, because a segmentation model that cannot keep up with a moving robot
is not a solution to the problem this thesis poses — it is a better offline annotator.

## Result so far

**57.4 mAP**, the peak of the sweep, from **Hybrid Task Cascade with a ConvNeXtv2-L backbone**.

HTC winning here is consistent with what the architecture is built for: it interleaves detection and
segmentation across cascade stages instead of treating the mask as a post-hoc branch, which is precisely the
advantage you want when instances of the same equipment class overlap heavily.

<!--
  TODO — to add before submission:
  - full benchmark table (mAP / FLOPs / FPS per configuration)
  - qualitative segmentation overlays on held-out hospital scenes
  - dataset statistics: class distribution, occlusion levels, image count
  - advisor acknowledgement and a link to the thesis PDF once submitted
-->
