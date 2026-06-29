---
id: socnet-monetization
title: Монетизация соцсетей — реклама, подписки
sidebar_label: Монетизация соцсетей
level: 7
category: specialization
tags: [socnet, monetization, ads, subscription, revenue]
prerequisites: [specialization/socnet-feed, specialization/socnet-graph]
leads_to: [specialization/socnet-platform]
related: [data/dwh-basics]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
Монетизация соцсетей: реклама (Ad Network — CPM/CPC/CPA), премиум-подписки (TikTok+, YouTube Premium), донаты и Super Chat, комиссия с продаж (маркетплейс, крипейторская экономика). Аналитик проектирует аукцион рекламы, модели оплаты, creator payouts и метрики (ARPU, fill rate, eCPM).
:::

## Типы монетизации

```mermaid
flowchart TD
    MON["Монетизация"]
    MON --> ADS["Реклама"]
    MON --> SUB["Подписки"]
    MON --> DON["Донаты / Super Chat"]
    MON --> COMM["Комиссия с продаж"]
    ADS --> CPM["CPM (показы)"]
    ADS --> CPC["CPC (клики)"]
    ADS --> CPA["CPA (действие)"]
    SUB --> PREMIUM["Premium (без рекламы)"]
    SUB --> CREATOR["Support (донаты автору)"]
```

## Рекламный аукцион

```mermaid
sequenceDiagram
    participant U as Пользователь
    participant F as Feed
    participant AD as Ad Network
    participant B as Bidders

    F->>AD: Запрос рекламы (targeting)
    AD->>B: Аукцион (CPM, relevance)
    B-->>AD: Bids (price + ad)
    AD->>AD: Выбор победителя (price × relevance)
    AD-->>F: Ad creative
    F-->>U: Показ рекламы
```

## Метрики

| Метрика | Описание |
|---------|----------|
| **ARPU** | Средний доход на пользователя |
| **eCPM** | Эффективная стоимость 1000 показов |
| **Fill rate** | % показов с рекламой |
| **CTR** | Кликабельность рекламы |
| **Conversion** | Целевое действие после клика |
| **Subscription rate** | % пользователей с подпиской |

## Что дальше

- [Платформа контента](/docs/specialization/socnet-platform)

## Проверь себя

1. **Какие есть типы монетизации соцсетей?**
   *Ответ:* Реклама (CPM/CPC/CPA), подписки, донаты, комиссия с продаж.

2. **Как работает рекламный аукцион?**
   *Ответ:* Запрос → брокер получает ставки → победитель (price × relevance) → показ.
