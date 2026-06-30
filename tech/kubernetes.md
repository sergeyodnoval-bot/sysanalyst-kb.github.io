---
id: kubernetes
title: Kubernetes — оркестрация контейнеров
sidebar_label: Kubernetes
type: technology
tech_type: tool
level: 4
tags: [devops, containers, orchestration, k8s, architecture]
official_url: https://kubernetes.io/docs/home/
version: "1.32"
requires_articles: [architecture/microservices-patterns, integration/api-rest-basics]
used_in_tasks: [telecom-oss-integration]
alternatives: [docker-swarm, nomad, openshift]
---

Kubernetes (K8s) — платформа для оркестрации контейнеров (Docker). Автоматизирует развёртывание, масштабирование и управление микросервисами.

**Ключевые понятия:**

| Понятие | Описание |
|---------|----------|
| **Pod** | Минимальная единица развёртывания (один или несколько контейнеров) |
| **Deployment** | Декларативное описание желаемого состояния pod'ов |
| **Service** | Стабильный endpoint для доступа к pod'ам |
| **Ingress** | Внешний доступ (HTTP/HTTPS) |
| **ConfigMap / Secret** | Конфигурация и секреты |
| **Namespace** | Виртуальный кластер внутри физического |

**Для аналитика:**
- K8s — стандарт де-факто для микросервисов в продакшне
- При проектировании архитектуры указывать требования к ресурсам (CPU, RAM, disk)
- Stateful-сервисы (БД, Kafka) требуют StatefulSet, а не Deployment
- Для аналитика не нужно знать YAML-манифесты, но нужно понимать, как приложение масштабируется

**Типовые объекты в архитектуре:**

```
Пользователь → Ingress → Service → Deployment (3 replicas)
                                       │
                                       ▼
                              ConfigMap + Secret → Pod
```

**Ссылки:** [Kubernetes Documentation](https://kubernetes.io/docs/home/)
