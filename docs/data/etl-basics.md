---
id: etl-basics
sidebar_position: 8
title: "ETL — основы"
sidebar_label: "ETL — основы"
level: 5
category: data
tags: [data, l3, middle, etl, data-pipeline, integration]
prerequisites: [data/dwh-basics]
leads_to: [data/data-migration]
related: [data/data-modeling, integration/async-message-queue]
estimated_time: 30
difficulty: 4
---

# ETL — основы

ETL (Extract, Transform, Load) — это процесс извлечения данных из источников, их трансформации и загрузки в целевую систему (обычно DWH). Позволяет собрать данные из разных систем в одном месте для анализа.

## Extract (Извлечение)

### Способы извлечения

| Метод | Описание | Как часто | Пример |
|-------|----------|-----------|--------|
| **Full load** | Полная выгрузка каждый раз | Раз в день / неделю | Выгрузка справочника товаров |
| **Incremental** | Только изменения (CDC, timestamp) | Каждые N минут / часов | Новые заказы за последние 5 минут |
| **Log-based CDC** | Чтение логов БД (binlog, WAL) | Реальное время | Debezium → Kafka → DWH |
| **API pull** | Запрос к REST / SOAP API | По расписанию | Выгрузка из CRM |
| **File import** | CSV / JSON / Parquet файлы | Когда есть файл | Выгрузка от контрагента |

## Transform (Трансформация)

Самый важный и трудоёмкий этап ETL.

### Типовые трансформации

- **Очистка** — удаление дубликатов, заполнение NULL, исправление форматов
- **Согласование** — приведение к единым справочникам (клиент «Иван» = «Ivan» = «Ivanov I.»)
- **Агрегация** — суммирование продаж по дням / неделям / месяцам
- **Расчёт** — вычисление derived-полей (возраст из даты рождения, ROI)
- **Маппинг** — приведение кодов из разных систем к единому справочнику
- **Денормализация** — превращение 3NF в звезду (flat table для BI)

### Где выполнять трансформацию

| Подход | Примеры | Плюсы | Минусы |
|--------|---------|-------|--------|
| **ETL** | Apache Spark, dbt, SSIS | Удобно для сложной логики | Нужен отдельный compute |
| **ELT** | Snowflake, BigQuery, ClickHouse | Данные уже в целевой БД | Трансформация в SQL — не для всего |
| **Streaming** | Kafka Streams, Flink | Реальное время | Сложнее отладка |

## Load (Загрузка)

| Стратегия | Описание | Когда использовать |
|-----------|----------|-------------------|
| **Truncate & Load** | Удалить всё → загрузить заново | Маленькие таблицы, справочники |
| **Append** | Добавить новые строки | Логи, события, факты |
| **Upsert (Merge)** | Обновить существующие + вставить новые | Измерения (Dimension), медленно меняющиеся данные |
| **SCD (Slowly Changing Dimension)** | Типы 1-3 для историчности | Dimension-таблицы (адрес клиента меняется) |

### SCD — Slowly Changing Dimension

| Тип | Описание | Пример |
|-----|----------|--------|
| **Type 1** | Перезаписать (истории нет) | Исправление опечатки в имени |
| **Type 2** | Добавить строку с `valid_from` / `valid_to` | Изменение адреса клиента |
| **Type 3** | Добавить колонку `previous_value` | Смена фамилии |

## Инструменты ETL

| Инструмент | Тип | Когда использовать |
|-----------|-----|-------------------|
| **dbt** | ELT (SQL-only) | DWH на Snowflake / BigQuery / ClickHouse |
| **Apache Airflow** | Оркестратор | Управление пайплайнами, расписание, мониторинг |
| **Apache Spark** | ETL (код) | Большие объёмы, сложные трансформации |
| **Talend / SSIS** | GUI ETL | Enterprise, legacy |
| **Debezium** | CDC | Real-time streaming из БД |
| **Kafka Connect** | Streaming | Интеграция через Kafka |

## Типичная архитектура ETL

```
Источник → [Extract] → Staging Area → [Transform] → DWH → Data Marts → BI
                │                                              │
                └─── мониторинг (Airflow) ──────────────────────┘
                         │                              │
                    Уведомления                    Логи ошибок
```

## Типичные проблемы ETL

- **Источник изменил схему** — добавили колонку → ETL упал
- **Дубликаты** — один и тот же заказ загружен дважды
- **Data quality** — NULL в обязательном поле, неверный формат даты
- **Производительность** — incremental случайно стал full load → DWH не справляется
- **Зависимости** — DWH-таблица A зависит от B, а B ещё не загрузилась

## Как начать

1. Установите [dbt](https://docs.getdbt.com/docs/install) или Airflow в Docker
2. Подключитесь к источнику (например, PostgreSQL)
3. Напишите простую модель: `SELECT id, name, created_at FROM source.users`
4. Загрузите в целевую таблицу
5. Настройте расписание (каждый час)

## Ссылки

- [dbt — официальная документация](https://docs.getdbt.com/)
- [Apache Airflow — концепции](https://airflow.apache.org/docs/apache-airflow/stable/concepts/index.html)
- [ETL vs ELT — разница (Snowflake)](https://www.snowflake.com/guides/etl-vs-elt)
- [Debezium — CDC tutorial](https://debezium.io/documentation/reference/stable/tutorial.html)
- [Kimball — ETL Architecture](https://www.kimballgroup.com/)
