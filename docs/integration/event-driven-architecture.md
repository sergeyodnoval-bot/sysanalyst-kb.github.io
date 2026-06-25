---
id: event-driven-architecture
sidebar_position: 6
title: "Event-Driven Architecture (введение)"
sidebar_label: "Event-Driven Architecture"
level: 6
category: integration
tags: [integration, l3, middle, eda, events, architecture]
prerequisites: [integration/async-message-queue]
leads_to: [integration/event-storming]
related: [integration/kafka, integration/rabbitmq, architecture/monolith-vs-microservices]
estimated_time: 30
difficulty: 6
---

# Event-Driven Architecture (введение)

Event-Driven Architecture (EDA) — архитектурный стиль, в котором компоненты общаются через события, а не через прямые вызовы. Если микросервисы — про независимость деплоя, то EDA — про независимость во времени и пространстве.

## Событие (Event)

Событие — это факт, который уже произошёл в прошлом. `OrderCreated`, `PaymentReceived`, `UserRegistered`. Событие нельзя отменить — оно уже случилось.

Структура события:
```json
{
  "eventId": "evt_12345",
  "eventType": "OrderCreated",
  "source": "order-service",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "orderId": 42,
    "customerId": 7,
    "total": 1500
  }
}
```

**eventId** — уникальный идентификатор (для идемпотентности).
**eventType** — тип события (строка или enum).
**source** — сервис, создавший событие.
**data** — payload с деталями.

## Event Notification vs Event Sourcing

**Event Notification.** Сервисы обмениваются уведомлениями. `OrderCreated → PaymentService начинает обработку`. Текущее состояние — в базе каждого сервиса. Это просто асинхронная коммуникация.

**Event Sourcing.** Все изменения состояния хранятся как последовательность событий. Текущее состояние восстанавливается воспроизведением событий. База — не таблицы, а лог событий.

## Choreography vs Orchestration

**Choreography (хореография).** Каждый сервис сам решает, на какие события подписываться и что делать. Нет центрального координатора.

Плюсы: слабая связанность, простота добавления новых сервисов.
Минусы: сложно отследить бизнес-процесс, нет гарантии completion.

**Orchestration (оркестрация).** Центральный сервис (orchestrator) говорит каждому участнику, что делать.

Плюсы: процесс виден, легко добавить error handling.
Минусы: оркестратор — single point of failure, сильная связанность.

## Проблемы EDA

**Eventual consistency.** Нет гарантии, что через секунду после события все сервисы увидят согласованные данные.

**Сложность тестирования.** Нужно проверять не отдельные сервисы, а цепочки событий.

**Idempotency.** Одно событие может прийти дважды. Consumer должен это пережить.

**Tracing.** Где сейчас мой запрос? В REST — цепочка понятна. В EDA событие может пройти через 5 сервисов, и неочевидно, где задержка.

## Когда выбирать EDA

- Сложные бизнес-процессы, которые меняются
- Много сервисов, которые должны реагировать на одно событие
- Нужна высокая устойчивость (падение одного сервиса не ломает всё)
- Требуется аудит полной истории изменений

## Что дальше

- **Event Storming** — метод моделирования EDA с командой
- **Kafka** — технология для реализации EDA

## Проверь себя

1. Чем Event Notification отличается от Event Sourcing?
2. В чём разница между choreography и orchestration?
3. Какие три проблемы нужно решить при внедрении EDA?
