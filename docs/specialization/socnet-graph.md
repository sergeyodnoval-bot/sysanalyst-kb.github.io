---
id: socnet-graph
title: Социальный граф и друзья
sidebar_label: Социальный граф
level: 6
category: specialization
tags: [socnet, graph, social, friends, subscriptions]
prerequisites: [specialization/socnet-messenger]
leads_to: [specialization/socnet-monetization, specialization/socnet-platform]
related: [data/nosql, data/data-modeling]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
Социальный граф — структура связей между пользователями (подписки, друзья, фолловеры). Хранится в графовых БД (Neo4j) или key-value (Redis, Cassandra). Ключевые операции: подписаться, отписаться, получить ленту, найти общих друзей. Аналитик проектирует типы связей, алгоритмы рекомендаций друзей и метрики графа.
:::

## Типы связей

| Тип | Описание | Направление |
|-----|----------|-------------|
| **Friend** | Взаимная подписка | Двунаправленная |
| **Follow** | Однонаправленная подписка | A → B |
| **Block** | Блокировка пользователя | A → B |
| **Mute** | Скрытие контента | A → B |
| **Subscribe** | Подписка на канал/контент | A → Channel |
| **Group membership** | Членство в группе | A → Group |

## Архитектура хранения

| Подход | Технология | Когда использовать |
|--------|-----------|-------------------|
| **Adjacency list** | SQL (user_id, follower_id) | Маленькие графы |
| **Redis Sets** | Sorted sets | Реалтайм, кэш |
| **Cassandra** | Wide-column (time-ordered) | Большие графы |
| **Neo4j** | Графовая БД | Сложные запросы (поиск пути) |

## Что дальше

- [Монетизация соцсетей](/docs/specialization/socnet-monetization)

## Проверь себя

1. **Какие типы связей в соцсетях?**
   *Ответ:* Friend, Follow, Block, Mute, Subscribe, Group membership.

2. **Как хранить социальный граф?**
   *Ответ:* SQL (маленький), Redis/Cassandra (большой), Neo4j (сложные запросы).
