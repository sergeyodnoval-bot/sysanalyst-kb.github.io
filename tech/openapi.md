---
id: openapi
sidebar_position: 1
title: OpenAPI Specification (Swagger)
sidebar_label: OpenAPI / Swagger
tech_type: standard
level: 3
category: integration
tags: [openapi, swagger, rest, api, specification]
prerequisites: [tech/http, integration/api-rest-basics]
leads_to: [integration/api-openapi]
related: [tech/postman]
estimated_time: 25
difficulty: 3
official_url: https://spec.openapis.org/oas/latest.html
version: "3.1.0"
published_date: 2021-02-15
first_seen: 2010
citation_key: openapi31
requires_articles: [integration/api-rest-basics]
used_in_tasks: [design-rest-api]
alternatives: []
---

# OpenAPI Specification (Swagger)

OpenAPI Specification (ранее известный как Swagger) — это стандарт описания REST API в формате YAML или JSON. OpenAPI позволяет создавать документацию, генерировать клиентские SDK и автоматически тестировать API.

## История и версии

Спецификация прошла несколько этапов развития:

- **Swagger 2.0** (2014) — оригинальный формат от SmartBear
- **OpenAPI 3.0** (2017) — передан под управление Linux Foundation
- **OpenAPI 3.1** (2021) — интеграция с JSON Schema

## Структура спецификации

Типовой OpenAPI-документ содержит:

```yaml
openapi: 3.1.0
info:
  title: Petstore API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: Список питомцев
      responses:
        '200':
          description: Успешный ответ
```

### Основные секции

- **openapi / swagger** — версия спецификации
- **info** — метаданные API (название, описание, версия)
- **servers** — базовые URL для запросов
- **paths** — описание эндпоинтов и методов
- **components** — переиспользуемые схемы (schemas, parameters, responses)
- **security** — механизмы аутентификации

## Инструменты

- **Swagger Editor** — редактор с валидацией
- **Swagger UI** — интерактивная документация
- **Swagger Codegen / OpenAPI Generator** — генерация кода
- **Stoplight Studio** — визуальный редактор

## Преимущества

- Единый источник правды (single source of truth) для API
- Автоматическая генерация документации
- Валидация запросов и ответов
- Интеграция с CI/CD (contract testing)

## Недостатки

- Громоздкий для больших API (тысячи строк YAML)
- Сложность поддержки вручную
- Не все инструменты поддерживают OpenAPI 3.1

## Рекомендации

Для новых проектов используйте OpenAPI 3.1. Поддерживайте спецификацию в актуальном состоянии — устаревшая документация хуже, чем её отсутствие. Используйте кодогенерацию, чтобы избежать рассинхронизации кода и документации.
