---
id: prometheus
title: Prometheus — система сбора и хранения метрик
sidebar_label: Prometheus
type: technology
tech_type: technology
category: infrastructure
tags: [prometheus, monitoring, metrics, alerting, observability]
official_url: https://prometheus.io/
github: https://github.com/prometheus/prometheus
vendor: CNCF
license: Apache 2.0
first_seen: 2012
difficulty: 4
estimated_time: 20
requires_articles: [architecture/monitoring]
used_in_tasks: [integrate-two-systems]
alternatives: [graphite, influxdb, datadog]
---

# Prometheus — система сбора метрик

**Prometheus** — open-source система сбора и хранения метрик, стандарт де-факто в Kubernetes / cloud-native экосистеме. Использует pull-модель (сама забирает метрики с сервисов).

## Как работает

```
Service A ──(/metrics :9100)──→ Prometheus (pull)
Service B ──(/metrics :9101)──→ Prometheus
Service C ──(/metrics :9102)──→ Prometheus
                                    │
                                    ▼
                              Alertmanager ──→ уведомления
                                    │
                                    ▼
                              Grafana ──→ дашборды
```

## Ключевые концепции

- **Pull model** — Prometheus сканирует targets (сервисы) по расписанию
- **Metrics endpoint** — сервис отдаёт метрики по HTTP (`GET /metrics`)
- **PromQL** — язык запросов для аггрегации метрик
- **Labels** — ключи для фильтрации (service, method, status)
- **Alertmanager** — компонент для отправки алертов (Slack, PagerDuty, email)
- **Exporters** — готовые сборщики метрик (PostgreSQL, Kafka, Node)

## Пример метрики

```
http_requests_total{method="POST", service="orders", status="200"} 1423
http_requests_total{method="GET", service="orders", status="404"} 12
```

## Альтернативы

| Альтернатива | Когда выбрать |
|-------------|---------------|
| Graphite | Простые метрики, без алертов, legacy |
| InfluxDB | Time-series данные, агенгная модель |
| Datadog | SaaS, платно, но не нужно администрировать |

## Для аналитика

Prometheus — стандарт мониторинга. Аналитик специфицирует: какие метрики (RED: Rate, Errors, Duration), какие labels, пороги алертов. Не требует понимания администрирования, но нужно знать, что это за компонент и какие дашборды строить.
