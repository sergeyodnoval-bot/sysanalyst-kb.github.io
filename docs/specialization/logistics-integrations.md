---
id: logistics-integrations
title: Интеграции с маркетплейсами и курьерами
sidebar_label: Интеграции с marketplace и курьерами
level: 6
category: specialization
tags: [logistics, integration, marketplace, courier, api]
prerequisites: [specialization/logistics-tms, specialization/logistics-last-mile]
leads_to: [specialization/logistics-analytics]
related: [integration/api-rest-basics, integration/api-design-detailed]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
Логистическая система интегрируется с десятками внешних сервисов: маркетплейсами (Wildberries, Ozon, Яндекс.Маркет), курьерскими службами (СДЭК, Boxberry, 5Post, Почта России) и операторами ЭДО. Каждый интегратор — свой API, свой формат данных, свои SLA. Аналитик проектирует универсальную шину интеграций и адаптеры под каждого партнёра.
:::

## Типовые интеграции

```mermaid
flowchart TD
    TMS["TMS / Логистическая платформа"] --> GW["Интеграционная шина"]
    GW --> MP["Маркетплейсы<br/>WB, Ozon, YM, AliExpress"]
    GW --> COURIER["Курьеры<br/>СДЭК, Boxberry, 5Post, Почта"]
    GW --> EDO["Операторы ЭДО<br/>Диадок, СБИС, Контур"]
    GW --> WMS["WMS / Склады"]
    GW --> PAY["Платёжные системы"]
```

## Что передаётся

| Интеграция | Данные | Протокол |
|------------|--------|----------|
| **Маркетплейс → TMS** | Заказы, статусы, трекинг | REST API (JSON) |
| **TMS → Курьер** | Заказ на доставку, трек-номер | REST / SOAP |
| **Курьер → TMS** | Статусы, ПВЗ, стоимость | REST / Webhook |
| **TMS → WMS** | Заказ на сборку | REST / MQ |
| **TMS → ЭДО** | УПД, счета, акты | REST / API оператора |

## Особенности курьерских интеграций

| Курьерская служба | API | Формат | Примечание |
|-------------------|-----|--------|-----------|
| **СДЭК** | REST API v2 | JSON | Трекинг, ПВЗ, расчёт |
| **Boxberry** | REST API | JSON/XML | Кассеты, ПВЗ |
| **5Post** | REST | JSON | Магазины Пятёрочка |
| **Почта России** | REST / SOAP | JSON/XML | 1 класс, EMS, посылки |
| **Яндекс.Доставка** | REST | JSON | Маршрутизация, трекинг |

## Что дальше

- [Аналитика в логистике](/docs/specialization/logistics-analytics)

## Проверь себя

1. **С кем интегрируется логистическая платформа?**
   *Ответ:* Маркетплейсы, курьерские службы, WMS, ЭДО, платёжные системы.

2. **Какие API используют курьерские службы?**
   *Ответ:* REST API, JSON, иногда SOAP (Почта России), webhook для статусов.
