---
layout: page
title: Skin Lesion Detection on Total-Body Photography
description: Academic seminar research at VNUHCM–US — fine-tuning YOLOv8m to localise skin lesions in 3D total-body photography tiles (iToBoS 2024 challenge).
img: assets/img/projects/cover_itobos.svg
importance: 1
category: research
github: https://github.com/minhdieuvu08/itobos-lesion-detection
---

**Academic seminar research, Faculty of Mathematics & Computer Science, VNUHCM – University of Science.**
This was my seminar project in the term preceding my
[undergraduate thesis]({{ '/projects/medical-equipment-instance-segmentation/' | relative_url }}) —
a first pass at medical-imaging detection that shaped the direction I then took into the thesis.

An object-detection study on the [iToBoS 2024 challenge](https://www.kaggle.com/competitions/itobos-2024-detection):
given skin-region tiles cropped from reconstructed 3D avatars, localise every lesion on the patient's body.

## Data

The dataset contains **16,954 PNG tiles from 100 patients**, recruited at Hospital Clinic Barcelona (51) and
the University of Queensland, Brisbane (49). Images come from the VECTRA WB360 total-body photography system
(92 synchronised cameras); each tile covers roughly **7 × 9 cm** of skin. Faces, tattoos, scars and jewellery
were inpainted before release — a detail worth keeping in mind, since inpainted regions introduce textures that
differ from naturally photographed skin.

The official split is almost exactly even, and the positive/background balance is consistent across it:

| Split | Images | With lesions | Without | Positive rate |
| --- | ---: | ---: | ---: | ---: |
| Train | 8,473 | 6,723 | 1,750 | 79.35% |
| Test  | 8,481 | 6,750 | 1,731 | 79.59% |
| **Total** | **16,954** | **13,473** | **3,481** | **79.47%** |

The exploratory analysis in `overview.ipynb` works through the image split, the lesion annotations, and the
clinical/acquisition metadata. Notebook outputs are cleared in the repository to avoid embedding medical images.

## Model and results

YOLOv8m fine-tuned for 50 epochs on a single Tesla T4 — **4.57 hours** of training — evaluated on a held-out
20% validation split of 1,695 images containing 5,814 annotated lesions.

| Metric | Score |
| --- | --- |
| mAP@50 | **0.6658** |
| mAP@50-95 | **0.3538** |
| Precision | 0.6690 |
| Recall | 0.5867 |
| F1 | 0.6252 |

The fused model has 25.8M parameters and 78.7 GFLOPs, running at 23.4 ms per image on a T4.

## Notes

Recall is the weaker half of the trade-off, which is the direction that matters least for a screening
setting — a missed lesion costs more than a false positive that a clinician dismisses. Pushing recall
without collapsing precision, and checking whether performance is stable across acquisition site and
body part rather than only in aggregate, are the natural next steps.
