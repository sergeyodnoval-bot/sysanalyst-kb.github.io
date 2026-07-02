---
id: kafka
title: "Apache Kafka"
sidebar_label: Kafka
type: technology
tech_type: tool
category: integration
tags: [kafka, streaming, events, messaging, broker, log]
official_url: "https://kafka.apache.org/"
vendor: "Apache Software Foundation"
license: "Open Source (Apache 2.0)"
first_seen: 2011
requires_articles: [integration/async-message-queue]
used_in_tasks: []
alternatives: [rabbitmq, pulsar, nats]
difficulty: 4
estimated_time: 30
audience: middle
---

# Apache Kafka

Kafka — **распределённая платформа для событийных потоков (event streaming)**. В отличие от классических брокеров (RabbitMQ), Kafka не удаляет сообщения после обработки, а хранит их в журнале (log) с возможностью перечитывать.

Kafka спроектирована для **огромных объёмов данных** — сотни тысяч сообщений в секунду на одном кластере.

## Для чего используется

- **Event Sourcing** — хранение всей истории изменений состояния
- **Log aggregation** — сбор логов со всех микросервисов в единый поток
- **Stream processing** — обработка данных в реальном времени через Kafka Streams или ksqlDB
- **CDC (Change Data Capture)** — отслеживание изменений в БД через Debezium
- **Метрики и мониторинг** — сбор метрик со всех сервисов
- **CQRS** — разделение команд и запросов через событийную шину

## Ключевые концепции

| Понятие | Описание |
|---------|----------|
| **Topic** | Категория сообщений (аналог таблицы в БД) |
| **Partition** | Единица параллелизма внутри topic. Сообщения с одним ключом всегда попадают в одну партицию — гарантия порядка |
| **Broker** | Сервер Kafka. Кластер из 3+ brokers для отказоустойчивости |
| **Replication factor** | Количество копий каждой партиции (обычно 3) |
| **Consumer Group** | Группа consumer'ов, которые делят между собой партиции topic. Если один consumer падает, его партиции переходят другому (rebalancing) |
| **Offset** | Номер сообщения внутри партиции. Consumer сохраняет offset — может перечитать с любого места |
| **Retention** | Время хранения сообщений (по умолчанию 7 дней) или максимальный размер (по умолчанию 1 ГБ на партицию) |
| **ZooKeeper / KRaft** | ZooKeeper — классический координатор кластера (всё ещё распространён). KRaft — новый встроенный координатор (без ZooKeeper, с Kafka 2.8+) |

## Когда выбирать Kafka

- **Высокая пропускная способность** — нужно обрабатывать > 100 000 сообщений в секунду
- **Хранение истории** — сообщения должны жить дни или недели (replay, audit)
- **Несколько consumer'ов** — сотни сервисов читают один и тот же поток данных
- **Stream processing** — нужна обработка на лету (агрегации, join-ы, фильтрация)
- **Интеграция с экосистемой Hadoop / ClickHouse / Elastic** — Kafka Connect из коробки

## Когда НЕ выбирать Kafka

- **Простая асинхронная задача** (отправить email) — RabbitMQ проще и легче
- **Задержка критична (< 10 мс)** — Kafka имеет latency в десятки миллисекунд
- **Гибкая маршрутизация** — у Kafka только topic, нет exchange/binding как в RabbitMQ
- **Маленький проект (до 1000 сообщений/день)** — оверхед Kafka неоправдан

## Сравнение: Apache Kafka vs RabbitMQ

| Критерий | Kafka | RabbitMQ |
|----------|-------|----------|
| **Архитектура** | Распределённый лог | Централизованная очередь |
| **Производительность** | 100K–1M msg/сек | 10K–50K msg/сек |
| **Latency** | ~10–50 мс (batch) | < 1 мс (одиночные) |
| **Хранение** | По retention (дни/ГБ) | До подтверждения (ack) |
| **Маршрутизация** | По ключу в partition | Exchange + routing key |
| **Replay** | Да (с любого offset) | Нет |
| **Порядок сообщений** | Внутри партиции | Внутри очереди |
| **Размер сообщения** | До 1 МБ (по умолчанию) | До 128 МБ (по умолчанию) |
| **Опыт эксплуатации** | Сложный (кластер, мониторинг) | Простой (можно один узел) |

**Вывод:** RabbitMQ — для задач (task queue, RPC). Kafka — для потоков (event stream, log, CDC). Часто используются вместе: RabbitMQ принимает запросы от клиентов, Kafka хранит события домена.

## Сравнение: Apache Kafka vs Apache Pulsar

Pulsar — более новый конкурент, решающий некоторые проблемы Kafka:

| Критерий | Kafka | Pulsar |
|----------|-------|--------|
| **Хранение** | На каждом broker | Отдельный слой хранения (BookKeeper) |
| **Rebalancing** | Stop-the-world (пауза) | Сегментированное (без паузы) |
| **Multi-tenancy** | Через topic naming | Нативная (tenant/namespace) |
| **Гео-репликация** | Встроенная | Более гибкая |

**Вывод:** Kafka — более зрелая экосистема (больше инструментов, документации, сообщества). Pulsar — технологически интереснее, но экосистема меньше.

## Сравнение: Apache Kafka vs NATS

NATS — лёгкий брокер для сверхбыстрой доставки. Kafka vs NATS — не конкуренты, а разные классы:

| Критерий | Kafka | NATS |
|----------|-------|------|
| Область | Event streaming, хранение | Быстрая доставка, IoT, микросервисы |
| Хранение | Да (retention) | Нет (кроме JetStream) |
| Скорость | Высокая | Очень высокая |
| Гарантии | Exactly-once | At-most-once / At-least-once |

## CLI команды

| Команда | Описание |
|---------|----------|
| `kafka-topics.sh --create --topic orders --partitions 3 --replication-factor 3` | Создать topic |
| `kafka-console-producer.sh --topic orders` | Отправить сообщение в консоли |
| `kafka-console-consumer.sh --topic orders --from-beginning` | Читать все сообщения с начала |
| `kafka-consumer-groups.sh --describe --group my-group` | Статус consumer group (lag) |
| `kafka-run-class.sh kafka.tools.GetOffsetShell --topic orders --time -1` | Количество сообщений в topic |

## Как начать

1. Самый простой способ — Docker: `docker compose up` с [confluentinc/cp-kafka](https://hub.docker.com/r/confluentinc/cp-kafka)
2. Создайте topic: `kafka-topics.sh --create --topic events --bootstrap-server localhost:9092`
3. Запустите producer: `kafka-console-producer.sh --topic events --bootstrap-server localhost:9092`
4. В другом окне consumer: `kafka-console-consumer.sh --topic events --from-beginning --bootstrap-server localhost:9092`
5. Вводите текст в producer — consumer его показывает

## Ссылки

- [Официальная документация](https://kafka.apache.org/documentation/)
- [Kafka в Docker (Confluent)](https://hub.docker.com/r/confluentinc/cp-kafka)
- [Kafka Quickstart](https://kafka.apache.org/quickstart)
- [Confluent Developer — курсы для начинающих](https://developer.confluent.io/)
- [Kafka vs RabbitMQ — сравнение](https://www.confluent.io/blog/kafka-vs-rabbitmq/)
- [Kafka The Definitive Guide (книга, Neha Narkhede)](https://www.confluent.io/resources/kafka-the-definitive-guide/)
