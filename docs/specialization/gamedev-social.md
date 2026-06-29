---
id: gamedev-social
title: Социальные механики и друзья
sidebar_label: Социальные механики
level: 6
category: specialization
tags: [gamedev, social, friends, clans, guilds]
prerequisites: [specialization/gamedev-matchmaking]
leads_to: [specialization/gamedev-monetization]
related: [integration/async-message-queue]
estimated_time: 20
difficulty: 5
audience: middle
---

:::info[TL;DR]
Социальные механики повышают retention: друзья, кланы/гильдии, чат, PvP-лиги, турниры. Аналитик проектирует социальный граф, приглашения, совместные активности (co-op рейды) и механизмы вирального роста (share, invite).
:::

## Социальные механики

| Механика | Описание | Влияние на метрики |
|----------|----------|-------------------|
| **Friends list** | Добавление, удаление, статус | Retention + |
| **Guild / Clan** | Постоянная группа с чатом | Retention ++, Monetization |
| **Co-op / Raid** | Совместное прохождение | Engagement |
| **PvP / Leaderboard** | Соревнование | Engagement, Competition |
| **Gifting** | Подарки между игроками | Monetization |
| **Invite** | Приглашение друга | Virality |

## Система друзей: типовой API

| Endpoint | Описание |
|----------|----------|
| `POST /friends/invite` | Отправить запрос в друзья |
| `POST /friends/accept` | Принять запрос |
| `POST /friends/remove` | Удалить из друзей |
| `GET /friends/list` | Список друзей |
| `POST /guild/create` | Создать клан/гильдию |
| `POST /guild/join` | Вступить в клан |

## Что дальше

- [Монетизация](/docs/specialization/gamedev-monetization)

## Проверь себя

1. **Какие социальные механики повышают retention?**
   *Ответ:* Друзья, кланы, совместные активности, PvP, подарки.

2. **Как работает виральность в играх?**
   *Ответ:* Через приглашения (invite), гайд-механики (попросить помощь у друга), подарки.
