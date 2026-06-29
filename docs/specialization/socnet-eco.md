---
id: socnet-eco
title: Платформенные механики — API, SDK, маркетплейс приложений
sidebar_label: API, SDK, маркетплейс
level: 7
category: specialization
tags: [socnet, ecosystem, api, sdk, marketplace, platform]
prerequisites: [specialization/socnet-platform]
leads_to: []
related: [integration/api-rest-basics, integration/api-design-detailed]
estimated_time: 20
difficulty: 6
audience: senior
---

:::info[TL;DR]
Платформенные механики — API и SDK для внешних разработчиков, маркетплейс приложений (боты, мини-аппы, игры внутри платформы) и creator economy (инструменты для авторов). Аналитик проектирует API-контракты, SDK, revenue share, политику публикации и метрики экосистемы.
:::

## Компоненты платформы

```mermaid
flowchart TD
    ECO["Платформа / Экосистема"]
    ECO --> API["Public API<br/>— GraphQL/REST"]
    ECO --> SDK["SDK<br/>— JS, iOS, Android"]
    ECO --> MARKET["Маркетплейс<br/>— приложения, боты, игры"]
    ECO --> CREATOR["Creator tools<br/>— статистика, монетизация"]
    ECO --> REV["Revenue Share<br/>— 70/30, 80/20"]
```

## API публичной платформы

| API | Описание |
|-----|----------|
| `GET /users/{id}` | Профиль пользователя |
| `POST /posts` | Создать пост |
| `GET /feed` | Получить ленту |
| `POST /media/upload` | Загрузить медиа |
| `POST /graph/follow` | Подписаться |
| `POST /payment/transfer` | Перевести донат |

## Маркетплейс приложений

| Аспект | Описание |
|--------|----------|
| **Типы приложений** | Боты, мини-аппы, игры |
| **Public API** | GraphQL, REST |
| **Revenue share** | 70/30 (автор/платформа) |
| **Review process** | Автоматическая + ручная модерация |
| **Hosting** | Sandbox / изолированное окружение |

## Что дальше

Вернитесь к началу: [Соцсети — путь аналитика](/docs/specialization/socnet-path)

## Проверь себя

1. **Какие компоненты входят в экосистему платформы?**
   *Ответ:* Public API, SDK, маркетплейс, creator tools, revenue share.

2. **Как работает revenue share?**
   *Ответ:* 70% автору, 30% платформе (типично). Оплата через платёжную систему платформы.
