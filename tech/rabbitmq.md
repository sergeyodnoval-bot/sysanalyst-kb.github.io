---
id: rabbitmq
title: "RabbitMQ"
sidebar_label: RabbitMQ
type: technology
tech_type: tool
category: integration
tags: [mq, queue, messaging, async, broker, amqp]
official_url: "https://www.rabbitmq.com/"
vendor: "VMware / Broadcom"
license: "Open Source (MPL 2.0)"
first_seen: 2007
requires_articles: [integration/async-message-queue]
used_in_tasks: []
alternatives: [kafka, activemq, nats]
difficulty: 3
estimated_time: 25
audience: middle
---

# RabbitMQ

RabbitMQ — брокер сообщений, реализующий протокол AMQP 0-9-1. Это **классический message broker**: сообщение попадает в очередь и ждёт, пока consumer его заберёт. После обработки сообщение удаляется.

## Для чего используется

- **Task queues** — фоновые задачи (отправка email, генерация отчётов, обработка изображений)
- **RPC over MQ** — синхронный вызов сервиса через очередь (с correlation ID)
- **Event broadcasting (fanout)** — уведомление нескольких сервисов об одном событии
- **Work queues** — распределение нагрузки между несколькими worker'ами (конкурирующие consumer'ы)
- **Delayed messaging** — отложенная отправка (например, напоминание через 24 часа)

## Ключевые концепции

| Понятие | Описание |
|---------|----------|
| **Exchange** | Точка входа сообщения. Определяет маршрут: direct (точный routing key), topic (маска), fanout (всем), headers (по заголовкам) |
| **Queue** | Буфер сообщений. Consumer читает и подтверждает (ack) обработку |
| **Binding** | Правило: exchange → очередь (с routing key) |
| **Virtual Host (vhost)** | Изолированное окружение в одном RabbitMQ — для разных проектов |
| **ACK / NACK** | Подтверждение обработки. Если consumer умер без ack → сообщение вернётся в очередь |
| **Dead Letter Queue (DLQ)** | Очередь для сообщений, которые не удалось обработать |

## Когда выбирать RabbitMQ

RabbitMQ хорош, когда нужно **доставить каждое сообщение конкретному потребителю**:

- У вас микросервисы и нужно вызывать один сервис из другого асинхронно
- Нужна гибкая маршрутизация (разные exchange types)
- Важна гарантия доставки (ack/nack, dlq)
- Сообщения живут недолго — обработаны и удалены
- Нагрузка до десятков тысяч сообщений в секунду

## Когда НЕ выбирать RabbitMQ

- **Потоковая обработка миллионов событий в день** — нужен Kafka
- **Хранение истории сообщений** — RabbitMQ удаляет сообщения после ack
- **Переигрывание (replay) событий** — в Kafka сообщения хранятся и можно перечитать
- **Log aggregation / CDC** — Kafka спроектирована для этого

## Сравнение: RabbitMQ vs Apache Kafka

| Критерий | RabbitMQ | Kafka |
|----------|----------|-------|
| **Модель** | Smart broker / dumb consumer | Dumb broker / smart consumer |
| **Хранение** | Очередь — удаляет после ack | Лог — хранит по retention (дни / ГБ) |
| **Маршрутизация** | Exchange + binding (гибкая) | Topic + partition (простая) |
| **Производительность** | Тысячи msg/сек | Сотни тысяч msg/сек |
| **Задержка (latency)** | Микросекунды | Миллисекунды |
| **Порядок сообщений** | В рамках одной очереди | В рамках одной партиции (с ключом) |
| **Replay событий** | Нет (удалил — потерял) | Есть (читай с любого offset) |
| **Простота настройки** | Простая (один узел) | Сложная (ZooKeeper/KRaft, кластер) |
| **Языки** | Все популярные (AMQP-клиенты) | Все популярные (Java native, остальные через librdkafka) |
| **Типичная область** | Task queues, RPC, микросервисы | Event streaming, log aggregation, CDC, metrics |

**Вывод:** RabbitMQ — для микросервисов и задач, Kafka — для потоков данных и событий. Это не взаимозаменяемые, а дополняющие инструменты.

## Сравнение: RabbitMQ vs NATS

| Критерий | RabbitMQ | NATS |
|----------|----------|------|
| Гарантии доставки | ACK, DLQ, транзакции | At-most-once / At-least-once |
| Производительность | Высокая | Очень высокая (легковесный) |
| Сложность | Средняя | Низкая |
| Стойкость (persistence) | Да (на диск) | Опционально (NATS JetStream) |

**Вывод:** NATS — если нужен сверхбыстрый лёгкий брокер без сложной маршрутизации. RabbitMQ — если нужны гарантии и гибкость.

## Команды (CLI)

| Команда | Описание |
|---------|----------|
| `rabbitmqctl list_queues` | Список очередей |
| `rabbitmqctl list_exchanges` | Список exchange |
| `rabbitmqctl list_bindings` | Список bindings |
| `rabbitmqctl list_consumers` | Подключённые потребители |
| `rabbitmq-plugins enable rabbitmq_management` | Включить веб-интерфейс |

## Как начать

1. Установите: `docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management`
2. Откройте `http://localhost:15672` (guest/guest)
3. Во вкладке **Exchanges** создайте `my-exchange` (type: direct)
4. Во вкладке **Queues** создайте `my-queue`
5. Свяжите: queue → exchange с routing key `task.create`
6. Откройте вкладку **Publish message** и отправьте тестовое сообщение

## Ссылки

- [Официальная документация](https://www.rabbitmq.com/documentation.html)
- [RabbitMQ в Docker](https://hub.docker.com/_/rabbitmq)
- [RabbitMQ Tutorials (6 языков)](https://www.rabbitmq.com/getstarted.html)
- [Understanding AMQP](https://www.cloudamqp.com/blog/part1-rabbitmq-for-beginners-what-is-rabbitmq.html)
- [RabbitMQ vs Kafka — detailed comparison](https://www.cloudamqp.com/blog/rabbitmq-vs-kafka.html)
