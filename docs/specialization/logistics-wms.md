---
id: logistics-wms
title: Складская логистика и WMS
sidebar_label: WMS (складская ИС)
level: 6
category: specialization
tags: [logistics, wms, warehouse, inventory, picking]
prerequisites: [specialization/logistics-path]
leads_to: [specialization/logistics-last-mile, specialization/logistics-integrations]
related: [data/data-modeling, modeling/state-diagram]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
WMS (Warehouse Management System) управляет складом: приёмка, размещение, хранение, сборка (pick/pack), отгрузка и инвентаризация. Ключевое для аналитика: типы складов (FBO, FBS, DBS), зоны склада, статусы товара и интеграции с TMS/OMS.
:::

## Процессы склада

```mermaid
flowchart LR
    REC["Приёмка<br/>(входной контроль)"] --> PUT["Размещение<br/>(put-away)"]
    PUT --> STORE["Хранение"]
    STORE --> PICK["Сбор заказа<br/>(picking)"]
    PICK --> PACK["Упаковка (packing)"]
    PACK --> SORT["Сортировка"]
    SORT --> SHIP["Отгрузка"]
    STORE --> INV["Инвентаризация"]
```

## Типы складов в e-commerce

| Тип | Описание | WMS особенность |
|-----|----------|-----------------|
| **FBO** | Товар на складе маркетплейса | Полный цикл WMS + сортировка |
| **FBS** | Товар у продавца, доставка силами МП | Отгрузка паллетами |
| **DBS** | Продавец хранит и доставляет сам | Минимум WMS |
| **Кросс-док** | Товар не хранится, транзит | Нет хранения, только сортировка |

## Зоны склада

| Зона | Описание |
|------|----------|
| **Приёмка** | Разгрузка, проверка, штрихкодирование |
| **Основное хранение** | Паллетные стеллажи, адресное хранение |
| **Зона сборки** | Комплектация заказов |
| **Зона упаковки** | Packing stations, коробы, стрейч |
| **Экспедиция** | Сортировка по маршрутам |
| **Возвраты** | Реверс-логистика |

## Что дальше

- [Доставка последней мили](/docs/specialization/logistics-last-mile)
- [Интеграции с маркетплейсами и курьерами](/docs/specialization/logistics-integrations)

## Проверь себя

1. **Какие зоны есть на складе?**
   *Ответ:* Приёмка, хранение, сборка, упаковка, экспедиция, возвраты.

2. **Чем FBO отличается от FBS?**
   *Ответ:* FBO — товар на складе маркетплейса (полный WMS), FBS — у продавца, доставка силами МП.
