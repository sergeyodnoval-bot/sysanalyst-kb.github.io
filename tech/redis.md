---
id: redis
title: Redis — in-memory data store
sidebar_label: Redis
type: technology
tech_type: technology
category: data
tags: [redis, caching, in-memory, nosql, cache]
official_url: https://redis.io/
github: https://github.com/redis/redis
vendor: Redis Ltd.
license: BSD-3-Clause
first_seen: 2009
difficulty: 3
estimated_time: 20
requires_articles: [data/nosql]
used_in_tasks: [design-database-schema]
alternatives: [memcached, hazelcast, couchbase]
---

# Redis — in-memory data store

**Redis** — высокопроизводительное in-memory хранилище данных, используемое для кэширования, сессий, очередей и real-time аналитики. Работает в памяти (sub-millisecond latency), поддерживает персистентность на диск.

## Для чего используется

- **Кэширование** — ответы API, результаты SQL-запросов, rendered HTML
- **Управление сессиями** — хранение сессий пользователей в микросервисах
- **Rate limiting** — счётчики запросов за единицу времени
- **Message broker** — Pub/Sub, очереди (List, Streams)
- **Leaderboards / счётчики** — Sorted Sets для рейтингов
- **Feature store** — в ML-архитектуре для хранения признаков в real-time

## Типы данных

| Тип | Пример | Использование |
|-----|--------|---------------|
| **String** | `SET user:123 "{"name":"Ivan"}"` | Кэш, счётчики |
| **Hash** | `HSET order:456 status "paid"` | Объекты |
| **List** | `LPUSH queue task1` | Очереди |
| **Set** | `SADD tags "analytics"` | Уникальные множества |
| **Sorted Set** | `ZADD leaderboard 100 "user1"` | Рейтинги |
| **Stream** | `XADD events * type "order_created"` | Event sourcing |

## Персистентность

- **RDB (Snapshot)** — периодический снимок памяти на диск
- **AOF (Append-Only File)** — лог всех операций записи

## Альтернативы

| Альтернатива | Когда выбрать |
|-------------|---------------|
| Memcached | Простое кэширование, без персистентности |
| Hazelcast | Java-экосистема, распределённые вычисления |
| Couchbase | Документная БД с built-in кэшированием |

## Для аналитика

Redis — стандарт де-факто для кэша. В NFR указывать: TTL по умолчанию, стратегия инвалидации, нужна ли персистентность, оценочный объём в MB.
