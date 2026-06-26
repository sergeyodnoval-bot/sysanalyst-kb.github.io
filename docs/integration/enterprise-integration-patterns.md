---
id: enterprise-integration-patterns
sidebar_position: 13
title: "Enterprise Integration Patterns (EIP)"
sidebar_label: "EIP — введение"
level: 7
category: integration
tags: [integration, l4, senior, eip, integration-patterns, messaging]
prerequisites: [integration/event-driven-architecture, integration/event-storming]
leads_to: []
related: [integration/api-gateway, integration/async-message-queue, integration/kafka]
estimated_time: 40
difficulty: 7
---

# Enterprise Integration Patterns (EIP)

Enterprise Integration Patterns (EIP) — это каталог типовых решений для интеграции систем, описанный в книге Gregor Hohpe и Bobby Woolf (2004). EIP остаётся актуальным и сегодня — большинство современных шин (Kafka, RabbitMQ, Azure Service Bus) реализуют эти паттерны.

## Зачем EIP

- Интеграция нескольких систем — это сложно
- Каждый раз изобретать велосипед — дорого
- EIP даёт **единый язык** для архитекторов, аналитиков и разработчиков
- Паттерны не зависят от технологий

## Классификация EIP

EIP делятся на 6 категорий (по книге):

```
             ┌─────────────────────┐
             │  Message Channel     │
             │  (как доставляем)    │
             └──────────┬──────────┘
                        │
             ┌──────────▼──────────┐
             │  Message Route       │
             │  (куда доставляем)   │
             └──────────┬──────────┘
                        │
    ┌───────────────────┼───────────────────┐
    ▼                   ▼                   ▼
┌──────────┐    ┌──────────────┐    ┌──────────────┐
│ Message  │    │ Message      │    │ Message      │
│ Transform│    │ Endpoint     │    │ Bus / Bridge │
│ (как     │    │ (кто         │    │ (связка      │
│  меняем) │    │  принимает)  │    │  систем)     │
└──────────┘    └──────────────┘    └──────────────┘
```

## Основные паттерны

### Message Channel

| Паттерн | Описание |
|---------|----------|
| **Point-to-Point Channel** | Один отправитель → один получатель (конкурирующие потребители) |
| **Publish-Subscribe Channel** | Один отправитель → много получателей |
| **Dead Letter Channel** | Сообщения, которые не удалось обработать |

### Message Routing

| Паттерн | Описание | Пример |
|---------|----------|--------|
| **Content-Based Router** | Маршрутизация по содержимому сообщения | Заказы > 10K → VIP queue |
| **Message Filter** | Фильтрация ненужных сообщений | Игнорировать тестовые запросы |
| **Recipient List** | Явный список получателей | Разовая рассылка |
| **Splitter** | Разбить одно сообщение на несколько | Заказ → отдельные товары |
| **Aggregator** | Собрать несколько сообщений в одно | Частичная оплата → полный платёж |
| **Resequencer** | Восстановить порядок сообщений | Сообщения пришли не по порядку |
| **Routing Slip** | Цепочка шагов, заданная в самом сообщении | Сложный approval workflow |

### Message Transformation

| Паттерн | Описание |
|---------|----------|
| **Message Translator** | Преобразование формата / структуры |
| **Normalizer** | Приведение разных форматов к единому |
| **Enricher** | Обогащение сообщения данными из другого источника |
| **Content Filter** | Удаление лишних полей из сообщения |

### Message Endpoint

| Паттерн | Описание |
|---------|----------|
| **Service Activator** | Превращает сообщение в вызов сервиса |
| **Channel Adapter** | Подключает внешнюю систему к каналу сообщений |
| **Polling Consumer** | Получатель сам проверяет канал (pull) |
| **Event-Driven Consumer** | Получатель вызывается при появлении сообщения (push) |

## Пример: EIP в Kafka

| Kafka concept | EIP pattern |
|---------------|-------------|
| Topic | Publish-Subscribe Channel |
| Consumer Group | Point-to-Point Channel (competition) |
| Partition Key | Content-Based Router |
| Dead Letter Queue | Dead Letter Channel |
| Kafka Streams `flatMap` | Splitter |
| Kafka Streams `reduce` | Aggregator |

## Пример: EIP в RabbitMQ

| RabbitMQ concept | EIP pattern |
|------------------|-------------|
| Direct Exchange | Point-to-Point / Content-Based Router |
| Fanout Exchange | Publish-Subscribe Channel |
| Topic Exchange | Content-Based Router (по routing key) |
| Headers Exchange | Content-Based Router (по заголовкам) |
| DLX (Dead Letter Exchange) | Dead Letter Channel |

## Process Manager

Когда одного routing недостаточно — нужен **Process Manager**. Он хранит состояние процесса и координирует шаги:

```
         ┌────────────────────────────┐
         │     Process Manager        │
         │  state: awaiting_payment   │
         └──────┬──────────┬──────────┘
                │          │
      pay event ▼          ▼ timeout
          ┌─────────┐  ┌─────────┐
          │ continue │  │ cancel  │
          └─────────┘  └─────────┘
```

## Для системного аналитика

EIP — это настольная книга архитектора интеграций. Для аналитика:
- Используйте названия паттернов в документации (не «соединяем через шину», а «Publish-Subscribe через Kafka»)
- Рисуйте схемы интеграций с нотацией EIP
- Выбирайте брокер под нужные паттерны (RabbitMQ для routing, Kafka для streaming)
- При проектировании интеграции задайте вопросы: это Splitter или Aggregator? Content-Based Router или Recipient List?

## Ссылки

- [Enterprise Integration Patterns (официальный сайт)](https://www.enterpriseintegrationpatterns.com/)
- [Книга: Enterprise Integration Patterns (Hohpe, Woolf)](https://www.enterpriseintegrationpatterns.com/book.html)
- [EIP в картинках — cheat sheet](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)
- [EIP в Kafka — Confluent](https://www.confluent.io/blog/enterprise-integration-patterns-with-kafka/)
- [EIP в RabbitMQ — Pivotal](https://www.rabbitmq.com/blog/2011/04/15/enterprise-integration-patterns-with-rabbitmq/)
