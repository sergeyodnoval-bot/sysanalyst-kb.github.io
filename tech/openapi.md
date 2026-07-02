---
id: openapi
sidebar_position: 1
title: OpenAPI Specification (Swagger)
sidebar_label: OpenAPI / Swagger
type: technology
tech_type: standard
level: 3
category: integration
tags: [openapi, swagger, rest, api, specification]
prerequisites: [tech/http, integration/api-rest-basics]
leads_to: [integration/api-openapi]
related: [tech/postman]
estimated_time: 30
difficulty: 3
official_url: https://spec.openapis.org/oas/latest.html
version: "3.1.0"
published_date: 2021-02-15
first_seen: 2010
citation_key: openapi31
requires_articles: [integration/api-rest-basics]
used_in_tasks: [design-rest-api]
alternatives: [graphql, grpc]
audience: middle
---

# OpenAPI Specification (Swagger)

OpenAPI Specification (ранее Swagger) — это стандарт описания REST API в формате YAML или JSON. Позволяет создавать документацию, генерировать клиентские SDK и автоматически тестировать API.

## Для чего используется

- **Документирование REST API** — единый источник правды (single source of truth)
- **Генерация клиентов** — автоматическая генерация SDK для iOS, Android, Web
- **Contract testing** — проверка, что сервер соответствует спецификации
- **Mock-серверы** — заглушки API для параллельной разработки фронта и бэка
- **Code generation** — генерация схем БД, валидаторов, тестов

## История и версии

- **Swagger 2.0** (2014) — оригинальный формат от SmartBear
- **OpenAPI 3.0** (2017) — передан под управление Linux Foundation
- **OpenAPI 3.1** (2021) — интеграция с JSON Schema 2020-12

Выбирайте **OpenAPI 3.1** для новых проектов — он совместим с JSON Schema.

## Структура спецификации

```yaml
openapi: 3.1.0
info:
  title: Petstore API
  version: 1.0.0
  description: API для магазина питомцев
servers:
  - url: https://api.example.com/v1
paths:
  /pets:
    get:
      summary: Список питомцев
      parameters:
        - name: limit
          in: query
          schema: {type: integer}
      responses:
        '200':
          description: Успешный ответ
          content:
            application/json:
              schema:
                type: array
                items: {$ref: '#/components/schemas/Pet'}
components:
  schemas:
    Pet:
      type: object
      properties:
        id: {type: integer}
        name: {type: string}
```

### Основные секции

- **openapi** — версия спецификации
- **info** — метаданные API (название, описание, версия)
- **servers** — базовые URL (development, staging, production)
- **paths** — описание эндпоинтов и методов
- **components** — переиспользуемые схемы (schemas, parameters, responses, securitySchemes)
- **security** — механизмы аутентификации (Bearer, OAuth2, API Key)
- **tags** — группировка эндпоинтов для документации

## Инструменты

| Инструмент | Назначение |
|------------|-----------|
| **Swagger Editor** | Редактор с валидацией, автодополнением |
| **Swagger UI** | Интерактивная документация (Try it out!) |
| **Swagger Codegen / OpenAPI Generator** | Генерация клиентов на 40+ языках |
| **Stoplight Studio** | Визуальный редактор (drag & drop) |
| **Redoc** | Альтернативная документация (чище, быстрее) |
| **Spectral** | Линтер для OpenAPI (style guide) |
| **Insomnia** | HTTP-клиент с импортом OpenAPI |

## Сравнение: OpenAPI vs GraphQL vs gRPC

| Критерий | OpenAPI (REST) | GraphQL | gRPC |
|----------|---------------|---------|------|
| **Транспорт** | HTTP/1.1 | HTTP/1.1 | HTTP/2 |
| **Формат данных** | JSON / XML | JSON (запрос — GraphQL) | Protocol Buffers (бинарный) |
| **Схема** | OpenAPI YAML/JSON | Schema Definition Language | .proto файлы |
| **Клиентская генерация** | 40+ языков | codegen через GraphQL Code Generator | Все языки (protoc) |
| **Читаемость** | Высокая (JSON) | Средняя | Низкая (бинарный) |
| **Кэширование** | HTTP-кэширование (GET) | Сложное (post-запросы) | Нет (HTTP/2 stream) |
| **Типизация** | YAML/JSON Schema | Строгая (SDL) | Очень строгая (protobuf) |
| **Streaming** | Нет (SSE / WebSocket отдельно) | Subscriptions (WebSocket) | Встроенный (Server/Client/Bidi) |
| **Browser support** | Нативный | Нативный (через Apollo) | Нужен gRPC-web |
| **Когда использовать** | CRUD, внешние API, веб | Сложные запросы, мобильные приложения | Microservices, high-performance, streaming |

**Когда выбирать OpenAPI (REST):**
- Внешнее API (публичное, для клиентов)
- Веб-приложения (браузерный fetch нативный)
- Нужна простота и читаемость
- CRUD-операции (ресурсный подход)

**Когда выбирать GraphQL:**
- Мобильные приложения (один запрос — все данные)
- Сложные связанные данные (join-ы на клиенте)
- Разные клиенты требуют разных данных

**Когда выбирать gRPC:**
- Внутренние микросервисы
- Streaming данных (real-time)
- High-performance (бинарный протокол, HTTP/2)
- Polyglot-архитектура (proto → код на всех языках)

## Преимущества OpenAPI

- Единый source of truth для API
- Автоматическая генерация документации (Swagger UI, Redoc)
- Валидация запросов и ответов (contract testing)
- Mock-серверы для параллельной разработки
- Огромная экосистема инструментов

## Недостатки

- Громоздкий для больших API (тысячи строк YAML)
- Сложность поддержки вручную (нужны генераторы)
- Не все инструменты поддерживают OpenAPI 3.1
- REST — не всегда лучший выбор (over-fetching, under-fetching)

## Рекомендации

- Для новых проектов используйте OpenAPI 3.1
- Поддерживайте спецификацию в актуальном состоянии (устаревшая документация хуже отсутствия)
- Используйте кодогенерацию для избежания рассинхронизации
- Для публичных API всегда добавляйте Swagger UI
- Комбинируйте: публичное API — OpenAPI, внутренние микросервисы — gRPC, мобильные клиенты — GraphQL

## Ссылки

- [OpenAPI Specification 3.1.0 (official)](https://spec.openapis.org/oas/latest.html)
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [OpenAPI vs GraphQL (comparison)](https://www.apollographql.com/blog/graphql-vs-rest)
- [gRPC vs REST (Google Cloud)](https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them)
- [Spectral — OpenAPI linter](https://stoplight.io/open-source/spectral)
