---
id: hexagonal-architecture
sidebar_position: 10
title: "Hexagonal Architecture (Ports & Adapters)"
sidebar_label: "Hexagonal Architecture"
level: 7
category: architecture
tags: [architecture, l4, senior, hexagonal, ports-and-adapters, clean-architecture]
prerequisites: [architecture/microservices-patterns]
leads_to: []
related: [architecture/ddd-intro, architecture/layered-architecture, architecture/cqrs]
estimated_time: 35
difficulty: 7
---

# Hexagonal Architecture (Ports & Adapters)

Hexagonal Architecture (также Ports & Adapters) — это архитектурный паттерн, который изолирует бизнес-логику от внешних систем (БД, API, UI, message broker).

Цель: **чтобы ядро приложения не зависело от деталей инфраструктуры**.

Hexagonal Architecture — это эволюция слоистой архитектуры (layered), где абстракции направлены **внутрь**, а зависимости — тоже **внутрь**.

## Слоистая vs Hexagonal

### Слоистая архитектура

```
    ┌──────────────────┐
    │    Controller    │  ← зависит от слоя сервисов
    ├──────────────────┤
    │    Service       │  ← зависит от слоя репозиториев (БД)
    ├──────────────────┤
    │   Repository     │  ← зависит от конкретной БД
    └──────────────────┘
```

Проблема: высокий уровень связности, изменение БД тянет изменения в сервис и контроллер.

### Hexagonal Architecture

```
        ┌──────────────────────────────┐
        │         Application          │
        │  ┌────────────────────────┐  │
        │  │  Domain (core)         │  │
        │  │  - Entities           │  │
        │  │  - Use Cases          │  │
        │  │  - Ports (interfaces) │  │
        │  └───────────┬────────────┘  │
        │              │               │
        │    ┌─────────┴─────────┐     │
        │    │  Adapters (in)    │     │
        │    │  Controller       │     │
        │    │  CLI              │     │
        │    │  Kafka consumer   │     │
        │    └───────────────────┘     │
        │                              │
        │    ┌───────────────────┐     │
        │    │  Adapters (out)   │     │
        │    │  PostgresRepo     │     │
        │    │  RedisCache       │     │
        │    │  EmailSender      │     │
        │    └───────────────────┘     │
        └──────────────────────────────┘
```

## Как это работает

### 1. Domain (ядро)

Бизнес-логика, сущности, use cases. **Не имеет внешних зависимостей** (без фреймворков, БД, HTTP).

### 2. Ports (интерфейсы)

Интерфейсы, которые определяют, как ядро взаимодействует с внешним миром.

```typescript
// Port (outbound) — что нужно ядру
interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
}

// Port (inbound) — что ядро умеет делать
interface OrderService {
  placeOrder(items: OrderItem[]): Promise<Order>;
  cancelOrder(id: OrderId): Promise<void>;
}
```

### 3. Adapters (адаптеры)

Реализации портов:

```typescript
// Adapter (outbound) — конкретная БД
class PostgresOrderRepository implements OrderRepository {
  async save(order: Order) {
    await db.query('INSERT INTO orders ...');
  }
}

// Adapter (inbound) — контроллер
class OrderController {
  constructor(private orderService: OrderService) {}
  async post(req: Request, res: Response) {
    const order = await this.orderService.placeOrder(req.body.items);
    res.json(order);
  }
}
```

## Преимущества

- **Тестируемость** — ядро тестируется без БД и HTTP
- **Заменяемость** — PostgreSQL → MongoDB: новый adapter, ядро не трогаем
- **Чистая бизнес-логика** — не смешана с JSON, SQL, HTTP
- **Независимость** — можно переписать UI или заменить БД без изменения логики

## Когда использовать

- **Микросервисы** — каждый сервис с чёткой бизнес-логикой
- **Долгоживущие проекты** — вырастут, поменяют БД, добавят UI
- **DDD** — hexagonal идеально сочетается с domain-driven design

Когда **НЕ** нужно:
- CRUD-приложение (логики нет, одна БД)
- Быстрый прототип

## Связь с Clean Architecture

Clean Architecture (Robert Martin) — это развитие hexagonal:
- Те же concentric circles (внешние → внутренние)
- Dependency Rule: зависимости только внутрь
- Разница: Clean Architecture более prescriptive (4 слоя), hexagonal — только 2 зоны (core / adapters)

## Для системного аналитика

Понимание hexagonal architecture полезно для:
- Проектирования границ микросервисов
- Описания интеграций (какие порты, какие адаптеры)
- Анализа coupling — если сервис жёстко связан с БД, это проблема
- Оценки стоимости изменений — переезд на новую БД = новый adapter

## Ссылки

- [Ports & Adapters (Alistair Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/) — оригинальная статья
- [Clean Architecture (Robert Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture: по-русски](https://habr.com/ru/company/oleg-bunin/blog/427195/)
- [DDD, Hexagonal, Onion Architecture — сравнение](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
