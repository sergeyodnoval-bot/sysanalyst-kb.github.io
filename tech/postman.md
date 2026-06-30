---
id: postman
sidebar_position: 2
title: Postman
sidebar_label: Postman
type: technology
tech_type: tool
level: 2
category: testing
tags: [postman, api, testing, collections, automation]
prerequisites: [tech/http]
leads_to: []
related: [integration/api-rest-basics, tech/openapi]
estimated_time: 15
difficulty: 2
vendor: Postman Inc.
official_url: https://www.postman.com/
first_seen: 2012
requires_articles: [integration/api-rest-basics]
used_in_tasks: [design-rest-api]
alternatives: []
---

# Postman

Postman — популярный инструмент для разработки, тестирования и документирования API. Предоставляет графический интерфейс для отправки HTTP-запросов и управления коллекциями.

## Возможности

### Отправка запросов

Postman поддерживает все HTTP-методы (GET, POST, PUT, DELETE, PATCH) и позволяет настраивать:

- Заголовки (Headers)
- Параметры запроса (Query params)
- Тело запроса (Body) — JSON, XML, form-data, binary
- Аутентификацию (Basic Auth, OAuth, API Key)

### Коллекции

Коллекции объединяют связанные запросы. Их можно:

- Группировать в папки
- Экспортировать в JSON (в т.ч. OpenAPI)
- Делиться с командой
- Запускать через Newman (CLI)

### Переменные и окружения

Postman поддерживает переменные на разных уровнях:

- **Global** — доступны во всех коллекциях
- **Collection** — в рамках одной коллекции
- **Environment** — переключаемые наборы (dev/staging/prod)
- **Local** — временные, в рамках одного запроса

### Скрипты (Pre-request / Tests)

JavaScript-скрипты выполняются до/после запроса:

```javascript
// Pre-request: установка timestamp
pm.variables.set('timestamp', Date.now());

// Tests: проверка ответа
pm.test('Status 200', () => {
  pm.response.to.have.status(200);
});
```

## Newman (CLI)

Newman позволяет запускать коллекции из командной строки — удобно для CI/CD:

```bash
newman run collection.json -e env.json --reporters cli,json
```

## Интеграции

- Импорт OpenAPI/Swagger-спецификаций
- Экспорт в OpenAPI
- Mock-серверы на основе коллекций
- Мониторы (периодические проверки API)

## Альтернативы

- **Insomnia** — open-source, легковесный
- **Bruno** — локальное хранение коллекций (без облака)
- **curl / httpie** — консольные инструменты
- **Swagger UI** — интерактивная документация

## Заключение

Postman — стандарт де-факто для ручного тестирования API. Для автоматизации в CI/CD используйте Newman. Для командной работы используйте коллекции и окружения.
