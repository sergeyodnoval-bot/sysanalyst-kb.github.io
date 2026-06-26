---
id: ai-ml-architecture
title: AI-аналитик — архитектура AI-решений (MLOps, feature store)
sidebar_label: Архитектура AI-решений
level: 9
category: specialization
tags: [ai, ml, architecture, mlops, feature-store, deployment]
prerequisites: [specialization/ai-analyst-intro, specialization/ai-ml-requirements, specialization/ai-ml-metrics, architecture/what-is-architecture]
leads_to: []
related: [architecture/microservices-patterns, architecture/eda-detailed, data/data-migration]
estimated_time: 25
difficulty: 5
audience: senior
---

:::info TL;DR
AI-решение в продакшне — это не Jupyter-ноутбук, а распределённая система из нескольких компонентов: пайплайн данных, хранилище признаков, сервис инференса, мониторинг и MLOps-инфраструктура. AI-аналитик специфицирует архитектуру на уровне компонентов, их взаимодействие и нефункциональные характеристики.
:::

## Архитектура ML-системы: общая схема

Современное AI-решение в продакшне состоит из следующих слоёв:

```
┌─────────────────────────────────────────────────┐
│                  Product Layer                   │
│  Mobile app, Web, API, Chat bot, Internal tool  │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              Inference Layer                     │
│  Model serving (Triton, TorchServe, Собственный  │
│  API), Feature retrieval, Pre/post-processing   │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│            Feature Store Layer                   │
│  Feast, Tecton, Собственное решение             │
│  Онлайн-признаки (Redis) + Офлайн-признаки (S3) │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│             Pipeline / Training Layer            │
│  Data ingestion, Validation, Training,          │
│  Evaluation, Model registry                     │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              Data Layer                          │
│  DWH, Data Lake, Streaming (Kafka), External API│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              MLOps / Orchestration               │
│  CI/CD for models, Experiment tracking,         │
│  Monitoring (drift, metrics), Alerting           │
└─────────────────────────────────────────────────┘
```

## Роль AI-аналитика в проектировании архитектуры

Аналитик не проектирует инфраструктуру (это задача ML Engineer / DevOps), но отвечает за:

1. **Компонентную архитектуру** — какие компоненты нужны, как они связаны, какие данные передают
2. **Требования к каждому компоненту** — latency, throughput, consistency, доступность
3. **Сценарии взаимодействия** — синхронный запрос (REST/gRPC) или асинхронный (event-driven)
4. **Data flow** — схема движения данных от источника до предсказания
5. **Non-functional requirements** — SLA, cost, scalability, security

## Варианты архитектур ML-сервисов

### 1. Embedding-модель (для RAG)

```
Request ──→ API Gateway ──→ Embedding Service ──→ Vector DB ──→ LLM Service ──→ Response
                                │                                    │
                                └──────── Context retrieval ──────────┘
```

**Требования от аналитика:**
- Embedding Service: latency < 200ms на запрос, поддерживает batch
- Vector DB: top-K поиск за < 100ms, поддерживает фильтрацию по метаданным
- LLM Service: latency < 3s, стоимость инференса < $X за 1K запросов

### 2. Batch-предсказание (offline scoring)

```
Data Lake ──→ Feature Engineering ──→ Model Inference ──→ Result Sink (DB)
     │                                  │
     └──── Scheduled Job (Airflow) ─────┘
```

**Требования от аналитика:**
- Job frequency: ежедневно в 03:00
- Window: обработать 10M записей за < 2 часа
- SLA: результат должен быть в БД к 06:00
- Alert: если job не завершился за 3 часа

### 3. Реалтайм-инференс (online scoring)

```
Event ──→ Kafka ──→ Stream Processor ──→ Feature Store ──→ Model Server ──→ Result → Kafka
                    (Flink/Spark)             │                  │
                                              └── Feature lookup ──┘
```

**Требования от аналитика:**
- Event processing: P99 latency < 500ms от получения события до выдачи предсказания
- Consistency: exactly-once processing для финансовых сценариев
- Availability: 99.9% для critical path
- Fallback: если модель недоступна — использовать rule-based baseline

## Feature store: центральное хранилище признаков

**Feature store** — компонент, который решает проблему разрыва между признаками для обучения и признаками для инференса:

| Задача | Без feature store | С feature store |
|--------|------------------|-----------------|
| Признаки для обучения | Data Scientist пишет SQL-запросы | Те же признаки доступны через API |
| Признаки для инференса | ML Engineer дублирует логику | Feature store выдаёт готовые признаки |
| Консистентность | Признаки могут отличаться между обучением и инференсом | Online/offline признаки гарантированно одинаковы |
| Версионирование | Нет | Каждая версия признаков сохранена |

