---
layout: page
title: Skin Lesion Detection on Total-Body Photography
description: Team seminar research at VNUHCM–US, benchmarking YOLO and Faster R-CNN families for skin-cancer screening on 3D total-body photography (iToBoS 2024).
img: assets/img/projects/cover_itobos.svg
importance: 1
category: research
github: https://github.com/minhdieuvu08/itobos-lesion-detection
---

**Academic seminar, Faculty of Mathematics and Computer Science, VNUHCM – University of Science ·
completed January 2026.**
*Deep Learning Approaches for Skin Cancer Detection and Segmentation*, a **three-person team project** with
Nguyen Minh Man and Nguyen Ngoc Tuyet Nhi, supervised by M.Sc. Huynh Thanh Son.

My contribution covered both detection paradigms: I ran the **YOLO experiments** end to end, and wrote the
**Faster R-CNN implementation** that a teammate then trained. The
[linked repository](https://github.com/minhdieuvu08/itobos-lesion-detection) holds the YOLO side only. The
work itself finished in January 2026, though I pushed the code and write-up to GitHub in September.

This was the term of work preceding my
[undergraduate thesis]({{ '/projects/medical-equipment-instance-segmentation/' | relative_url }}), and my
first exposure to detection in a medical-imaging setting.

## The problem

Melanoma is the minority of skin cancers but carries the fastest metastasis and the highest mortality, and
prognosis depends heavily on how early it is caught. Conventional diagnosis needs a dermatologist and
dermoscopy equipment, a bottleneck that makes population-scale screening impractical. Most AI training sets
make the bottleneck worse rather than better: they are *lesion-centric* dermoscopic crops with the lesion
centred in frame, discarding the surrounding skin context that real-world screening has to work with.

The [iToBoS 2024 challenge](https://www.kaggle.com/competitions/itobos-2024-detection) inverts this. Images
are high-resolution skin-region tiles extracted from **3D total-body photography (3D-TBP)**, with context
preserved and lesions wherever they happen to fall. The question the seminar asked: can modern object detectors
screen skin in that setting, outside a specialist clinic?

## Data

16,954 PNG tiles from 100 patients, recruited at Hospital Clinic Barcelona (51) and the University of
Queensland, Brisbane (49), captured on the VECTRA WB360 system (92 synchronised cameras). Each tile covers
roughly **7 × 9 cm** of skin, extracted from a reconstructed 3D avatar. Faces, tattoos, scars and jewellery
were inpainted before release, worth remembering, since inpainted regions carry textures that real skin does
not.

| Split | Images | With lesions | Without | Positive rate |
| --- | ---: | ---: | ---: | ---: |
| Train | 8,473 | 6,723 | 1,750 | 79.35% |
| Test  | 8,481 | 6,750 | 1,731 | 79.59% |
| **Total** | **16,954** | **13,473** | **3,481** | **79.47%** |

## Benchmark

Both detection paradigms, one-stage and two-stage:

- **YOLO (v8, v9, v10)**, with mAP@50 generally in the **0.66–0.75** band. The strongest result in this group
  came from **YOLOv8-Small on an 8k-image subset at 1024px input: 0.4266 mAP@50-95**, higher than the larger
  variants, which says the cleaner subset and the higher resolution mattered more than parameter count for
  finding small, faint-bordered lesions. YOLOv8-Large reached 0.401 and YOLOv9-Medium 0.4137
  (precision 0.7320, recall 0.6570).
- **Faster R-CNN**, where the standout was **RegNetX-800MF with Focal Loss: recall 0.7769, mAP@50 0.762,
  mAP@50-95 0.403**. Focal Loss is doing exactly the job it was designed for here: down-weighting the
  overwhelming majority of easy benign lesions so the model attends to the malignant minority. In screening,
  recall is the metric that matters, because a false positive costs a second look while a false negative can
  cost a melanoma caught late.

The single-model write-up in the repository (YOLOv8m, 0.6658 mAP@50 / 0.3538 mAP@50-95, 4.57 hours on one
Tesla T4) is my own run within this larger sweep.

## What limited the results

Overall mAP@50-95 sat in the 0.3–0.4 range, below what lesion-centric datasets like HAM10000 or ISIC report,
and the gap is mostly the data, not the models. Severe class imbalance (predominantly benign), fabric
occlusion whose patterns mimic lesions, variation in illumination and patient posture, and an average of 4–5
lesions per image all push false positives and false negatives up together. Compute limits also ruled out a
full ablation study, longer schedules, and test-time augmentation.

Identified next steps: systematic hyperparameter sweeps, dermatology-specific augmentation, class rebalancing
or semi-supervised use of unlabelled regions, patient-level evaluation with a clinically motivated recall
floor, and Vision Transformer or hybrid ViT–CNN architectures whose global attention suits wide-context
tiles better than local convolutions.
