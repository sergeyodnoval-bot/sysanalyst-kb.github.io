---
id: mlflow
title: MLflow
sidebar_label: MLflow
type: technology
tech_type: tool
category: specialization
tags: [ai, ml, mlops, experiment, tracking]
official_url: https://mlflow.org/
github: https://github.com/mlflow/mlflow
vendor: Databricks / Linux Foundation
license: Apache 2.0
first_seen: 2018
difficulty: 4
estimated_time: 25
requires_articles: [specialization/ai-ml-architecture]
used_in_tasks: []
alternatives: [weights-and-biases, kubeflow]
audience: middle
---

# MLflow

**MLflow** — open-source платформа для управления жизненным циклом ML-моделей: эксперименты, версионирование, упаковка и deployment.

## Для чего используется

- **Experiment Tracking** — логирование параметров, метрик и артефактов каждого эксперимента
- **Model Registry** — версионирование моделей, promotion (staging → production)
- **MLflow Projects** — упаковка ML-кода в воспроизводимые пайплайны
- **MLflow Models** — единый формат для deployment моделей (REST, batch, Spark)
- **Model Serving** — встроенный REST-сервер для инференса

## Ключевые концепции

- **Run** — один запуск эксперимента: параметры, метрики, артефакты, код
- **Experiment** — группа запусков по одной задаче
- **Model Version** — версия модели в registry с stage (Staging, Production, Archived)
- **MLflow Model** — стандартный формат упаковки модели со средой (conda env, dependencies)
- **Tracking URI** — куда сохраняются логи экспериментов (локально, S3, БД, Databricks)

## Когда использовать

- Команда из 2+ Data Scientists — нужна общая история экспериментов
- ML-проект переходит от Jupyter к production — нужен model registry
- Требуется воспроизводимость: параметры и код каждого эксперимента сохранены
- Нужен простой способ деплоя модели без сложной инфраструктуры

## Когда НЕ использовать

- Data Scientist работает один и не делится экспериментами — overhead не оправдан
- Команда использует специализированную платформу (Databricks, Vertex AI, SageMaker) — там свой tracking
- Требуется глубокий анализ экспериментов — Weights & Biases даёт больше визуализаций

## Альтернативы

| Альтернатива | Описание |
|-------------|----------|
| Weights & Biases | Богатые визуализации, закрытый SaaS |
| Neptune.ai | Experiment tracking + model registry |
| Kubeflow | Full MLOps platform для Kubernetes |
| DVC | Data + model versioning, интеграция с Git |
| ClearML | Open-source MLOps (MLflow competitor) |

## Как начать

- [Официальная документация](https://mlflow.org/docs/latest/index.html)
- Быстрый старт: `pip install mlflow && mlflow ui`
- Интеграция: `mlflow.autolog()` для автоматического логирования из scikit-learn / PyTorch / TensorFlow
