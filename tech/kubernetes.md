---
id: kubernetes
title: Kubernetes — оркестрация контейнеров
sidebar_label: Kubernetes
level: 4
tags: [devops, containers, orchestration, k8s, architecture]
---

Kubernetes (K8s) — платформа для оркестрации контейнеров (Docker). Автоматизирует развёртывание, масштабирование и управление микросервисами.

**Ключевые понятия:**
- **Pod** — минимальная единица развёртывания (один или несколько контейнеров)
- **Deployment** — декларативное описание желаемого состояния pod'ов
- **Service** — стабильный endpoint для доступа к pod'ам
- **Ingress** — внешний доступ (HTTP/HTTPS)
- **ConfigMap / Secret** — конфигурация и секреты
- **Namespace** — виртуальный кластер внутри физического

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
