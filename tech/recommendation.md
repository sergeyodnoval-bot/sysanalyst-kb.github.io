---
id: recommendation
title: Рекомендательные системы (ML, collaborative filtering)
sidebar_label: Рекомендательные системы
level: 7
category: tech
tags: [socnet, recommendations, ml, collaborative-filtering, personalization]
prerequisites: [specialization/socnet-feed]
leads_to: [specialization/socnet-monetization]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
Рекомендательные системы — ML-модели для подбора контента: collaborative filtering (user-based, item-based), content-based, hybrid. Современные подходы: two-tower DNN (запрос пользователя → кандидаты → ranking), real-time features с feature store. Аналитик описывает candidate generation, ranking, фильтры (diversity, freshness) и метрики (CTR, watch time, recall).
:::

## Типы рекомендаций

| Тип | Подход | Пример |
|-----|--------|--------|
| **Collaborative filtering** | User-based / Item-based | «Люди также смотрят» |
| **Content-based** | Похожие теги, категории | «Похожие видео» |
| **Two-tower DNN** | User embedding × Item embedding | TikTok, YouTube |
| **Popularity** | Тренды, горячее | Explore |
| **Hybrid** | Комбинация | Большинство платформ |

## Архитектура

```mermaid
flowchart TD
    REQ["Запрос пользователя"] --> CAND["Candidate Generation<br/>(CF, популярное, друзья)"]
    CAND --> FEAT["Feature Computation"]
    FEAT --> RANK["Ranking Model<br/>(DNN, GBDT)"]
    RANK --> POLICIES["Бизнес-правила<br/>(diversity, recency)"]
    POLICIES --> TOP["Top-N контент"]
```

## Что дальше

- [Лента контента](/docs/specialization/socnet-feed)

## Проверь себя

1. **Какие есть подходы к рекомендациям?**
   *Ответ:* Collaborative filtering, content-based, two-tower DNN, popularity, hybrid.

2. **Как устроен пайплайн рекомендаций?**
   *Ответ:* Запрос → Candidate Generation → Features → Ranking → Policies → Top-N.
