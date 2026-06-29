---
id: socnet-recommendations
title: Проектирование рекомендательной системы
sidebar_label: Проектирование рекомендательной системы
level: 6
type: task
tags: [socnet, recommendations, task, design]
prerequisites: [specialization/socnet-feed]
related: [tech/recommendation, tech/mlflow]
difficulty: 5
estimated_time: 6
spc: SPC-76
audience: middle
---

:::info[TL;DR]
Спроектировать рекомендательную систему для видео-ленты: candidate generation, ranking, фильтры, метрики. Результат: архитектура, спецификация candidate sources, ranking features, offline/online метрики.
:::

## Контекст

Контентная платформа запускает рекомендации видео. Нужно спроектировать ML-пайплайн рекомендаций.

## Что нужно сделать

1. Описать candidate generation: откуда берутся кандидаты (CF, популярное, подписки, похожие)
2. Специфицировать фичи для ranking (user features, item features, context features)
3. Описать бизнес-правила: diversity (по авторам, темам), freshness, safety filter
4. Определить offline метрики (precision@k, recall@k, NDCG)
5. Определить online метрики (CTR, watch time, session length)
6. Описать A/B тест для новой модели

## Результат

- Candidate sources (3+ источника)
- Feature table (10+ фичей с типом)
- Бизнес-правила (3+ правила)
- Метрики (offline + online)
- A/B test plan

## Критерии приемки

- 3+ candidate source описаны
- 10+ ranking features специфицированы
- Offline + online метрики (4+)
- A/B тест с гипотезой и длительностью
