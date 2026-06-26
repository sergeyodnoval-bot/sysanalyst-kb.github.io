---
id: docker
title: Docker — контейнеризация
sidebar_label: Docker
type: technology
tech_type: technology
category: infrastructure
tags: [docker, containers, devops, deployment]
official_url: https://www.docker.com/
github: https://github.com/moby/moby
vendor: Docker Inc.
license: Apache 2.0
first_seen: 2013
difficulty: 3
estimated_time: 20
requires_articles: [architecture/microservices-patterns]
used_in_tasks: [integrate-two-systems]
alternatives: [podman, containerd, kubernetes]
---

# Docker — контейнеризация

**Docker** — платформа для контейнеризации приложений. Контейнер — это упакованное приложение со всем окружением (библиотеки, настройки), которое гарантированно работает одинаково на любой машине.

## Почему это важно для аналитика

Контейнеризация меняет подход к развёртыванию и NFR:
- «Работает на моей машине» — больше не проблема
- Масштабирование: не копировать ВМ, а запускать ещё контейнеров
- Каждый микросервис = отдельный контейнер
- Инфраструктура описывается кодом (Dockerfile, docker-compose.yml)

## Ключевые концепции

| Понятие | Описание |
|---------|----------|
| **Image (образ)** | Шаблон для контейнера (read-only), включает код + окружение |
| **Container** | Запущенный экземпляр образа, изолированный процесс |
| **Dockerfile** | Инструкция по сборке образа |
| **Registry** | Хранилище образов (Docker Hub, приватный registry) |
| **Volume** | Папка, доступная из контейнера (для данных) |
| **Network** | Сеть между контейнерами |

## Docker vs Virtual Machine

| Критерий | Docker Container | Virtual Machine |
|----------|----------------|----------------|
| Изоляция | На уровне процессов (использует ядро хоста) | Полная (своё ядро, своя ОС) |
| Размер | MB | GB |
| Запуск | Секунды | Минуты |
| Ресурсы | Минимальный overhead | Overhead на каждую ВМ |
| Безопасность | Меньше изоляция | Полная изоляция |

## docker-compose

Инструмент для запуска нескольких контейнеров (например, сервис + БД + Redis). Всё описывается в YAML-файле:

```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
      - redis
  db:
    image: postgres:16
  redis:
    image: redis:7
```

## Kubernetes (k8s)

Платформа для оркестрации контейнеров в продакшне: автомасштабирование, балансировка, rolling updates, self-healing.

**Для аналитика:** выбирать Docker, если система не требует оркестрации (dev, тест, простой микросервис). Для продакшна микросервисов — Kubernetes (или облачный сервис: EKS, GKE, AKS).

## Альтернативы

| Альтернатива | Когда выбрать |
|-------------|---------------|
| Podman | Без демона, rootless, Red Hat |
| containerd | Лёгкий runtime (используется внутри Kubernetes) |

## Для аналитика

Docker — стандарт упаковки приложений. В спецификации указывать: образ на основе чего, порты, volumes, переменные окружения. Для продакшна — требования к Kubernetes: количество реплик, лимиты CPU/RAM, политика обновления.
