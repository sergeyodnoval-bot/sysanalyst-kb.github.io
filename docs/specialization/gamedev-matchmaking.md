---
id: gamedev-matchmaking
title: Матчмейкинг и игровые сессии
sidebar_label: Матчмейкинг и сессии
level: 7
category: specialization
tags: [gamedev, matchmaking, session, multiplayer, pvp]
prerequisites: [specialization/gamedev-architecture]
leads_to: [specialization/gamedev-social, specialization/gamedev-monetization]
related: [integration/event-driven-architecture, modeling/state-diagram]
estimated_time: 25
difficulty: 6
audience: senior
---

:::info[TL;DR]
Матчмейкинг — подбор игроков для PvP-сессии. Критерии: рейтинг (MMR), ping, время ожидания, уровень. Сессия — lifecycle от поиска до завершения. Аналитик проектирует правила подбора, статусную модель сессии, античит и метрики (queue time, quality of match).
:::

## Процесс матчмейкинга

```mermaid
sequenceDiagram
    participant P as Игрок
    participant Q as Queue
    participant MM as Matchmaker
    participant S as Session Server
    participant DB as Game DB

    P->>Q: Запрос на поиск
    Q->>MM: Поиск соперников
    MM->>MM: Оценка рейтингов (MMR)
    MM->>MM: Подбор по ping, уровню
    MM->>S: Создание сессии
    S-->>P: Информация о матче
    P->>S: Игровые действия
    S->>DB: Сохранение результата
    S-->>P: Результат матча
```

## Статусы сессии

```mermaid
flowchart LR
    SEARCHING["Поиск"] --> FOUND["Соперник найден"]
    FOUND --> CONNECT["Подключение"]
    CONNECT --> LOADING["Загрузка"]
    LOADING --> PLAYING["В игре"]
    PLAYING --> REWARD["Награда"]
    REWARD --> DONE["Завершена"]
    PLAYING --> ABORT["Прервана"]
```

## Критерии матчмейкинга

| Критерий | Описание | Приоритет |
|----------|----------|-----------|
| **MMR (Skill Rating)** | Рейтинг игрока | Высокий |
| **Ping / Latency** | Задержка до сервера | Высокий |
| **Party size** | Размер группы | Средний |
| **Level / Progression** | Уровень игрока | Средний |
| **Max wait time** | Максимальное время в очереди | Средний |
| **Region** | Регион игрока | Высокий |

## Метрики матчмейкинга

| Метрика | Описание |
|---------|----------|
| **Queue time** | Среднее время ожидания |
| **Quality of match** | Разброс MMR в сессии |
| **Match success rate** | % успешных матчей |
| **Abandon rate** | Игроки покинули очередь |

## Что дальше

- [Социальные механики](/docs/specialization/gamedev-social)
- [Монетизация](/docs/specialization/gamedev-monetization)

## Проверь себя

1. **Как работает матчмейкинг?**
   *Ответ:* Игрок → очередь → оценка MMR/ping → подбор → создание сессии.

2. **Какие критерии подбора игроков?**
   *Ответ:* MMR, ping, уровень, размер группы, регион, макс. время ожидания.
