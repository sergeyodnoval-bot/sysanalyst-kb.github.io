---
id: ddd-intro
sidebar_position: 9
title: "DDD — Domain-Driven Design (введение)"
sidebar_label: "DDD — введение"
level: 7
category: architecture
tags: [architecture, l4, senior, ddd, domain-driven-design, ubiquitous-language]
prerequisites: [architecture/solid, architecture/adr]
leads_to: [architecture/hexagonal-architecture]
related: [architecture/microservices-patterns, integration/event-storming]
estimated_time: 40
difficulty: 7
---

# DDD — Domain-Driven Design (введение)

Domain-Driven Design (DDD) — это подход к проектированию ПО, в котором **сложность бизнес-логики** находится в центре внимания. DDD предлагает набор концепций и паттернов для моделирования предметной области (domain) в коде.

DDD не про технологии (БД, фреймворки, API) — он про то, как сделать так, чтобы код отражал реальный бизнес.

## Когда нужен DDD

- **Сложная бизнес-логика** — расчёты, правила, workflow с множеством состояний
- **Несколько domain-экспертов** — нужен единый язык для общения
- **Код не отражает бизнес** — названия классов и таблиц не совпадают с терминами бизнеса
- **Долгая поддержка** — проект живёт 5+ лет, логика постоянно меняется

Когда DDD **НЕ** нужен:
- CRUD-приложение (форма ввода → таблица в БД)
- Простой поиск / отображение данных
- Прототип / MVP, где важнее скорость

## Ubiquitous Language (Единый язык)

Главная идея DDD: **один термин — одно значение во всей команде**.

- Бизнес говорит «заказ», аналитик пишет «заказ» в спецификации, разработчик называет класс `Order` — это единый язык
- Если бизнес говорит «отгрузка», а в коде `Shipment` — ок
- Если бизнес говорит «отгрузка», а в коде `Delivery` — проблема

**Как строить:**
- Собирайте глоссарий терминов с domain-экспертами
- Фиксируйте в ADR и wiki
- Спорные термины обсуждайте на Event Storming

## Стратегическое моделирование (Strategic Design)

### Bounded Context

**Bounded Context** — это граница, внутри которой действует единый язык (Ubiquitous Language).

Один домен (например, «Интернет-магазин») разбивается на несколько bounded contexts:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Order Context  │   │  Inventory Ctrl │   │  Payment Ctrl   │
│  (заказы)       │   │  (склад)        │   │  (оплата)       │
│                 │   │                 │   │                 │
│  Термины:       │   │  Термины:       │   │  Термины:       │
│  Order, Item,   │   │  Stock,         │   │  Invoice,       │
│  DeliveryAddr   │   │  Warehouse,     │   │  Transaction    │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

Каждый bounded context может иметь свою модель данных, свою БД, свою команду.

### Context Mapping

Отношения между bounded contexts:

| Тип связи | Описание |
|-----------|----------|
| **Partnership** | Два контекста синхронизируются (например, через события) |
| **Shared Kernel** | Общая часть модели (shared library) |
| **Customer-Supplier** | Upstream контекст поставляет данные downstream |
| **Conformist** | Downstream подстраивается под upstream без изменений |
| **Anti-Corruption Layer** | Слой-адаптер, который защищает контекст от чужой модели |
| **Open-Host Service** | Публичный API одного контекста для других |

### Anti-Corruption Layer (ACL)

Самый частый паттерн при интеграции: **не даём чужой модели испортить нашу**.

```
        Legacy System              Bounded Context
    ┌──────────────────┐       ┌──────────────────────┐
    │  Customer        │       │  Client              │
    │  (cst_id, fnm,   │──ACL──│  (clientId, name,    │
    │   lname, ph,     │       │   phone, email)      │
    │   email_addr)    │       │                      │
    └──────────────────┘       └──────────────────────┘
```

ACL — это класс/сервис, который трансформирует legacy-модель в «чистую» модель контекста.

## Тактическое моделирование (Tactical Design)

### Entity

Объект с уникальным идентификатором, который не меняется со временем.

```typescript
class Order {
  constructor(public readonly id: OrderId) {}
  // идентификатор — часть класса
}
```

### Value Object

Объект без идентификатора, определяется своими атрибутами.

```typescript
class Address {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly zipCode: string,
  ) {}
  // immutable: если адрес изменился — это новый объект
}
```

### Aggregate

Группа Entity и Value Object, которые всегда сохраняются **целиком**.

```
         Aggregate: Order
        ┌──────────────────────────┐
        │  Order (Entity) ← id      │
        │  ├── OrderItem (Entity)   │
        │  ├── OrderItem (Entity)   │
        │  └── Address (Value Obj)  │
        └──────────────────────────┘
            ↑
      Repository (доступ к aggregate)
```

Правило: **один aggregate = одна транзакция**. Нельзя в одной транзакции менять два разных aggregate.

### Repository

Сервис для сохранения и восстановления aggregate. Не泄露 implementation (БД) наружу.

### Domain Event

Событие, которое произошло в домене: `OrderPlaced`, `PaymentReceived`, `StockDepleted`.

## DDD и системный аналитик

Аналитик играет ключевую роль в DDD:
- **Фасилитирует Event Storming** — находит bounded contexts и события
- **Собирает Ubiquitous Language** — глоссарий терминов
- **Документирует context map** — как контексты связаны
- **Проверяет модель на соответствие бизнесу** — код не оторвался от реальности
- **Фиксирует решения** — почему выбрали именно такие границы контекстов

## Ссылки

- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/) — «синяя книга», оригинал
- [Implementing Domain-Driven Design (Vaughn Vernon)](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577) — «красная книга», практика
- [DDD в картинках — Martin Fowler](https://martinfowler.com/tags/domain%20driven%20design.html)
- [Event Storming (Alberto Brandolini)](https://www.eventstorming.com/)
- [DDD на русском — habr](https://habr.com/ru/company/oleg-bunin/blog/538580/)
