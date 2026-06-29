---
id: logistics-last-mile
title: Доставка последней мили и трекинг
sidebar_label: Последняя миля и трекинг
level: 6
category: specialization
tags: [logistics, last-mile, delivery, tracking, courier]
prerequisites: [specialization/logistics-tms, specialization/logistics-wms]
leads_to: [specialization/logistics-analytics]
related: [integration/event-driven-architecture, architecture/caching]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
Последняя миля — финальный этап доставки от склада/хаба до клиента. Ключевые аспекты: временные окна (слоты), трекинг в реальном времени, связь с курьером, подтверждение получения, возвраты. Аналитик проектирует статусную модель, интеграцию с курьерскими API и real-time уведомления.
:::

## Процесс последней мили

```mermaid
flowchart LR
    WH["Склад / Хаб"] --> SORT["Сортировка по маршрутам"]
    SORT --> LOAD["Загрузка курьера"]
    LOAD --> ROUTE["Маршрут курьера"]
    ROUTE --> SLOT1["Слот 10:00–12:00"]
    ROUTE --> SLOT2["Слот 12:00–14:00"]
    ROUTE --> SLOT3["Слот 14:00–16:00"]
    SLOT1 --> DEL["Вручение клиенту"]
    DEL --> CONFIRM["Подтверждение<br/>(подпись / код)"]
```

## Статусная модель доставки

```mermaid
flowchart LR
    NEW["Создан"] --> ASSIGN["Назначен курьер"]
    ASSIGN --> PICKUP["Забран со склада"]
    PICKUP --> ROUTE["В пути к клиенту"]
    ROUTE --> ARRIVED["Курьер на месте"]
    ARRIVED --> DONE["Вручено"]
    DONE --> RETURN["Возврат<br/>(если не принят)"]
    ROUTE --> FAIL["Неудачная попытка"]
    FAIL --> REATTEMPT["Повтор"]
```

## Трекинг для клиента

| Событие | Канал | Тайминг |
|---------|-------|---------|
| Заказ передан в доставку | Push / SMS | Сразу |
| Курьер назначен | Push / SMS | За 1 час |
| Курьер выехал | Push / Map | За 30 мин |
| Курьер на месте | Push | Сейчас |
| Доставлено | Push / Email | Сразу |
| Чат с курьером | In-app | По запросу |

## Что дальше

- [Аналитика в логистике](/docs/specialization/logistics-analytics)

## Проверь себя

1. **Что такое последняя миля?**
   *Ответ:* Финальный этап доставки от склада до клиента (слот → маршрут → вручение).

2. **Какие события трекинга получает клиент?**
   *Ответ:* Создан → назначен курьер → выехал → на месте → вручено (через Push/SMS).
