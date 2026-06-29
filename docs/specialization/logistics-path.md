---
id: logistics-path
title: Логистика — роль, специфика, карьерный путь
sidebar_label: "Логистика: введение"
level: 5
category: specialization
tags: [logistics, transport, warehouse, delivery, supply-chain]
prerequisites: [specialization/industry-analytics]
leads_to: [specialization/logistics-tms, specialization/logistics-wms]
related: [specialization/ecommerce-fulfillment, specialization/ecommerce-retail-path]
estimated_time: 15
difficulty: 4
audience: middle
---

:::info[TL;DR]
Логистический аналитик работает с системами управления перевозками (TMS), складами (WMS), доставкой последней мили, маршрутизацией и ЭДО. Специфика: разнообразие участников (перевозчики, склады, маркетплейсы, курьеры), жёсткие SLA, real-time трекинг, сложные тарифы и огромные объёмы данных (миллионы заказов/день).
:::

## Основные системы логистики

```mermaid
flowchart TD
    ORD["Заказ (OMS / Маркетплейс)"] --> TMS["TMS — управление перевозками"]
    TMS --> ROUT["Маршрутизация"]
    TMS --> CARRIER["Перевозчики"]
    TMS --> WMS["WMS — склад"]
    WMS --> PICK["Pick, Pack, Ship"]
    WMS --> INV["Инвентаризация"]
    TMS --> LML["Последняя миля"]
    LML --> COURIER["Курьерские службы"]
    LML --> TRACK["Трекинг для клиента"]
    TMS --> EDO["ЭДО / документы"]
```

## Карьерный путь

| Этап | Роль | Ключевые навыки |
|------|------|----------------|
| 1 | Junior SA | WMS, документация |
| 2 | Middle SA | TMS, интеграции, маршрутизация |
| 3 | Senior SA | Архитектура логистики, оптимизация |
| 4 | Lead | Supply Chain, стратегия |

## Что дальше

- [TMS — система управления перевозками](/docs/specialization/logistics-tms)
- [Складская логистика и WMS](/docs/specialization/logistics-wms)

## Проверь себя

1. **Какие основные системы в логистике?**
   *Ответ:* TMS (перевозки), WMS (склад), маршрутизация, последняя миля, ЭДО.

2. **Чем логистика отличается от других отраслей?**
   *Ответ:* Множество участников, real-time трекинг, жёсткие SLA, огромные объёмы данных.
