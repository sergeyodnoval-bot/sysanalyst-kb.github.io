---
id: gamedev-analytics
title: Game Analytics
sidebar_label: Game Analytics
level: 7
category: specialization
tags: [gamedev, analytics, metrics, events, funnel]
prerequisites: [specialization/gamedev-liveops]
leads_to: []
related: [data/dwh-basics, data/etl-basics]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
Game Analytics — трекинг событий (event tracking), построение воронок, анализ метрик (retention, ARPU, LTV) и A/B тесты. Аналитик проектирует схему событий, дашборды и пайплайн данных (клиент → сервер → DWH → BI).
:::

## Пайплайн Game Analytics

```mermaid
flowchart LR
    CLIENT["Клиент (Unity/Unreal)"] --> EVENTS["События<br/>(event_name, params)"]
    EVENTS --> GATEWAY["Сборщик событий"]
    GATEWAY --> QUEUE["Message Queue<br/>(Kafka)"]
    QUEUE --> DWH["DWH (ClickHouse, BigQuery)"]
    DWH --> BI["BI (Superset, Grafana)"]
    DWH --> ML["ML (LTV prediction)"]
```

## Типы событий

| Категория | Событие | Пример параметров |
|-----------|---------|-------------------|
| **Onboarding** | `tutorial_start`, `tutorial_step`, `tutorial_complete` | step_id, time |
| **Gameplay** | `level_start`, `level_complete`, `match_end` | level, score, result |
| **Economy** | `currency_spend`, `currency_earn`, `item_purchase` | currency, amount, item |
| **Monetization** | `iap_purchase`, `ad_watch`, `subscription_start` | product_id, price |
| **Social** | `friend_add`, `guild_join`, `invite_sent` | target_id |
| **LiveOps** | `event_start`, `event_reward`, `battlepass_level` | event_id, tier |

## Воронка (Funnel)

```mermaid
flowchart LR
    INSTALL["Install"] --> TUTORIAL["Tutorial Start"]
    TUTORIAL --> REG["Registration"]
    REG --> L1["Level 1"]
    L1 --> L5["Level 5"]
    L5 --> PURCHASE["First Purchase"]
```

## Что дальше

Вернитесь к началу: [GameDev — путь аналитика](/docs/specialization/gamedev-path)

## Проверь себя

1. **Как устроен пайплайн Game Analytics?**
   *Ответ:* Клиент → События → Очередь → DWH → BI / ML.

2. **Какие категории событий трекаются в играх?**
   *Ответ:* Onboarding, Gameplay, Economy, Monetization, Social, LiveOps.
