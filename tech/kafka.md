---
id: kafka
title: "Apache Kafka"
sidebar_label: Kafka
type: technology
tech_type: tool
category: integration
tags: [kafka, streaming, events, messaging, broker]
official_url: "https://kafka.apache.org/"
vendor: "Apache Software Foundation"
license: "Open Source (Apache 2.0)"
first_seen: 2011
requires_articles: [integration/async-message-queue]
used_in_tasks: []
alternatives: [rabbitmq, pulsar, nats]
difficulty: 4
estimated_time: 25
---

# Apache Kafka

Kafka — распределённая платформа для обработки событийных потоков в реальном времени. Используется для сбора, хранения и обработки больших объёмов данных.

## Для чего используется

- Event Sourcing — хранение истории изменений
- Log aggregation — сбор логов со всех сервисов
- Stream processing — обработка данных в реальном времени
- CDC (Change Data Capture) — отслеживание изменений в БД
- Метрики и мониторинг

## Ключевые концепции

**Topic** — категория сообщений (аналог таблицы в БД).

**Partition** — единица параллелизма внутри topic. Сообщения с одним ключом попадают в одну партицию (гарантия порядка).

**Broker** — сервер Kafka. Кластер из нескольких brokers обеспечивает отказоустойчивость.

**Replication factor** — количество копий каждой партиции. Если один broker падает, другой берёт на себя его нагрузку.

**Consumer Group** — группа consumer'ов, которые делят между собой партиции topic.

**ZooKeeper / KRaft** — координация кластера. ZooKeeper — классический способ, KRaft — новый (без ZooKeeper).

## CLI команды

| Команда | Описание |
|---------|----------|
| `kafka-topics.sh --create --topic orders` | Создать topic |
| `kafka-console-producer.sh --topic orders` | Отправить сообщение |
| `kafka-console-consumer.sh --topic orders --from-beginning` | Читать сообщения |
| `kafka-consumer-groups.sh --describe --group my-group` | Статус consumer group |

## Как начать

1. Скачайте Kafka с официального сайта
2. Запустите ZooKeeper и Kafka broker
3. Создайте topic: `kafka-topics.sh --create --topic test --bootstrap-server localhost:9092`
4. Напишите producer и consumer на Java / Python / Go

## Ссылки

- [Официальная документация](https://kafka.apache.org/documentation/)
- [Kafka в Docker](https://hub.docker.com/r/confluentinc/cp-kafka)
- [Kafka Quickstart](https://kafka.apache.org/quickstart)
- [Confluent — Kafka для разработчиков](https://developer.confluent.io/)
