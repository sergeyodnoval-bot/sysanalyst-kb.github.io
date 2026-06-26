---
id: industry-analytics
sidebar_position: 4
title: "Отраслевая аналитика (FinTech, Retail, Logistics)"
sidebar_label: "Отраслевая аналитика"
level: 5
category: specialization
tags: [specialization, l3, middle, industry, fintech, retail, logistics]
prerequisites: [basics/who-is-system-analyst]
leads_to: []
related: [specialization/ba-vs-sa, integration/event-driven-architecture, data/dwh-basics]
estimated_time: 20
difficulty: 5
---

# Отраслевая аналитика (FinTech, Retail, Logistics)

Системный аналитик обычно работает не в вакууме, а в конкретной отрасли. Разные отрасли имеют разную специфику: терминологию, процессы, требования к системе, регуляцию.

## Общее для всех отраслей

Навыки SA универсальны, но отраслевой контекст даёт преимущество:
- Вы знаете бизнес-термины без объяснений
- Понимаете, какие данные критичны
- Можете предвидеть типовые проблемы
- Быстрее находите общий язык с заказчиком

## FinTech (Финансовые технологии)

> Подробный разбор FinTech — в специализации [FinTech-аналитик](/docs/specialization/fintech-analyst-path).

FinTech — одна из самых сложных и регулируемых отраслей. Ключевые особенности: высокая точность транзакций, жёсткая регуляция (ЦБ, 115-ФЗ, PCI DSS, PSD2), real-time обработка платежей, сверка (reconciliation) и работа с double-entry accounting.

**Статьи специализации:** [Платёжные системы](/docs/specialization/fintech-payments), [Регуляторика](/docs/specialization/fintech-regulation), [Протоколы](/docs/specialization/fintech-protocols), [Ledger](/docs/specialization/fintech-ledger), [Сверка](/docs/specialization/fintech-reconciliation), [Open Banking](/docs/specialization/fintech-open-banking), [Фрод-мониторинг](/docs/specialization/fintech-fraud), [Кредитный конвейер](/docs/specialization/fintech-lending).

## Retail (Ритейл / E-commerce)

**Ключевые особенности:**
- **Высокая нагрузка** — Black Friday, 11.11: пики в 100x от обычной
- **Инвентаризация** — товарный запас, стоки, резервирование
- **Ценообразование** — динамические цены, промо, купоны, скидки
- **Мультиканальность** — магазин + сайт + мобильное приложение + маркетплейсы
- **Логистика** — доставка, ПВЗ, возвраты

**Типовые задачи:**
- Интеграция с WMS (складские системы) и ERP
- Каталог товаров: иерархия, атрибуты, поиск (Elasticsearch)
- Корзина и заказы (Order Management System)
- Программы лояльности (баллы, кешбэк, уровни)

**Что нужно знать:**
- Управление стоками (FIFO, LIFO, партионный учёт)
- Order Fulfillment: pick, pack, ship
- Event-Driven Architecture для синхронизации товаров
- Работа с маркетплейсами (Ozon, Wildberries, Яндекс.Маркет)

**Где работать:** интернет-магазины, маркетплейсы, сети магазинов, D2C-бренды.

## Logistics (Логистика)

**Ключевые особенности:**
- **Геоданные** — координаты, маршруты, адреса (ФИАС, КЛАДР)
- **Статусы и трекинг** — каждая посылка проходит 10–20 статусов
- **Оптимизация** — маршруты, загрузка машин, time windows
- **Интеграции** — EMS, Boxberry, CDEK, PickPoint, Почта России
- **Документооборот** — накладные, ЭДО, печать документов

**Типовые задачи:**
- Система управления доставкой (TMS)
- Трекинг-система для клиента
- Интеграция с курьерскими службами
- Расчёт стоимости доставки

**Что нужно знать:**
- Геоданные и карты (Яндекс.Карты, 2GIS, Mapbox)
- Machine Learning для прогноза времени доставки
- Оптимизация маршрута (Travelling Salesman Problem — в общем)
- ЭДО (Диадок, Контур, СБИС)

**Где работать:** логистические операторы, маркетплейсы (своя доставка), сервисы доставки еды.

## Как выбрать отрасль

| Если вам нравится… | Идите в… |
|-------------------|---------|
| Деньги, цифры, точность | FinTech |
| Товары, клиенты, маркетинг | Retail / E-commerce |
| Маршруты, оптимизация, карты | Logistics |
| Лекарства, здоровье | MedTech / HealthTech |
| Документы, законы, согласования | GovTech / Enterprise |
| Игры, соцсети, контент | EdTech / AdTech |

## Ссылки

- [FinTech: что нужно знать аналитику — habr](https://habr.com/ru/company/tinkoff/blog/507412/)
- [Ритейл и E-commerce: аналитика и API](https://habr.com/ru/company/ozontech/blog/661725/)
- [Логистика: как устроена система доставки](https://habr.com/ru/company/deliveryclub/blog/528176/)
- [ISO 20022 — платёжные сообщения](https://www.iso20022.org/)
- [ФИАС — адресная система РФ](https://fias.nalog.ru/)
