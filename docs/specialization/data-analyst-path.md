---
id: data-analyst-path
sidebar_position: 2
title: "Путь Data-аналитика"
sidebar_label: "Путь Data-аналитика"
level: 5
category: specialization
tags: [specialization, l3, middle, career, data-analyst, data]
prerequisites: [data/data-modeling]
leads_to: []
related: [data/dwh-basics, data/etl-basics, data/sql-basics, specialization/ba-vs-sa]
estimated_time: 15
difficulty: 5
---

# Путь Data-аналитика

Data-аналитик (аналитик данных) — это специалист, который работает с данными: собирает, очищает, анализирует и визуализирует. В отличие от системного аналитика, фокус не на требованиях к системе, а на данных и выводах из них.

## Чем занимается Data-аналитик

- **Сбор данных** — настройка источников (БД, логи, API, файлы)
- **Очистка (data wrangling)** — удаление дубликатов, заполнение пропусков, исправление форматов
- **Анализ (EDA)** — статистика, распределения, корреляции, аномалии
- **Визуализация** — дашборды (Metabase, Tableau, Superset) и отчёты
- **Product-аналитика** — Retention, LTV, Funnel analysis
- **A/B testing** — проверка гипотез на данных

## Базовые компетенции

| Компетенция | Насколько глубоко | Инструменты |
|-------------|------------------|-------------|
| **SQL** | Продвинутый (окна, CTE, индексы, explain) | PostgreSQL, ClickHouse, BigQuery |
| **Python** | Средний (pandas, numpy, matplotlib) | Jupyter, VS Code |
| **Статистика** | Базовая (mean, median, std, p-value) | scipy, statsmodels |
| **Визуализация** | Средняя (bar, line, heatmap, funnel) | Metabase, Redash, Superset |
| **ETL** | Базовая (настроить простой пайплайн) | dbt, Airflow |
| **Product metrics** | Средняя (DAU, MAU, Retention, LTV, Churn) | Amplitude, Mixpanel |

## Инструменты

| Категория | Инструменты |
|-----------|-------------|
| **SQL IDE** | DBeaver, DataGrip, DataLumos |
| **BI** | Metabase, Redash, Superset, Tableau |
| **Notebook** | Jupyter, Deepnote, Hex |
| **ETL** | dbt, Airflow, ClickHouse |
| **Product Analytics** | Amplitude, Mixpanel, PostHog |

## Data-аналитик vs Системный аналитик

| | Data-аналитик | SA |
|--|--------------|-----|
| **Что делает** | Анализирует данные | Анализирует требования |
| **С чем работает** | Таблицы, дашборды, SQL | Диаграммы, спецификации, API |
| **Результат** | Отчёт, инсайт, гипотеза | ТЗ, архитектурное решение |
| **Кому отдаёт** | Product manager, бизнес | Разработчикам, QA |
| **Вопрос** | «Что говорят данные?» | «Как система должна работать?» |

## Карьерный путь

```
Data-аналитик → Senior DA → Data Engineer / Data Scientist / Product Analyst
                                    ↓
                         Analytics Engineer (dbt, DataOps)
```

**Варианты роста:**
- **Data Engineer** — глубже в ETL, инфраструктуру, DWH
- **Data Scientist** — ML, прогнозные модели, deep learning
- **Product Analyst** — ближе к продукту (Growth, Retention)
- **BI Analyst** — дашборды, отчёты, визуализация

## С чего начать

1. Изучите SQL до продвинутого уровня (окна, CTE, подзапросы)
2. Пройдите курс по статистике (описательная статистика, A/B тесты)
3. Научитесь Python для анализа (pandas, matplotlib)
4. Подключите Metabase к тестовой БД и сделайте дашборд
5. Настройте простой ETL через dbt

## Ресурсы для обучения

- [SQL для аналитики (Mode Analytics)](https://mode.com/sql-tutorial/)
- [Python for Data Analysis (Wes McKinney)](https://wesmckinney.com/book/)
- [Metabase — официальный туториал](https://www.metabase.com/learn/)
- [dbt — tutorials](https://docs.getdbt.com/tutorial)
- [Курс: Product Analytics (Google)](https://www.coursera.org/learn/product-analytics)
- [Data Engineering Cookbook (Andreas Kretz)](https://github.com/andkret/Cookbook)