**Требования к feature store:**
- Online store: Redis / DynamoDB — latency < 10ms на запрос
- Offline store: S3 / Parquet — для batch-обучения
- Point-in-time join: возможность получить признаки на любой момент времени (чтобы избежать data leakage)

## MLOps: CI/CD для ML

MLOps — это практика применения DevOps-принципов к ML-системам:

**Компоненты MLOps, которые важны для спецификации:**
- **Experiment tracking** — MLflow, Weights & Biases: логирование экспериментов
- **Model registry** — версионирование моделей, promotion (staging → production)
- **Pipeline orchestration** — Airflow, Prefect, Kubeflow: запуск пайплайнов обучения
- **Model serving** — Triton, TorchServe, BentoML: инференс-сервер
- **Monitoring** — WhyLabs, Evidently, Собственное: drift, метрики, алерты

**Требования:**
- **CI/CD pipeline:** при изменении кода или данных — автоматический retrain + валидация
- **Model registry:** promotion-процесс — только модель, прошедшая validation, попадает в prod
- **Shadow deployment:** новая модель работает параллельно с текущей, без влияния на пользователей
- **A/B testing framework:** возможность сравнивать две версии модели на реальном трафике

## Мониторинг ML-системы

AI-аналитик специфицирует, что и как мониторить:

| Слой | Что мониторить | Типичный алерт |
|------|---------------|----------------|
| **Data** | Объём, качество, дрейф распределения | «Feature X — KS-test p-value < 0.01» |
| **Model** | Метрики (accuracy, precision), drift предсказаний | «Accuracy упала ниже baseline» |
| **Infrastructure** | Latency, throughput, ошибки | «P99 latency > 500ms, HTTP 503» |
| **Business** | Business KPI | «Conversion без изменений 2 недели» |

Для каждой метрики мониторинга аналитик фиксирует:
- **Source метрики** — откуда берём (логи, БД, external tool)
- **Frequency** — как часто измеряем
- **Threshold** — порог срабатывания алерта
- **Severity** — P0 (ночной звонок) vs P3 (утренняя проверка)
- **Runbook** — что делать при срабатывании

## Типовые нефункциональные требования для AI-систем

| Категория | Требование | Типичное значение |
|-----------|-----------|-------------------|
| **Latency** | P99 время инференса | < 200ms (online), < 2s (LLM) |
| **Throughput** | Запросов в секунду | scalable до 1000 RPS |
| **Availability** | Uptime ML-сервиса | 99.9% (3 nines) |
| **Cost** | Стоимость 1K предсказаний | < $0.10 |
| **Freshness** | Максимальный возраст признаков | < 5 минут (online), < 24h (batch) |
| **Explainability** | Минимальный уровень | L2 (локальная) для кредитного скоринга |
| **Fairness** | Disparate impact | > 0.8 |
| **Audit** | Хранение логов предсказаний | 1 год |

## Ключевые термины

- **MLOps** — практика применения CI/CD, мониторинга и автоматизации к ML-системам
- **Feature store** — централизованное хранилище признаков для обучения и инференса
- **Model registry** — система версионирования и управления жизненным циклом моделей
- **Shadow deployment** — запуск новой модели параллельно с текущей без влияния на продукт
- **Drift monitoring** — отслеживание изменения распределения данных и предсказаний модели

## Что дальше

- [Этика, bias и регуляторика ИИ](/docs/specialization/ai-ethics) — compliance-требования к AI-архитектуре
- [Проектирование REST API](/docs/integration/api-design-detailed) — как спроектировать API для ML-сервиса
- [Проектирование RAG-пайплайна (задача)](/tasks/design-rag-pipeline) — практическая задача

## Проверь себя

1. **Зачем нужен feature store в ML-архитектуре?**
   *Ответ:* Чтобы гарантировать, что признаки для обучения и для инференса совпадают, и не дублировать логику feature engineering.

2. **Чем shadow deployment отличается от A/B-теста?**
   *Ответ:* Shadow deployment: новая модель работает параллельно, её предсказания логируются, но не влияют на продукт. A/B-тест: часть пользователей получает предсказания новой модели, и мы измеряем бизнес-метрики.

3. **Какие слои обязательны в продакшн ML-системе?**
   *Ответ:* Data Layer, Pipeline/Training, Feature Store, Inference, Monitoring/MLOps. Product Layer — зависит от сценария использования.
