---
id: event-storming-advanced
sidebar_position: 15
title: "Event Storming — продвинутый уровень"
sidebar_label: "Event Storming (продвинутый)"
level: 7
category: integration
tags: [integration, l4, senior, event-storming, ddd, facilitation, workshop]
prerequisites: [integration/event-storming]
leads_to: []
related: [architecture/ddd-intro, architecture/hexagonal-architecture, integration/enterprise-integration-patterns]
estimated_time: 35
difficulty: 7
---

# Event Storming — продвинутый уровень

Event Storming — это методика воркшопа для моделирования бизнес-процессов и проектирования систем. На продвинутом уровне Event Storming используется для **стратегического DDD**: discovery bounded contexts, проектирование микросервисов, реверс-инжиниринг legacy.

## Три уровня Event Storming

| Уровень | Цель | Кто участвует | Длительность |
|---------|------|---------------|-------------|
| **Big Picture** | Стратегический обзор, поиск bounded contexts | Business + IT | 2–4 часа |
| **Process Level** | Детальное моделирование процесса | Аналитики + разработчики | 4–8 часов |
| **Design Level** | Проектирование aggregate, событий, команд | Команда разработки | 4–8 часов |

## Big Picture (Стратегический уровень)

Задача: понять, какие есть домены, где их границы, какие внешние системы.

### Стикеры Big Picture

| Цвет | Что обозначает | Пример |
|------|---------------|--------|
| 🟧 **Оранжевый** | Domain event (событие) | Order Placed |
| 🟦 **Синий** | Command (команда) | Place Order |
| 🟩 **Зелёный** | Aggregate | Order |
| 🟪 **Фиолетовый** | External system | Payment Gateway |
| 🟨 **Жёлтый** | Role (роль пользователя) | Customer, Manager |
| ⬜ **Белый** | Hot spot (проблема, вопрос) | Как узнать статус? |

### Выявление Bounded Contexts

На Big Picture контексты видны как группы стикеров с сильной связностью:

```
┌─────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
│  Order Context   │  │  Inventory Context   │  │  Payment Context  │
│                  │  │                     │  │                   │
│  🟧 OrderPlaced  │  │  🟧 StockReserved   │  │  🟧 PaymentOK     │
│  🟧 OrderShipped │  │  🟧 StockReleased   │  │  🟧 PaymentFailed │
│  🟧 OrderPaid    │  │  🟩 Stock           │  │  🟩 Transaction   │
│  🟩 Order        │  │                     │  │                   │
└─────────────────┘  └─────────────────────┘  └──────────────────┘
```

- Внутри контекста — много событий и команд
- Между контекстами — редкие связи (через события)

## Process Level (Процессный уровень)

Детальное моделирование одного процесса внутри bounded context.

Правила:
- Все события — в хронологическом порядке (слева направо)
- Команды — над событиями, от которых они вызваны
- Aggregate — под событиями, которые его меняют
- Timeline — строка с временными рамками (если важны)

```
 Время:       T+0             T+1               T+2
            ┌──────────┐  ┌──────────────┐  ┌──────────────┐
 Command:   │ Add Item │  │ Checkout     │  │ Submit Order │
            └────┬─────┘  └──────┬───────┘  └──────┬───────┘
                 ▼               ▼                  ▼
            ┌──────────┐  ┌──────────────┐  ┌──────────────┐
 Event:     │Item Added│  │Cart CheckedOut│  │Order Submitted│
            └────┬─────┘  └──────┬───────┘  └──────┬───────┘
                 ▼               ▼                  ▼
 Aggregate:┌──────────┐  ┌──────────────┐  ┌──────────────┐
           │  Cart    │  │  Cart        │  │  Order       │
           └──────────┘  └──────────────┘  └──────────────┘
```

## Design Level (Проектный уровень)

Переход от событий к модели: **событие → aggregate → команда**.

Для каждого aggregate:
- ID, поля, invariants (бизнес-правила)
- Команды, которые он принимает
- События, которые он порождает
- Repository (интерфейс, не БД)

```
Aggregate: Order
────────────────────
ID: OrderId
Поля:
  - customerId: CustomerId
  - items: OrderItem[]
  - status: OrderStatus
  - total: Money

Invariants:
  - total не может быть 0
  - статус меняется по цепочке

Команды:
  - placeOrder() → OrderPlaced
  - cancelOrder() → OrderCancelled

События:
  - OrderPlaced { orderId, customerId, items, total }
  - OrderCancelled { orderId, reason }
```

## Event Storming для reverse engineering

Когда legacy никто не понимает:

1. Соберите всех, кто работает с системой (поддержка, QA, разработчики)
2. Наклейте все известные события (даже гипотетические)
3. Обсудите хронологию — где нарушена логика?
4. Найдите горячие точки (white sticky): никто не знает, что происходит после X
5. По результатам — bounded context map существующей системы

## Facilitation (Фасилитация)

### Роль фасилитатора

- Не участник, не эксперт домена
- Задаёт вопросы: «что происходит после этого?», «кто это делает?», «как часто?»
- Следит за таймингом (не застревать на деталях)
- Фиксирует горячие точки

### Тайминг Big Picture

| Этап | Время | Что делаем |
|------|-------|------------|
| 1. События | 30 мин | Всё, что происходит в системе |
| 2. Команды | 20 мин | Кто и что вызывает |
| 3. External systems | 15 мин | Внешние системы |
| 4. Actors | 15 мин | Роли пользователей |
| 5. Bounded contexts | 30 мин | Группировка, границы |
| 6. Hot spots | 10 мин | Проблемные места |
| 7. Retro | 10 мин | Что уносим |

### Инструменты

| Инструмент | Для чего |
|-----------|---------|
| **Miro** | Удалённый Event Storming, шаблоны sticky notes |
| **Stickers / флипчарт** | Офлайн-воркшоп |
| **EventStorming Studio** | Онлайн, специализированный инструмент |
| **Confluence** | Документирование результатов |

## Результаты Event Storming

- **Bounded Context map** — карта контекстов и их связей
- **Ubiquitous Language** — глоссарий терминов
- **Список горячих точек** — что нужно выяснить
- **Aggregate design** — первые версии aggregate
- **Событийная модель** — какие события, кто продюсер и консьюмер

## Ссылки

- [Event Storming (Alberto Brandolini)](https://www.eventstorming.com/) — официальный сайт
- [Книга: Event Storming (Alberto Brandolini)](https://www.eventstorming.com/book/)
- [Event Storming в Miro — шаблон](https://miro.com/templates/event-storming/)
- [Event Storming для reverse engineering](https://www.thoughtworks.com/insights/blog/event-storming-reverse-engineering-legacy-system)
- [Big Picture Event Storming — пошаговый гайд](https://medium.com/domain-driven-design/event-storming-big-picture-908ab6d36bbd)
