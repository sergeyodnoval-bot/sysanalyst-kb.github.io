---
id: logistics-tms
title: TMS — система управления перевозками
sidebar_label: TMS (управление перевозками)
level: 6
category: specialization
tags: [logistics, tms, transport, shipment, carrier]
prerequisites: [specialization/logistics-path]
leads_to: [specialization/logistics-routing, specialization/logistics-edo]
related: [integration/api-rest-basics]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
TMS (Transportation Management System) — система управления перевозками. Покрывает: планирование маршрутов, выбор перевозчика, расчёт тарифов, отслеживание доставки, ЭДО и взаиморасчёты. Аналитик проектирует статусную модель заказа, интеграции с перевозчиками и тарифные схемы.
:::

## Модули TMS

```mermaid
flowchart TD
    TMS["TMS"]
    TMS --> PLAN["Планирование<br/>— маршруты, расписание"]
    TMS --> CARRIER["Перевозчики<br/>— тендеры, договоры"]
    TMS --> RATE["Тарифы<br/>—— base rate, надбавки"]
    TMS --> EXEC["Исполнение<br/>— загрузка, трекинг"]
    TMS --> FIN["Финансы<br/>— акты, счета, сверка"]
    TMS --> EDO["ЭДО<br/>— электронные документы"]
```

## Статусная модель заказа перевозки

```mermaid
flowchart LR
    NEW["Новый"] --> ASSIGN["Назначен перевозчик"]
    ASSIGN --> PICK["Забор груза"]
    PICK --> TRANSIT["В пути"]
    TRANSIT --> DELIVERED["Доставлен"]
    DELIVERED --> CONFIRMED["Подтверждён"]
    CONFIRMED --> CLOSED["Закрыт<br/>(акты, оплата)"]
    TRANSIT --> ISSUE["Инцидент<br/>(опаздание, потеря)"]
    ISSUE --> TRANSIT
```

## Интеграции TMS

| С кем | Что передаётся |
|-------|---------------|
| **OMS / Маркетплейс** | Заказы на доставку |
| **WMS** | Готовые к отгрузке заказы |
| **Перевозчики** | API: ставки, трекинг, документы |
| **Курьерские службы** | Заказы последней мили |
| **ЭДО** | УПД, акты, счета-фактуры |

## Что дальше

- [Маршрутизация и оптимизация](/docs/specialization/logistics-routing)
- [ЭДО в логистике](/docs/specialization/logistics-edo)

## Проверь себя

1. **Какие модули входят в TMS?**
   *Ответ:* Планирование, перевозчики, тарифы, исполнение, финансы, ЭДО.

2. **Как TMS интегрируется с перевозчиками?**
   *Ответ:* Через API: ставки, трекинг-статусы, электронные документы.
