---
id: grpc
title: gRPC — Remote Procedure Call framework
sidebar_label: gRPC
type: technology
tech_type: technology
category: integration
tags: [api, protocol, grpc, http2, protobuf]
official_url: https://grpc.io/
github: https://github.com/grpc/grpc
vendor: Google / CNCF
license: Apache 2.0
first_seen: 2015
difficulty: 4
estimated_time: 25
requires_articles: [integration/api-rest-basics]
used_in_tasks: [design-rest-api, integrate-two-systems]
alternatives: [openapi, graphql]
audience: middle
---

# gRPC — Remote Procedure Call

**gRPC** — высокопроизводительный фреймворк для удалённого вызова процедур (RPC) от Google. Использует HTTP/2 для транспорта и Protocol Buffers (protobuf) для сериализации данных.

## Для чего используется

- **Микросервисная архитектура** — быстрое взаимодействие между сервисами
- **Реалтайм-стриминг** — передача данных в реальном времени (чат, логи, котировки)
- **Мобильные и IoT-клиенты** — компактный бинарный протокол экономит трафик
- **ML-сервисы** — передача тензоров и больших массивов данных

## Ключевые концепции

- **Protocol Buffers (protobuf)** — язык определения интерфейсов и формат сериализации (`.proto` файлы)
- **HTTP/2** — транспорт: мультиплексирование, сжатие заголовков, server push
- **Unary call** — классический запрос-ответ (как REST)
- **Server streaming** — сервер отправляет поток сообщений
- **Client streaming** — клиент отправляет поток сообщений
- **Bidirectional streaming** — двунаправленный поток (оба отправляют)

## gRPC vs REST

| Критерий | REST | gRPC |
|----------|------|------|
| Формат данных | JSON (текстовый) | Protobuf (бинарный) |
| Скорость | Медленнее (парсинг JSON) | Быстрее (бинарный, компактный) |
| Контракт | OpenAPI (отдельный YAML) | Protobuf (встроенный в кодогенерацию) |
| Стриминг | Нет нативной поддержки | Встроенная поддержка streaming |
| Браузеры | Нативная поддержка | Требуется grpc-web + proxy |
| Читаемость | Человекочитаемый JSON | Бинарный (нужен grpcurl) |
| Экосистема | Огромная (Postman, Swagger) | Меньше, но растёт |

## Когда использовать

- **Внутренние микросервисы** — высокая скорость и строгая типизация важнее читаемости
- **Высоконагруженные системы** — тысячи RPS, нужно экономить трафик
- **Реалтайм-приложения** — streaming, чаты, уведомления
- **ML-инференс** — передача больших тензоров (TensorFlow Serving использует gRPC)

## Когда НЕ использовать

- **Публичные API для внешних клиентов** — REST/JSON удобнее и совместимее
- **Браузерные приложения** — REST проще без дополнительного grpc-web слоя
- **Простые CRUD-сервисы** — overhead gRPC не оправдан
- **Команда не знает protobuf** — кривая обучения выше, чем REST

## Альтернативы

| Альтернатива | Когда выбрать |
|-------------|---------------|
| REST + OpenAPI | Публичные API, браузеры, простые интеграции |
| GraphQL | Гибкая выборка данных, сложные графовые запросы |
| SOAP | Legacy-системы, строгие контракты (редко для новых проектов) |
| AsyncAPI | Event-driven архитектура, message brokers |

## Как начать

- [Официальная документация gRPC](https://grpc.io/docs/)
- [Protocol Buffers tutorial](https://protobuf.dev/getting-started/)
- [gRPC vs REST: сравнение](https://grpc.io/blog/grpc-vs-rest/)
