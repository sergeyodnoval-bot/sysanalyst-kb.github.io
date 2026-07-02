---
id: kafka-integration-spec
sidebar_position: 3
title: Проектирование интеграции с Kafka
sidebar_label: Kafka — спецификация интеграции
type: task
category: integration
difficulty: 4
estimated_time: 90
requires_articles:
  - integration/api-rest-basics
  - integration/async-message-queue
requires_tech:
  - kafka
deliverables:
  - Topic Charter (название, партиции, retention, cleanup policy)
  - Message schema (Avro / JSON)
  - Схема consumer group (group.id, кол-во консюмеров, commit strategy)
  - Error handling (DLT, retry policy)
  - Секция по безопасности (SASL, SSL)
  - Перечень мониторинга (lag, throughput, error rate)
context: |
  Проект маркетплейса. Разработчики внедряют Event-Driven Architecture, инженер
  инфраструктуры развернул Kafka-кластер (6 брокеров, replication factor 3,
  SASL_SSL + SCRAM). DevOps передал вам credentials и bootstrap-серверы.

  Ваша задача — спроектировать интеграцию для события «Заказ создан»
  (OrderCreated). После создания заказа несколько сервисов должны отреагировать:
  Inventory Service — зарезервировать товары; Notification Service — отправить
  email клиенту; Analytics Service — записать событие в DWH.

  Команда использует Schema Registry (Avro). Требование бизнеса: ни одно
  событие создания заказа не должно потеряться. Клиент может повторно
  запросить статус — нужен replay.
steps:
  - Изучить бизнес-сценарий: какие сервисы-потребители, какие данные нужны каждому
  - Спроектировать Topic Charter: количество партиций, retention, cleanup policy
  - Определить partition key и обосновать выбор
  - Описать message schema (поля, типы, обязательность)
  - Спроектировать consumer group для каждого сервиса-потребителя
  - Определить offset reset и commit strategy
  - Спроектировать error handling: retry policy, DLT
  - Описать header conventions (traceId, messageType, version)
  - Составить секцию безопасности и мониторинга
  - Согласовать спецификацию с командой и DevOps
pitfalls:
  - Слишком мало партиций — не хватит параллелизма при масштабировании
  - Partition key, приводящий к «горячей» партиции (один ключ доминирует)
  - auto.offset.reset = latest для сервиса, которому нужна история
  - auto.commit без ручного контроля — потеря сообщений при падении consumer'а
  - Отсутствие DLT — «упавшие» сообщения теряются без следа
  - Нет header'ов — трассировка requests через несколько сервисов невозможна
next_tasks:
  - integrate-two-systems
previous_tasks:
  - design-rest-api
part_of_tracks:
  - middle-track
---
