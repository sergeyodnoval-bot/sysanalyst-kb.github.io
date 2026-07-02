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
used_in_tasks: [kafka-integration-spec]
alternatives: [rabbitmq, pulsar, nats]
difficulty: 4
estimated_time: 45
audience: middle
---

# Apache Kafka

Kafka — **распределённая платформа для событийных потоков (event streaming)**. В отличие от классических брокеров (RabbitMQ), Kafka не удаляет сообщения после обработки, а хранит их в журнале (log) с возможностью перечитывать.

## Как аналитик работает с Kafka в реальности

DevOps / архитектор разворачивает кластер и выдаёт координаты:
```
bootstrap.servers = kafka-cluster.prod:9092,kafka-cluster.prod:9093
security.protocol = SASL_SSL
sasl.mechanism = SCRAM-SHA-512
```

Аналитик в этой схеме отвечает за:
- **Topic Charter** — названия топиков, количество партиций, retention, ключ партиционирования
- **Message Schema** — формат сообщений (Avro / JSON / Protobuf), обязательные поля
- **Consumer Group** — контракт: кто читает, сколько консюмеров, commit strategy
- **Error Handling** — Dead Letter Topic, retry-логика
- **Headers** — служебные метаданные (traceId, messageType, version)

Для просмотра топиков и сообщений используются GUI-клиенты (не консоль):
- **Kafka UI** (https://github.com/provectus/kafka-ui) — веб-интерфейс, показывает топики, партиции, консюмеров, лаг, содержимое сообщений
- **AKHQ** — альтернатива Kafka UI
- **Offset Explorer** (бывший Kafka Tool) — десктопный клиент для Windows/Mac

## Что аналитику нужно знать о Kafka-концепциях

### Topic и партиции

| Термин | Зачем аналитику |
|--------|-----------------|
| **Topic** | Единица интеграции. Один топик = один тип событий (orders, payments, notifications) |
| **Partition** | Единица параллелизма. Количество партиций = максимальное количество consumer'ов, которые могут читать параллельно |
| **Replication Factor** | Отказоустойчивость. Обычно 3 — аналитик указывает в нефункциональных требованиях |

**Правила для аналитика:**
- Сообщения с **одинаковым ключом** попадают в одну партицию → порядок гарантирован
- Если порядок не важен — ключ можно не указывать (round-robin)
- Количество партиций **нельзя уменьшить** (только увеличить) — проектируйте с запасом

### Partition Key

Ключ определяет, в какую партицию попадёт сообщение. Выбор ключа — аналитическое решение.

| Ключ | Эффект |
|------|--------|
| `customer_id` | Все события одного клиента в одной партиции — порядок гарантирован |
| `order_id` | Порядок событий одного заказа (если ключ совпадает с partition key) |
| `random / null` | Равномерное распределение, порядок не гарантирован |

**Пример спецификации:** «События по одному заказу должны обрабатываться последовательно. Partition key = `order_id`. Всего 6 партиций для равномерной нагрузки».

### Consumer Group

Группа consumer'ов, которые вместе читают топик. Каждая партиция читается **только одним consumer'ом** внутри группы.

```
Topic: orders (3 partitions)
  Consumer Group: payment-service
    consumer-1 → partition 0
    consumer-2 → partition 1
    consumer-3 → partition 2
```

**Что важно аналитику:**
- Количество consumer'ов в группе **не может превышать количество партиций** — лишние будут простаивать
- **Rebalancing** — перераспределение партиций при добавлении/удалении consumer'а. Во время rebalance группа не обрабатывает сообщения (stop-the-world на 5-30 секунд)
- Consumer lag — разница между последним сообщением в партиции и тем, которое consumer прочитал. Lag растёт → consumer не справляется → аналитик закладывает метрику в мониторинг

### Offsets

Каждое сообщение в партиции имеет номер (offset). Consumer запоминает, какой offset уже обработал.

**Стратегии commit:**
- `auto.commit=true` (по умолчанию) — consumer сам коммитит offset каждые 5 секунд. Есть риск повторной обработки при падении
- Ручной commit — consumer коммитит после успешной обработки. Меньше дублей, но сложнее код

Для аналитика важно: в спецификации указывать стратегию commit и `auto.offset.reset`:
- `earliest` — начать с самого старого сообщения (для новых consumer'ов, которым нужны все данные)
- `latest` — начать с новых сообщений (пропустить историю)

### Headers

Метаданные, которые producer прикрепляет к сообщению. Не влияют на партиционирование, но используются consumer'ом.

**Стандартные хедеры в практике:**
```
traceId: "a1b2c3d4"         — сквозная трассировка
messageType: "OrderCreated"  — тип события
version: "1.0"              — версия схемы
contentType: "avro"         — формат данных
source: "order-service"     — источник
```

**Зачем аналитику:** хедеры — часть контракта. Пропишите их в спецификации: какие хедеры обязательные, какие опциональные.

### Delivery Semantics

Как аналитик объясняет бизнесу гарантии доставки:

| Семантика | Что значит | Когда подходит |
|-----------|-----------|----------------|
| **At-most-once** | Сообщение не будет доставлено повторно, но может потеряться | Метрики, логи — потерять пару сообщений некритично |
| **At-least-once** | Каждое сообщение будет доставлено минимум один раз, возможны дубли | Платёжные транзакции — дубли обрабатываются идемпотентно |
| **Exactly-once** | Каждое сообщение ровно один раз — самая дорогая гарантия | Финтех, где дубли критичны (списания), требует идемпотентности на стороне consumer'а |

**На практике:** большинство систем используют at-least-once + идемпотентный consumer.

## Как подключаться к Kafka

### Что даёт DevOps

```yaml
# Конфиг подключения (аналитик копирует в спецификацию)
bootstrap.servers: host1:9092,host2:9092
security.protocol: SASL_SSL         # или PLAINTEXT (dev), SSL
sasl.mechanism: SCRAM-SHA-512      # или PLAIN
sasl.jaas.config: <username:password>  # или через env
schema.registry.url: https://schema-registry:8081
```

### GUI-клиенты для аналитика

| Инструмент | Тип | Где скачать |
|-----------|-----|-------------|
| **Kafka UI** | Web | docker-образ provectuslabs/kafka-ui |
| **AKHQ** | Web | docker-образ (тоже веб) |
| **Offset Explorer** | Desktop | https://offsetexplorer.com/ |
| **Confluent Cloud Console** | Web | Если кластер в Confluent Cloud |

Все подключаются по тем же параметрам: bootstrap servers, SASL, SSL, Schema Registry URL.

## Шаблон спецификации интеграции с Kafka

Страницы, которые аналитик пишет в SRS или контракте интеграции.

### 1. Topic Charter

| Поле | Значение | Пример |
|------|----------|--------|
| Имя топика | Отражает домен и тип события | `order.payment.processed` |
| Количество партиций | Зависит от нагрузки (формула: target throughput / per-partition throughput) | 6 |
| Replication Factor | Отказоустойчивость, обычно 3 | 3 |
| Retention | Время хранения сообщений | 7 дней |
| Cleanup Policy | `delete` (по времени) или `compact` (по ключу) | `delete` |
| Partition Key | Поле, по которому определяется партиция | `order_id` |

### 2. Message Schema (Avro / JSON)

```json
{
  "name": "OrderPaymentProcessed",
  "type": "record",
  "fields": [
    {"name": "eventId",      "type": "string", "doc": "UUID события"},
    {"name": "orderId",      "type": "string"},
    {"name": "amount",       "type": "decimal"},
    {"name": "currency",     "type": "string", "default": "RUB"},
    {"name": "timestamp",    "type": "long",   "doc": "UNIX epoch ms"}
  ]
}
```

Аналитик определяет поля, их типы, обязательность (`default`). Schema Registry проверяет совместимость при изменениях.

### 3. Producer Spec

| Параметр | Значение | Пояснение |
|----------|----------|-----------|
| `acks` | `all` | Ждать подтверждения от всех реплик |
| `retries` | `3` | Повтор при временной ошибке |
| `enable.idempotence` | `true` | Защита от дублов при повторной отправке |
| `compression.type` | `snappy` / `lz4` | Сжатие для больших сообщений |

### 4. Consumer Spec

| Параметр | Значение | Пояснение |
|----------|----------|-----------|
| `group.id` | `payment-service` | Имя группы — уникально в рамках кластера |
| `auto.offset.reset` | `earliest` / `latest` | Откуда читать новому consumer'у |
| `enable.auto.commit` | `true` / `false` | Авто-commit или ручной |
| `max.poll.records` | `500` | Сколько сообщений за один poll |

### 5. Error Handling

- **Dead Letter Topic (DLT)** — топик для сообщений, которые не удалось обработать. Имя: `original-topic-name-dlt` или `original-topic-name-retry-[N]`
- **Retry strategy** — exponential backoff: 10s → 30s → 60s → DLT
- В спецификации: «Сообщения, не обработанные после 3 ретраев, попадают в DLT. Оператор мониторит DLT раз в смену»

### 6. Header Conventions

| Header | Обязательный | Пример |
|--------|-------------|--------|
| `traceId` | Да | `"a1b2c3d4-e5f6"` |
| `messageType` | Да | `"OrderPaymentProcessed"` |
| `version` | Да | `"1.0"` |
| `source` | Да | `"order-service"` |
| `contentType` | Да | `"avro"` |

### 7. Security

| Параметр | Значение |
|----------|----------|
| Protocol | SASL_SSL (прод), PLAINTEXT (dev) |
| Mechanism | SCRAM-SHA-512 (прод) / PLAIN (dev) |
| Credentials | Через секреты Kubernetes / Vault |

### 8. Monitoring

Метрики, которые нужно заложить в требования к мониторингу:
- **Consumer lag** по каждой партиции
- **Messages in / out** per topic
- **Error rate** — сообщения в DLT
- **Rebalance count** — частота перебалансировок

## Сравнение с альтернативами

### Kafka vs RabbitMQ

| Критерий | Kafka | RabbitMQ |
|----------|-------|----------|
| Архитектура | Распределённый лог | Очередь сообщений |
| Производительность | 100K–1M msg/сек | 10K–50K msg/сек |
| Latency | ~10–50 мс | < 1 мс |
| Хранение | По retention (дни/ГБ) | До подтверждения |
| Replay | Да (с любого offset) | Нет |
| Порядок | Внутри партиции | Внутри очереди |

**Вывод:** RabbitMQ — для задач (task queue, RPC). Kafka — для потоков (event stream, log, CDC). Часто работают в паре.

### Kafka vs Pulsar

Pulsar решает проблемы Kafka (rebalance без паузы, нативная multi-tenancy), но экосистема меньше.

## CLI команды (для справки)

Если понадобится локально проверить гипотезу — минимальный набор:

| Команда | Описание |
|---------|----------|
| `kafka-console-consumer.sh --topic orders --from-beginning --bootstrap-server localhost:9092 --property print.headers=true` | Посмотреть сообщения с хедерами |
| `kafka-consumer-groups.sh --describe --group my-group --bootstrap-server localhost:9092` | Lag consumer group |
| `kafka-topics.sh --describe --topic orders --bootstrap-server localhost:9092` | Детали топика |

## Что дальше

- [Задача: проектирование интеграции с Kafka](/tasks/kafka-integration-spec) — применить знания на практике
- [Асинхронное взаимодействие (Message Queue)](/docs/integration/async-message-queue) — фундамент
- [Event-Driven Architecture](/docs/integration/event-driven-architecture) — куда Kafka вписывается архитектурно

## Проверь себя

1. **Почему количество consumer'ов в группе не может быть больше количества партиций?**
   *Ответ:* Каждая партиция читается только одним consumer'ом внутри группы. Лишние consumer'ы будут простаивать — партиций им не достанется.

2. **Какой partition key выбрать, если нужен порядок событий по одному заказу?**
   *Ответ:* `order_id`. Все сообщения с одинаковым `order_id` попадут в одну партицию, где порядок гарантирован.

3. **Чем отличается auto.offset.reset = earliest от latest?**
   *Ответ:* `earliest` — начать чтение с самого старого сообщения (подходит для новых consumer'ов, которым нужны все данные). `latest` — начать только с новых сообщений (пропустить историю).

4. **Что такое consumer lag и почему его нужно мониторить?**
   *Ответ:* Разница между последним сообщением в партиции и тем, которое consumer уже обработал. Растущий lag = consumer не справляется с нагрузкой = нужны доп. партиции/консюмеры или оптимизация.
