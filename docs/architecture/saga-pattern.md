---
id: saga-pattern
sidebar_position: 11
title: "Saga pattern — управление транзакциями"
sidebar_label: "Saga pattern"
level: 7
category: architecture
tags: [architecture, l4, senior, saga, transactions, distributed-systems, kafka]
prerequisites: [architecture/cqrs]
leads_to: []
related: [architecture/eda-detailed, integration/kafka, integration/event-driven-architecture]
estimated_time: 35
difficulty: 7
---

# Saga pattern — управление транзакциями

Saga — это паттерн для управления **распределёнными транзакциями** в микросервисной архитектуре. Когда одна бизнес-операция затрагивает несколько сервисов, обычная ACID-транзакция (на уровне БД) невозможна. Saga координирует шаги и компенсации.

## Проблема

В монолите транзакция выглядит так:

```sql
BEGIN;
  UPDATE orders SET status = 'paid' WHERE id = 123;
  UPDATE inventory SET stock = stock - 1 WHERE product = 456;
  UPDATE wallet SET balance = balance - 100 WHERE user = 789;
COMMIT;
```

В микросервисах каждый пункт — отдельный сервис с отдельной БД. Нет глобального COMMIT.

## Как работает Saga

Saga разбивает распределённую транзакцию на **локальные транзакции**, каждая в своём сервисе. Если один шаг упал — запускаются **компенсирующие действия** (rollback на уровне бизнес-логики).

## Choreography (Хореография)

Каждый сервис реагирует на события и публикует свои.

```
  Order Service          Payment Service        Inventory Service
       │                      │                       │
       │── create order ─────→│                       │
       │                      │── process payment ───→│
       │                      │                       │── reserve stock ──→ Done
       │                      │                       │
       │                      │          если ошибка: │
       │                      │←── payment failed ────│
       │←── order cancelled ──│                       │
```

**Плюсы:** простота (нет координатора), меньше точек отказа.

**Минусы:** сложно отследить full flow, циклические зависимости.

**Когда использовать:** простые цепочки, 2-3 сервиса.

## Orchestration (Оркестрация)

Центральный **Saga Coordinator** управляет шагами.

```
  ┌──────────────────────────────────────────────┐
  │              Saga Coordinator                 │
  │  1. placeOrder() → Order Service             │
  │  2. processPayment() → Payment Service       │
  │  3. reserveStock() → Inventory Service        │
  │  4. confirmOrder() → Order Service            │
  └──────────────┬────────────────────────────────┘
                 │
    ┌────────────┼────────────┬────────────┐
    │            │            │            │
    ▼            ▼            ▼            ▼
  Order       Payment      Inventory    Notification
  Service     Service      Service      Service
```

**Плюсы:** полный контроль, легко мониторить и отлаживать.

**Минусы:** координатор — единая точка отказа и сложности.

**Когда использовать:** сложные flows с branching, 4+ сервисов.

## Компенсирующие транзакции

Каждый шаг saga должен иметь **компенсацию** — действие, которое отменяет его эффект.

| Шаг | Компенсация |
|-----|-------------|
| `Order Created` | `Order Cancelled` — меняем статус на cancelled |
| `Payment Processed` | `Payment Refunded` — возврат денег |
| `Stock Reserved` | `Stock Released` — увеличиваем остаток |
| `Email Sent` | не нужна (отправка email — fire-and-forget) |

## Saga vs ACID

| | ACID (монолит) | Saga (микросервисы) |
|--|----------------|---------------------|
| **Изоляция** | Serializable / Repeatable Read | Eventual consistency |
| **Откат** | Автоматический (ROLLBACK) | Ручной (компенсации) |
| **Блокировки** | Есть (на время транзакции) | Нет (saga работает быстрее) |
| **Сложность** | Низкая (встроено в БД) | Высокая (код + инфраструктура) |
| **Консистентность** | Strong consistency | Eventual consistency |

## Когда использовать Saga

- **Travel booking** — бронь отеля + авиабилет + страховка
- **E-commerce** — заказ + оплата + склад + доставка
- **Banking** — перевод между счетами в разных системах

Когда **НЕ** использовать:
- Простые операции внутри одного сервиса
- Сильная консистентность обязательна (real-time balances)

## Outbox pattern

Проблема: в saga важно **гарантировать отправку события**, иначе система зависнет.

**Outbox pattern:** вместо прямой отправки события — пишем в таблицу `outbox` в той же БД, что и бизнес-данные. Отдельный процесс читает outbox и отправляет события.

```sql
BEGIN;
  UPDATE orders SET status = 'paid' WHERE id = 123;
  INSERT INTO outbox (event_type, payload, created_at)
    VALUES ('order.paid', '{"order_id": 123}', NOW());
COMMIT;
-- после COMMIT: outbox publisher читает и отправляет в Kafka
```

## Saga и Kafka

Типичная реализация saga использует Kafka как транспорт:

- Каждый шаг публикует событие в Kafka
- Следующий сервис читает событие из Kafka
- Saga Coordinator (если orchestration) слушает все топики
- Компенсации — это отдельные топики (`.compensate`)

## Ссылки

- [Saga pattern (Microsoft)](https://docs.microsoft.com/en-us/azure/architecture/patterns/saga)
- [Saga — оригинальная статья (Garcia-Molina & Salem, 1987)](https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf)
- [Outbox pattern (Chris Richardson)](https://microservices.io/patterns/data/transactional-outbox.html)
- [Kafka + Saga — пример на Rust](https://github.com/j5ik2o/saga-pattern-with-kafka)
- [Saga vs Process Manager (Camunda)](https://camunda.com/blog/2020/10/saga-vs-process-manager/)
