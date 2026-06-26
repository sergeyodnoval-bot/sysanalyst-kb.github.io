---
id: ecommerce-analytics
title: Retail-аналитика и персонализация
sidebar_label: Retail-аналитика
level: 7
category: specialization
tags: [ecommerce, analytics, metrics, personalization, ab-testing]
prerequisites: [specialization/ecommerce-retail-path, specialization/ecommerce-loyalty]
leads_to: []
related: [specialization/ai-ml-metrics, architecture/monitoring, data/dwh-basics]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info TL;DR
Retail-аналитика отвечает на вопросы: сколько заработали, сколько потратили на привлечение, как удержать клиента? Ключевые метрики: AOV (средний чек), LTV (жизненный цикл), CAC (стоимость привлечения), conversion funnel. Персонализация — рекомендации товаров на основе истории покупок и поведения.
:::

## Ключевые метрики e-commerce

### Метрики продаж

| Метрика | Формула | Что показывает |
|---------|---------|---------------|
| **GMV** | Сумма всех заказов | Объём продаж (валовый) |
| **Revenue** | GMV - скидки - возвраты | Фактическая выручка |
| **AOV** | Revenue / Orders | Средний чек |
| **Orders / day** | — | Количество заказов в день |
| **Items / order** | — | Товаров в заказе |

### Метрики клиентов

| Метрика | Формула | Что показывает |
|---------|---------|---------------|
| **CAC** | Marketing cost / New customers | Стоимость привлечения клиента |
| **LTV** | Avg revenue × Avg lifetime | Доход от клиента за всё время |
| **LTV/CAC** | LTV / CAC | Окупаемость (хорошо > 3) |
| **Retention rate** | (Users_end - New) / Users_start | Удержание клиентов |
| **Churn rate** | 1 - Retention | Отток клиентов |
| **Repeat purchase rate** | Купили > 1 раза / Всего | Повторные покупки |

### Конверсионные метрики

```
Visit → Product View → Add to Cart → Checkout → Purchase
 │          │              │            │          │
 ▼          ▼              ▼            ▼          ▼
100%       40%            15%           8%        3%
            (view→cart)    (cart→check) (check→buy)
```

| Этап | Метрика |
|------|---------|
| Visit → Add to Cart | Add-to-cart rate |
| Cart → Checkout | Checkout initiation rate |
| Checkout → Purchase | Conversion rate (CR) |
| Purchase → Repeat | Repeat purchase rate |

## Персонализация

**Зачем:** увеличить AOV и конверсию, показывая релевантные товары.

### Типы рекомендаций

| Тип | Механика | Пример |
|-----|----------|--------|
| **Collaborative filtering** | «Кто купил этот товар, купил также…» | Amazon |
| **Content-based** | «Похожие товары по характеристикам» | AliExpress |
| **Popular** | «Популярное в вашем регионе» | Wildberries |
| **Personalized** | На основе истории покупок | Ozon |
| **Real-time** | «С этим товаром часто берут…» | Корзина |
| **Cross-sell** | «Добавьте к заказу…» | Checkout |
| **Up-sell** | «Более новая модель…» | Карточка товара |

### A/B тестирование

**Гипотеза:** Смена расположения кнопки «Купить» увеличит конверсию на 5%.

```
Группа A (контроль): старая верстка
Группа B (изменение): кнопка вверху страницы

Метрика: conversion rate (покупка / визит)
Длительность: 7 дней (минимум 10 000 визитов в каждой группе)
Статистическая значимость: p < 0.05
```

## Продуктовые метрики для аналитика

При спецификации e-commerce платформы аналитик определяет метрики:

| Метрика | Где измерять | SLA |
|---------|-------------|-----|
| Conversion rate | CRM + Web Analytics | Ежедневно |
| AOV | OMS | Ежедневно |
| Заказов в час | OMS | В реальном времени |
| Остатки на складе | WMS | Ежедневно |
| Время сборки | WMS | Ежечасно |
| Время доставки | TMS | Ежедневно |
| Возвраты | OMS | Еженедельно |
| CAC | Маркетинг | Ежемесячно |
| LTV | CRM | Ежемесячно |

## Требования к системе аналитики

| Параметр | Пример |
|----------|--------|
| События | 50+ типов (purchase, add_to_cart, view, search) |
| Задержка данных | Real-time (Kafka) для фрода, T+1 для отчётов |
| Retention данных | 3 года |
| Отчёты | Sales, Marketing, Warehouse, Finance |
| Дашборды | Daily, Weekly, Monthly |
| Алерты | Падение CR > 10% за час |
| A/B тесты | Встроенный инструмент |

## Что дальше

- [Мониторинг](/docs/architecture/monitoring) — метрики инфраструктуры
- [DWH](/docs/data/dwh-basics) — хранение аналитики

## Проверь себя

1. **Какие метрики e-commerce вы знаете?**
   *Ответ:* GMV, Revenue, AOV, CAC, LTV, Retention, Churn, Conversion rate, Repeat purchase rate.

2. **Что такое воронка конверсии в e-commerce?**
   *Ответ:* Visit → Product View → Add to Cart → Checkout → Purchase. Каждый этап имеет свой % конверсии.

3. **Какие типы рекомендаций существуют?**
   *Ответ:* Collaborative filtering, content-based, popular, personalized, real-time, cross-sell, up-sell.
