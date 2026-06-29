---
id: socnet-moderation-flow
title: Проектирование системы модерации
sidebar_label: Проектирование модерации
level: 6
type: task
tags: [socnet, moderation, task, design]
prerequisites: [specialization/socnet-moderation]
related: []
difficulty: 5
estimated_time: 6
spc: SPC-78
audience: middle
---

:::info[TL;DR]
Спроектировать систему модерации контента для соцсети: AI-модерация, human reviewers, жалобы, апелляции, метрики. Результат: flow diagram, матрица нарушений, SLA, метрики качества.
:::

## Контекст

Растущая соцсеть (10M+ DAU) сталкивается с ростом запрещённого контента. Нужна система модерации.

## Что нужно сделать

1. Категоризировать типы нарушений (6+ категорий)
2. Описать pipeline: загрузка → AI → auto-pass / flag / auto-block
3. Спроектировать систему жалоб от пользователей (report flow)
4. Описать процесс апелляции (appeal flow)
5. Определить SLA: время реакции на флаг, время апелляции
6. Определить метрики: precision, recall, time to action, false positive rate

## Результат

- Матрица нарушений (тип → действие → SLA)
- Flow diagram модерации (Mermaid)
- Report flow (пользователь → ... → блокировка/пропуск)
- Appeal flow
- Метрики (4+ метрики)

## Критерии приемки

- 6+ категорий нарушений
- Pipeline: AI → auto/flag/block
- SLA для каждого типа нарушения
- 4+ метрики с целевыми значениями
