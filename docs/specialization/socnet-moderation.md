---
id: socnet-moderation
title: Модерация контента и безопасность
sidebar_label: Модерация контента
level: 7
category: specialization
tags: [socnet, moderation, safety, nsfw, abuse, asr]
prerequisites: [specialization/socnet-path]
leads_to: [specialization/socnet-monetization, specialization/socnet-platform]
related: [ai-ethics, architecture/authorization]
estimated_time: 25
difficulty: 6
audience: senior
---

:::info[TL;DR]
Модерация — фильтрация запрещённого контента (ASR: adult, spam, racism; NSFW, экстремизм). Комбинация AI-модерации (ML, LLM) + human reviewers. Для аналитика: типы нарушений, правила модерации, системы жалоб, апелляции, метрики (precision/recall, time to action) и requirement для AI-модераторов.
:::

## Типы нарушений

| Категория | Пример |
|-----------|--------|
| **ASR** | Adult, Spam, Racism / Hate speech |
| **NSFW** | Обнажёнка, насилие |
| **Экстремизм** | Призывы, терроризм |
| **Фрод** | Фишинг, скам, поддельные аккаунты |
| **Copyright** | Пиратский контент |
| **Bullying** | Травля, хейтинг |

## Процесс модерации

```mermaid
flowchart LR
    CONT["Пользователь загружает контент"] --> AI["AI-модератор<br/>(ML / LLM)"]
    AI --> PASS["✅ Пропущен"]
    AI --> FLAG["⚠️ Сомнительный"]
    FLAG --> HUMAN["Human Reviewer"]
    AI --> BLOCK["❌ Заблокирован"]
    HUMAN --> PASS2["✅ Пропущен"]
    HUMAN --> BLOCK2["❌ Заблокирован"]
    BLOCK --> APPEAL["Апелляция"]
    BLOCK2 --> APPEAL
```

## Метрики модерации

| Метрика | Описание |
|---------|----------|
| **Precision** | % верно заблокированных (минимум false positive) |
| **Recall** | % обнаруженных нарушений |
| **Time to action** | Среднее время блокировки |
| **Appeal rate** | % апелляций на блокировки |
| **False positive rate** | % ошибочных блокировок |

## Что дальше

- [Монетизация соцсетей](/docs/specialization/socnet-monetization)
- [Платформа контента](/docs/specialization/socnet-platform)

## Проверь себя

1. **Какие категории нарушений модерируются?**
   *Ответ:* ASR (adult/spam/racism), NSFW, экстремизм, фрод, copyright, bullying.

2. **Как работает AI-модерация?**
   *Ответ:* AI → пропуск/флаг/блокировка. Сомнительные уходят human reviewer. Апелляции пересматриваются.
