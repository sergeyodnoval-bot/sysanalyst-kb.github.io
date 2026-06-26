---
id: api-first-design
sidebar_position: 10
title: "API-first design"
sidebar_label: "API-first design"
level: 5
category: data
tags: [data, l3, middle, api, design, specification, contract]
prerequisites: [integration/api-design-detailed]
leads_to: []
related: [integration/api-openapi, integration/event-driven-architecture]
estimated_time: 20
difficulty: 4
---

# API-first design

API-first — это подход к разработке, при котором API проектируется и специфицируется **до начала написания кода**. API становится контрактом, вокруг которого строятся и фронтенд, и бэкенд.

## Традиционный подход vs API-first

| | Code-first (традиционный) | API-first |
|--|--------------------------|-----------|
| **Порядок** | Сначала код → потом документация | Сначала спецификация → потом код |
| **Контракт** | Формируется из кода (Swagger-генерация) | Создаётся в YAML до кода |
| **Изменения** | Трудно: нужно менять код, потом спецу | Легко: меняем spec → оба синхронно |
| **Согласование** | После реализации | До начала разработки |
| **Mock-сервер** | Нет (реальный API уже готов) | Есть (из spec) |
| **Параллельная работа** | Фронт ждёт бэк | Фронт и бэк работают одновременно |

## Принципы API-first

1. **Specification first** — OpenAPI / AsyncAPI / GraphQL SDL создаётся и утверждается первой
2. **Design for client** — API проектируется под нужды потребителя, а не под удобство бэкенда
3. **Consistency** — единые naming conventions, форматы ошибок, пагинация, версионирование
4. **Review** — API design review перед реализацией (с участием фронта и бэка)
5. **Automation** — из spec генерируются: документация, клиенты, mock-серверы, тесты

## Когда нужен API-first

- **Публичное API** — внешние разработчики будут его использовать
- **Микросервисная архитектура** — много команд, каждая разрабатывает свой сервис
- **Фронт и бэк в разных командах** — нужен контракт для синхронизации
- **Mobile + Web + Third-party** — несколько клиентов у одного API
- **B2B-интеграции** — партнёры подключаются по API

## Процесс API-first

### 1. Design (Проектирование)

- Определите ресурсы и эндпоинты (RESTful naming: `/orders`, `/users/{id}`)
- Определите форматы запросов и ответов (JSON Schema)
- Определите ошибки (стандартный формат: `{error: {code, message, details}}`)
- Определите пагинацию (cursor-based / offset-based)
- Определите аутентификацию (Bearer token / OAuth2)

### 2. Specification (Спецификация)

```yaml
openapi: 3.1.0
info:
  title: Orders API
  version: 0.1.0  # 0.x — pre-release (ещё не реализовано)
paths:
  /orders:
    get:
      summary: Список заказов
      parameters:
        - $ref: '#/components/parameters/Cursor'
      responses:
        '200':
          description: Успешный ответ
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderList'
```

### 3. Review (Ревью)

- Проверьте naming (глаголы только в методах HTTP, существительные в path)
- Проверьте consistency (везде одинаковые форматы ошибок)
- Проверьте backward compatibility (не ломаем существующие клиенты)
- Пригласите фронт и бэк: удобно ли им?

### 4. Mock & Validate (Мок и валидация)

- Сгенерируйте mock-сервер из spec (Prism, Stoplight, Postman Mock Server)
- Фронт начинает разработку на моках
- Напишите contract-тесты (Dredd, Postman, Assertible)

### 5. Generate (Генерация)

- Сгенерируйте серверный скелет (openapi-generator, swagger-codegen)
- Сгенерируйте клиентский SDK для мобильных / web
- Сгенерируйте документацию (Swagger UI, Redoc)

### 6. Implement & Test (Реализация и тест)

- Реализуйте бэкенд по spec
- Прогоните contract-тесты — сервер должен соответствовать spec
- Обновляйте spec при изменениях (не наоборот)

## Инструменты

| Инструмент | Назначение |
|-----------|-----------|
| **Swagger Editor / Stoplight** | Редактор OpenAPI |
| **Prism** | Mock-сервер из OpenAPI |
| **Dredd** | Contract testing (API blueprint / OpenAPI) |
| **OpenAPI Generator** | Генерация кода |
| **Spectral** | Линтер для OpenAPI |
| **Portman** | Тестирование и тестовые данные из OpenAPI |

## Типичные ошибки

- **API проектируется под существующую БД** — не «вот таблицы, сделайте API», а «вот что нужно клиенту»
- **Слишком детально на раннем этапе** — MVP версия 0.1 не требует всех полей
- **Нет версионирования** — первая же обратно несовместимая change ломает всех клиентов
- **Игнорирование ошибок** — 500 без тела ответа — плохой API
- **API-first, но spec никто не читает** — если фронт не участвовал в ревью, spec бесполезна

## Ссылки

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [API-first — принципы (Google Cloud)](https://cloud.google.com/blog/products/api-management/api-first-design)
- [Stoplight — API design tools](https://stoplight.io/)
- [Prism — HTTP mock server](https://meta.stoplight.io/docs/prism/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Dredd — HTTP API testing framework](https://dredd.org/)
