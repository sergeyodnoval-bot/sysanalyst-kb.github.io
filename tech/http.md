---
id: http
sidebar_position: 1
title: "HTTP — HyperText Transfer Protocol"
sidebar_label: HTTP
type: technology
tech_type: technology
level: 2
category: integration
tags: [http, protocol, web, rfc, tcp]
official_url: https://httpwg.org/specs/
version: "HTTP/3"
published_date: 2022-06-06
first_seen: 1997
citation_key: http
requires_articles: [basics/what-is-protocol, basics/client-server-basics]
used_in_tasks: [design-rest-api]
alternatives: []
difficulty: 2
estimated_time: 15
audience: junior
---

# HTTP — HyperText Transfer Protocol

HTTP (HyperText Transfer Protocol) — это протокол прикладного уровня, лежащий в основе передачи данных в Вебе. Работает поверх TCP (или QUIC для HTTP/3) по модели «запрос-ответ»: клиент отправляет запрос, сервер возвращает ответ.

## Для чего используется

- Передача веб-страниц (HTML, CSS, JS)
- Обмен данными через REST API и GraphQL
- Стриминг видео и аудио
- Загрузка и выгрузка файлов
- WebHook-уведомления

## Ключевые концепции

### Структура запроса и ответа

**HTTP-запрос:**

```
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer <token>

```

Стартовая строка: метод + URI + версия протокола. Затем заголовки, затем тело (необязательно).

**HTTP-ответ:**

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

{"users": [{"id": 1, "name": "Alice"}]}
```

### Методы HTTP

| Метод | Назначение | Идемпотентность | Безопасность |
|-------|-----------|-----------------|--------------|
| GET | Получение ресурса | Да | Да |
| POST | Создание ресурса / отправка данных | Нет | Нет |
| PUT | Полная замена ресурса | Да | Нет |
| PATCH | Частичное обновление | Нет | Нет |
| DELETE | Удаление ресурса | Да | Нет |
| HEAD | Получение заголовков без тела | Да | Да |
| OPTIONS | Получение списка поддерживаемых методов | Да | Да |

**Идемпотентность** — повторный запрос даёт тот же эффект, что и первый.

**Безопасность (safe)** — запрос не меняет состояние сервера.

### Коды состояния

| Класс | Описание | Типичные коды |
|-------|----------|--------------|
| 1xx | Информационные | 100 Continue, 101 Switching Protocols |
| 2xx | Успех | 200 OK, 201 Created, 204 No Content |
| 3xx | Перенаправление | 301 Moved, 304 Not Modified |
| 4xx | Ошибка клиента | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | Ошибка сервера | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

### Заголовки

Основные группы заголовков:

- **General** — Cache-Control, Connection, Date
- **Request** — Host, User-Agent, Accept, Authorization, Content-Type
- **Response** — Server, Set-Cookie, WWW-Authenticate
- **Entity** — Content-Length, Content-Encoding, Last-Modified

## Версии протокола и спецификации

### HTTP/1.1 (RFC 7230–7235)

Самая распространённая версия. Одно соединение — один запрос (конвейерная обработка не прижилась). Использует keep-alive для переиспользования соединений.

- RFC 7230 — Message Syntax and Routing
- RFC 7231 — Semantics and Content
- RFC 7232 — Conditional Requests
- RFC 7233 — Range Requests
- RFC 7234 — Caching
- RFC 7235 — Authentication

### HTTP/2 (RFC 7540, 2015)

Мультиплексирование — несколько запросов в одном TCP-соединении. Сжатие заголовков (HPACK). Server Push (устарел в HTTP/3). Бинарный протокол вместо текстового.

- RFC 7540 — HTTP/2
- RFC 7541 — HPACK: Header Compression

### HTTP/3 (RFC 9114, 2022)

Работает поверх QUIC (RFC 9000) вместо TCP. Устраняет проблему Head-of-Line блокировки HTTP/2. Быстрое установление соединения (0-RTT).

- RFC 9114 — HTTP/3
- RFC 9204 — QPACK: Header Compression for HTTP/3
- RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport

## Когда использовать

- Веб-приложения и веб-сайты — основная область HTTP
- REST API и микросервисная архитектура
- Сценарии запрос-ответ с умеренными требованиями к задержке
- Публичные API с широкой совместимостью

## Когда НЕ использовать

- **Высокочастотный стриминг в реальном времени** — лучше WebSocket или WebRTC
- **Высокопроизводительный внутренний обмен** — gRPC эффективнее
- **Push-уведомления от сервера без запроса** — нужен WebSocket или Server-Sent Events
- **IoT и low-bandwidth** — MQTT или CoAP легче

## Альтернативы

| Протокол | Отличие от HTTP | Когда выбирать |
|----------|----------------|----------------|
| **WebSocket** | Двунаправленный канал, одно соединение | Чат, уведомления в реальном времени |
| **gRPC** | Бинарный протокол на HTTP/2, строгая типизация | Микросервисы, внутренние API |
| **GraphQL** | Надстройка над HTTP, гибкие запросы | Клиенты с разными потребностями в данных |
| **MQTT** | Лёгкий pub/sub протокол | IoT, мобильные приложения |
| **SOAP** | XML-based, строгая спецификация | Legacy-системы, банковские интеграции |

## Как начать

1. Прочитайте спецификацию HTTP/1.1 (RFC 7230–7235)
2. Установите curl или httpie — отправляйте простые запросы
3. Изучите OpenAPI — стандарт описания HTTP API
4. Попробуйте Postman или Insomnia для визуальной работы с запросами
5. Настройте простой HTTP-сервер (Node.js http, Python http.server) и поэкспериментируйте

## Ссылки

- [HTTP Working Group](https://httpwg.org/specs/) — официальные спецификации
- [MDN: HTTP](https://developer.mozilla.org/ru/docs/Web/HTTP) — понятное изложение
- [HTTP Status Codes](https://httpstatuses.io/) — справочник кодов состояния
- [curl](https://curl.se/) — консольный HTTP-клиент
