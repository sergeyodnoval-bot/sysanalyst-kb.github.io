---
id: api-gateway
sidebar_position: 14
title: "API Gateway pattern"
sidebar_label: "API Gateway"
level: 7
category: integration
tags: [integration, l4, senior, api-gateway, gateway, microservices, backend-for-frontend]
prerequisites: [integration/api-design-detailed, architecture/monolith-vs-microservices]
leads_to: []
related: [integration/api-openapi, architecture/microservices-patterns, integration/enterprise-integration-patterns]
estimated_time: 30
difficulty: 7
---

# API Gateway pattern

API Gateway — это единая точка входа для всех клиентов (web, mobile, third-party), которая маршрутизирует запросы к внутренним сервисам, выполняет кросс-функциональные задачи и скрывает внутреннюю архитектуру.

## Проблема

В микросервисной архитектуре без gateway клиент должен знать о всех сервисах и их расположении:

```
    ┌──────┐    ┌──────────┐
    │  Web ├───→│ Order    │
    ├──────┤    ├──────────┤
    │Mobile├───→│ Payment  │  ← клиент знает все URL
    ├──────┤    ├──────────┤
    │  B2B ├───→│ Inventory│
    └──────┘    └──────────┘
```

Проблемы:
- Клиент делает N запросов (chatty client)
- Клиент обновляется при каждом изменении сервисов
- Auth, rate limiting, logging — в каждом сервисе дублируется

## Как работает API Gateway

```
    ┌──────┐    ┌─────────────┐    ┌──────────┐
    │  Web ├───→│             │───→│ Order    │
    ├──────┤    │   API       │    ├──────────┤
    │Mobile├───→│   Gateway   │───→│ Payment  │
    ├──────┤    │             │    ├──────────┤
    │  B2B ├───→│             │───→│ Inventory│
    └──────┘    └─────────────┘    └──────────┘
                     │
                     ▼
              ┌──────────────┐
              │  Auth        │
              │  Rate Limit  │  ← кросс-функции
              │  Logging     │
              │  Caching     │
              └──────────────┘
```

## Что делает Gateway

| Функция | Описание |
|---------|----------|
| **Routing** | Направляет запросы к нужным сервисам по URL / заголовкам |
| **Aggregation** | Собирает данные из нескольких сервисов в один ответ |
| **Authentication** | Проверяет токен, сессию, API key |
| **Rate Limiting** | Ограничивает количество запросов от клиента |
| **Caching** | Кеширует ответы для частых запросов |
| **Load Balancing** | Распределяет запросы между инстансами сервиса |
| **Protocol Translation** | REST ↔ GraphQL, HTTP ↔ gRPC |
| **Circuit Breaker** | Не пропускает запросы к упавшему сервису |
| **Request/Response Transform** | Меняет формат, фильтрует поля |

## API Gateway vs BFF (Backend for Frontend)

**API Gateway** — единый для всех клиентов.

**BFF** — отдельный gateway для каждого типа клиента (web, mobile, tablet):

```
    ┌──────┐    ┌──────────────┐    ┌─────────┐
    │ Web  ├───→│  BFF Web     │───→│ Service │
    ├──────┤    ├──────────────┤    ├─────────┤
    │Mobile├───→│  BFF Mobile  │───→│ Service │
    ├──────┤    ├──────────────┤    ├─────────┤
    │Tablet├───→│  BFF Tablet  │───→│ Service │
    └──────┘    └──────────────┘    └─────────┘
```

**Когда BFF:** разные клиенты требуют разных данных (mobile — компактно, web — полно).

## Популярные реализации

| Продукт | Тип | Особенность |
|---------|-----|-------------|
| **Kong** | Open Source / Enterprise | Плагины, высокая производительность |
| **KrakenD** | Open Source | Статическая конфигурация, очень быстрый |
| **AWS API Gateway** | Managed | Интеграция с AWS Lambda, Cognito |
| **NGINX** | Reverse proxy | Можно настроить как gateway |
| **Traefik** | Reverse proxy | Автоматическое обнаружение сервисов |
| **Apollo Gateway** | GraphQL | Federated GraphQL |
| **Yandex API Gateway** | Managed | Для облачных решений |

## Anti-patterns

- **Gateway становится монолитом** — всю логику переносят в gateway
- **Smart gateway, dumb services** — gateway делает бизнес-логику
- **Gateway для внутренних сервисов** — internal service mesh другое решение
- **Gateway с состоянием** — должен быть stateless (горизонтальное масштабирование)

## Для системного аналитика

- При проектировании микросервисов — gateway обязательный компонент
- Документируйте, какие функции на gateway, какие в сервисах
- Решайте: единый gateway или BFF
- Включите gateway в диаграмму C4 (Container diagram)

## Ссылки

- [API Gateway pattern (Microsoft)](https://docs.microsoft.com/en-us/azure/architecture/patterns/api-gateway)
- [Backend for Frontend (Sam Newman)](https://samnewman.io/patterns/architectural/bff/)
- [Kong — API Gateway](https://konghq.com/)
- [AWS API Gateway — документация](https://aws.amazon.com/api-gateway/)
- [API Gateway vs Service Mesh (Red Hat)](https://www.redhat.com/architect/api-gateway-vs-service-mesh)
