---
id: gamedev-liveops
title: LiveOps — управление живым продуктом
sidebar_label: LiveOps
level: 7
category: specialization
tags: [gamedev, liveops, events, content, operations]
prerequisites: [specialization/gamedev-economy, specialization/gamedev-monetization]
leads_to: [specialization/gamedev-analytics]
related: [integration/event-driven-architecture]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
LiveOps — непрерывное управление игрой после запуска: ивенты, боевые пропуски, ежедневные задания, сезонный контент. Цель — поддерживать интерес игроков, увеличивать retention и доход. Аналитик проектирует контент-календарь, формулы ивентов и метрики их эффективности.
:::

## Компоненты LiveOps

```mermaid
flowchart TD
    LIVE["LiveOps"]
    LIVE --> EVENTS["Ивенты<br/>— временные, сезонные"]
    LIVE --> PASS["Боевой пропуск<br/>— Battle Pass"]
    LIVE --> DAILY["Ежедневные задания"]
    LIVE --> SHOP["Магазин<br/>— ротация товаров"]
    LIVE --> BALANCE["Изменение баланса"]
    LIVE --> CONTENT["Контент<br/>— новые уровни, персонажи"]
```

## Структура ивента

| Параметр | Пример |
|----------|--------|
| **Тип** | PvP-турнир, сбор предметов, boss raid |
| **Длительность** | 3–14 дней |
| **Механика** | Очки за активность, лидерборд |
| **Награды** | Soft currency, premium, эксклюзивный скин |
| **Условия доступа** | Уровень, клан, прогресс |
| **Триггер** | Фиксированные даты или после прохождения |

## LiveOps-календарь

```mermaid
flowchart LR
    S1["Сезон 1<br/>(3 месяца)"] --> S2["Сезон 2"]
    S1 --> EV1["Ивент «Зима»<br/>(2 недели)"]
    S1 --> EV2["Ивент «Любовь»<br/>(1 неделя)"]
    S2 --> EV3["Ивент «Весна»"]
    subgraph DAILY["Ежедневно"]
        D1["+1 задание"]
        D2["Магазин ротация"]
    end
```

## Что дальше

- [Game Analytics](/docs/specialization/gamedev-analytics)

## Проверь себя

1. **Что такое LiveOps?**
   *Ответ:* Непрерывное управление игрой после запуска: ивенты, боевые пропуски, ежедневки, контент.

2. **Какие компоненты входят в LiveOps?**
   *Ответ:* Ивенты, Battle Pass, ежедневные задания, магазин, баланс, контент.
