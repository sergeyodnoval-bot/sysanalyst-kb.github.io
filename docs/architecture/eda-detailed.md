---
id: eda-detailed
sidebar_position: 6
title: "Event-Driven Architecture (детально)"
sidebar_label: "EDA детально"
level: 7
category: architecture
tags: [architecture, l3, middle, eda, events, patterns]
prerequisites: [architecture/cqrs, integration/event-storming]
leads_to: [architecture/solid]
related: [integration/event-driven-architecture, integration/kafka, architecture/microservices-patterns]
estimated_time: 30
difficulty: 6
---

# Event-Driven Architecture (детально)

Вы уже знаете основы EDA из раздела интеграции. Теперь рассмотрим архитектурные аспекты: как проектировать события, как организовывать потоки и как EDA меняет дизайн системы.

## Event Schema

Каждое событие имеет контракт. Как и API-контракт, контракт события должен быть версионирован и стабилен.

```json
{
  "schemaVersion": "1.0",
  "eventType": "OrderCreated",
  "source": "order-service",
  "id": "evt_001",
  "timestamp": "2025-06-01T10:00:00Z",
  "data": {
    "orderId": "123",
    "customerId": "456",
    "items": [{"productId": "789", "quantity": 2}]
  }
}
```

**Schema Registry** (Confluent Schema Registry, Apicurio) хранит контракты и проверяет совместимость. Позволяет эволюционировать события без слома потребителей.

## Event Types

**Domain Event.** Факт в домене. `OrderCreated`, `PaymentReceived`. Всегда в прошедшем времени.

**Integration Event.** Событие для внешних систем. Может отличаться от доменного: содержит только то, что разрешено публиковать наружу.

**Notification Event.** Сигнал, что что-то произошло, без payload. `OrderChanged` — подписчик идёт запрашивать данные сам.

**Snapshot Event.** Полный срез состояния. `CustomerState` — все данные о клиенте на текущий момент.

## Event Evolution

События живут долго. Через год после запуска у вас будут старые события со старой схемой. Стратегии эволюции:

**Upcasting.** При чтении старого события трансформировать его в новую схему.

**Version in schema.** Хранить версию в схеме, consumer сам выбирает, как обрабатывать.

**Tolerant reader.** Consumer читает только нужные поля, игнорируя остальные.

## Event Bus топологии

**Point-to-Point.** Событие доставляется одному потребителю (через очередь).

**Pub/Sub.** Событие доставляется всем подписчикам.

**Event Store.** Все события сохраняются в Event Store, подписчики читают из него.

## Consistency Models

**Eventual consistency.** Допустимый компромисс: read-модель может отставать на секунды.

**Read-your-writes.** Гарантия, что после записи пользователь сразу видит свои данные.

**Strong consistency.** Для критичных операций EDA не годится — нужна синхронизация.

## Anti-patterns

**God Event.** Одно огромное событие с полусодержимым всей БД. Непонятно, что изменилось.

**Event Carried State Transfer.** Передача всей сущности в событии, хотя подписчик мог уже прочитать это из другого события.

**Missing Schema.** События без контракта — каждый парсит как может.

## Что дальше

- **SOLID для аналитика** — принципы, применимые к EDA
- **ADR** — как документировать архитектурные решения

## Проверь себя

1. Зачем нужен Schema Registry?
2. Какие четыре типа событий существуют?
3. Что такое God Event и чем он плох?
