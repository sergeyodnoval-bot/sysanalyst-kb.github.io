---
id: api-rest-basics
title: Основы REST API
sidebar_label: REST API
level: 4
category: integration
tags: [rest, api, http, json]
prerequisites: [http-protocol, client-server]
leads_to: [api-openapi]
related: []
estimated_time: 20
difficulty: 3
---

# Основы REST API

REST (Representational State Transfer) — это архитектурный стиль проектирования распределённых систем, предложенный Роем Филдингом в 2000 году. REST API стали стандартом де-факто для веб-интеграций.

## Принципы REST

Шесть архитектурных ограничений REST:

1. **Единый интерфейс (Uniform Interface)** — единообразие форматов запросов и ответов
2. **Отсутствие состояния (Stateless)** — каждый запрос содержит всю информацию для его обработки
3. **Кэширование (Cacheable)** — ответы должны явно указывать, можно ли их кэшировать
4. **Клиент-сервер (Client-Server)** — разделение ответственности между клиентом и сервером
5. **Многоуровневость (Layered System)** — между клиентом и сервером могут быть прокси и балансировщики
6. **Код по требованию (Code on Demand)** — опционально, сервер может расширять функциональность клиента

## Ресурсы и URI

В REST каждый ресурс имеет уникальный URI:

```
GET /api/users        — список пользователей
GET /api/users/42     — конкретный пользователь
POST /api/users       — создать пользователя
PUT /api/users/42     — обновить пользователя
DELETE /api/users/42  — удалить пользователя
```

### Именование ресурсов

- Множественное число: `/users`, `/orders`
- Использовать существительные, не глаголы: `/users`, не `/getUsers`
- Вложенность для иерархий: `/users/42/orders`
- kebab-case для составных: `/order-items`

## Форматы данных

Наиболее популярный формат — JSON. Пример ответа:

```json
{
  "id": 42,
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "roles": ["admin", "analyst"]
}
```

## Версионирование API

Способы версионирования:
- **URL-based**: `/api/v1/users`
- **Header-based**: `Accept: application/vnd.api+json;version=2`
- **Parameter-based**: `/api/users?version=2`

## Роль аналитика

Системный аналитик участвует в проектировании REST API на всех этапах:
- Определение ресурсов и их атрибутов
- Проектирование эндпоинтов
- Документирование форматов запросов и ответов
- Согласование с командами-потребителями

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q7pw0nTBSLk" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
