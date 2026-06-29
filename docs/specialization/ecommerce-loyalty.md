---
id: ecommerce-loyalty
title: Системы лояльности в e-commerce
sidebar_label: Системы лояльности
level: 6
category: specialization
tags: [ecommerce, loyalty, bonus, promo, tier, cashback, gamification]
prerequisites: [specialization/ecommerce-oms, specialization/ecommerce-analytics]
leads_to: [specialization/ecommerce-pricing]
related: [data/nosql, tech/prometheus]
estimated_time: 40
difficulty: 6
audience: middle
---

:::info[TL;DR]
Система лояльности — программа удержания клиентов через бонусы, кэшбэк, уровни, персональные предложения. Ключевые метрики: Retention Rate (удержание), Repeat Purchase Rate (повторные), Average Order Value (AOV), Customer Lifetime Value (LTV). Типы: балльная (1 балл = 1 рубль), кэшбэк (% от покупки), tiered (уровни Bronze → Silver → Gold), подписочная (Amazon Prime). Аналитик специфицирует правила начисления/списания, интеграцию с OMS и Promo Engine.
:::

## Для кого эта статья

- Middle SA, проектирующий систему лояльности
- SA в e-commerce с программами удержания

После прочтения вы:
- Поймёте 4 типа программ лояльности
- Узнаете key metrics: RPR, AOV, LTV, Churn, Redemption Rate
- Сможете спроектировать rule-based начисление бонусов

## Что это такое

Система лояльности — инструмент удержания клиентов: мотивация покупать чаще и больше.

**Типовая архитектура:**

```mermaid
flowchart TD
    OMS["OMS"] --> L["Loyalty Engine"]
    L --> DB["Loyalty DB<br/>(баллы, уровни)"]
    L --> R["Rule Engine<br/>(правила начисления)"]
    L --> P["Promo Engine<br/>(купоны, акции)"]
    L --> C["Customer Service<br/>(профиль)"]
    OMS --> ERP["ERP (учёт бонусов)"]
```

## 4 типа программ лояльности

| Тип | Пример | Механика | LTV-эффект |
|-----|--------|----------|-----------|
| **Балльная (Points)** | «Спасибо» от Сбербанка | 1 балл = 1 рубль | +15-20% |
| **Кэшбэк (Cashback)** | «Яндекс Плюс» | 1-5% от суммы | +20-25% |
| **Уровневая (Tiered)** | Sephora Beauty Insider | Bronze → Silver → Gold | +30% |
| **Подписочная (Subscription)** | Amazon Prime | Ежемесячная плата за привилегии | +50% |

## Ключевые метрики

| Метрика | Описание | Норма | Формула |
|---------|----------|-------|---------|
| **RPR** (Repeat Purchase Rate) | Доля повторных покупок | 30-50% | Клиенты с 2+ заказами / всего клиентов |
| **AOV** (Average Order Value) | Средний чек | — | Выручка / кол-во заказов |
| **LTV** (Customer Lifetime Value) | Доход от клиента за всё время | — | AOV × Частота × Срок жизни |
| **Churn Rate** | Отток клиентов | 5-10%/мес | Ушедшие / всего за период |
| **Redemption Rate** | Доля использования бонусов | 60-80% | Списано / начислено за период |
| **Breakage** | Сгоревшие бонусы | 10-20% | Сгорело / начислено |

## Правила начисления бонусов

### Decision-tree

```mermaid
flowchart TD
    START{"Заказ<br/>доставлен?"}
    START -->|"Да"| TIER{"Уровень<br/>клиента?"}
    TIER -->|Bronze| B["1% от суммы"]
    TIER -->|Silver| S["3% от суммы"]
    TIER -->|Gold| G["5% от суммы"]
    TIER -->|Platinum| P["7% от суммы"]
    START -->|"Нет"| WAIT["Ожидание доставки"]
    B --> PROMO{"Есть акция<br/>«двойные баллы»?"}
    S --> PROMO
    G --> PROMO
    P --> PROMO
    PROMO -->|"Да"| DOUBLE["Начисление ×2"]
    DOUBLE --> SAVE
    PROMO -->|"Нет"| SAVE["Сохранить транзакцию"]
```

### Правила списания

- Максимум: 30% от стоимости заказа
- Минимум для списания: 100 баллов
- Не суммируется с некоторыми промо-кодами
- При возврате: баллы восстанавливаются (за вычетом сгоревших)

## Интеграция с OMS

```mermaid
sequenceDiagram
    participant O as OMS
    participant L as Loyalty Engine
    participant R as Rule Engine

    O->>L: Check balance (customer_id)
    L-->>O: balance: 1200, level: Silver
    O->>O: Расчёт списания (max 30% = 1500)
    O->>L: Apply spend (customer_id, order_id, 1200)
    L-->>O: OK, new balance: 0

    Note over O: Заказ доставлен
    O->>L: Earn (customer_id, order_id, 3800 ₽)
    L->>R: Calculate earn (level: Silver, rate: 3%)
    R-->>L: 3800 × 3% = 114
    L-->>O: OK, earned: 114
```

## Практический кейс: «Яндекс Плюс»

**Механика:**
- Подписка: 299 ₽/мес
- Кэшбэк: до 10% баллами (1 балл = 1 рубль)
- Баллы начисляются на Яндекс.Маркет, Лавку, Такси, Музыку
- Сгорание: через 365 дней после начисления

**Результаты (данные Яндекса, 2024):**
- > 30 млн подписчиков
- AOV участников — на 40% выше
- Retention Rate — на 25% выше
- Churn — ниже на 15%

## Проверь себя

1. **Назовите 4 типа программ лояльности.**
   *Ответ:* Балльная, кэшбэк, уровневая, подписочная.

2. **Что такое Redemption Rate?**
   *Ответ:* Доля начисленных бонусов, которые клиенты реально потратили. Норма: 60-80%. Низкий показатель — баллы не ценятся, высокий — программа успешна.

3. **Как интеграция OMS с Loyalty Engine обрабатывает заказ?**
   *Ответ:* На этапе оформления — проверка баланса, списание. После доставки — начисление по правилам.

4. **Какие метрики используете для оценки программы лояльности?**
   *Ответ:* RPR, AOV, LTV, Churn, Redemption Rate.

## Ссылки для самостоятельного изучения

| Что | Описание | URL |
|-----|----------|-----|
| Яндекс Плюс — технология | Как устроен кэшбэк | yandex.ru |
| СберСпасибо | Программа лояльности | spasibo.sberbank.ru |
| Amazon Prime | Подписка | amazon.com |
| Harvard Business Review — Loyalty | Best practices | hbr.org |
