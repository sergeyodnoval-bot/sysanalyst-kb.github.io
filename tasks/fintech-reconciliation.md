---
id: fintech-reconciliation
title: Спроектировать систему сверки
sidebar_label: Проектирование сверки
type: task
category: specialization
difficulty: 4
estimated_time: 180
requires_articles: [specialization/fintech-reconciliation, specialization/fintech-payments, data/etl-basics]
requires_tech: [iso20022, postgresql, kafka]
deliverables:
  - Схема данных (4+ таблицы с полями и связями)
  - Алгоритм сверки (шаги матчинга, правила)
  - Отчёт по расхождениям (3+ вью)
  - Error handling (3+ сценария)
  - NFR (тайминги, объёмы, SLA)
context: |
  Вы — системный аналитик в платёжном агрегаторе. Клиенты (мерчанты) жалуются на расхождения: их внутренний учёт показывает 1000 транзакций, а в системе агрегатора — 1002. Нужно спроектировать систему сверки (reconciliation) для ежедневной сверки между данными агрегатора и данными банка-эквайера.
steps:
  - "Определить источники данных: БД агрегатора, выписка банка (CSV/XML)"
  - "Спроектировать схему данных: transactions, bank_transactions, reconciliation_results, breaks"
  - "Описать алгоритм матчинга: exact match, amount tolerance, time window"
  - "Определить типы break'ов: missing, mismatch, orphan, duplicate"
  - "Спроектировать dashboard отчётов: сводка, детальный, по мерчантам"
  - "Описать error handling: банк не прислал выписку, формат изменился"
  - "Определить NFR: окно 4 часа, 1 млн транзакций, SLA разрешения break'ов"
pitfalls:
  - "Не учтена разница в часовых поясах — транзакция вечером 23:59 в отчёте за другой день"
  - "Tolerance не задан — копеечные расхождения создают тысячи break'ов"
  - "Нет дедупликации — повторный callback от банка создаёт дубликаты"
  - "Batch-окно слишком маленькое — не успевает обработать 1 млн записей"
next_tasks: [fintech-pci-checklist]
part_of_tracks: [fintech-track]
---

## Контекст

Платёжный агрегатор обрабатывает 1 млн транзакций/день для 500 мерчантов. Банк-эквайрер присылает выписку в формате CSV по SFTP раз в день. Мерчанты жалуются на расхождения в 0.2% транзакций — это 2000 спорных операций в день.

**Бизнес-требования:**
- Сверка — каждую ночь (batch, T+1, окно 4 часа)
- Matching по composite key: сумма + дата + ID мерчанта
- Tolerance ± 0.02 для сумм (покрывает комиссии)
- Time window ± 24 часа
- Dashboard + email notification для break'ов

## Цель задачи

Спроектировать reconciliation engine, который автоматически сверяет транзакции агрегатора и банка, выявляет расхождения и уведомляет ответственных.

## Пошаговый подход

1. **Анализ источников** — структура данных агрегатора и банка (формат, поля, частота)
2. **Схема данных** — 4+ таблицы с ключами, индексами, constraints
3. **Алгоритм матчинга** — exact match по ключу, fuzzy match по сумме
4. **Типы break'ов** — классификация: missing, mismatch, orphan, duplicate
5. **Auto-resolve** — какие break'ы можно закрыть автоматически
6. **Отчёты** — структура dashboard (3+ вью), CSV export
7. **Error handling** — банк не прислал файл, формат изменился, network error
8. **NFR** — объёмы, тайминги, SLA

## Критерии выполнения

- [ ] Алгоритм сверки покрывает 4+ типа расхождений с примерами
- [ ] Схема данных содержит не менее 4 таблиц с полями и связями
- [ ] Отчёт содержит минимум 3 вью (краткий обзор, детальный, по мерчантам)
- [ ] Учтён сценарий: количество совпало, но сумма различается (partial match)
- [ ] Описаны метрики качества сверки: match rate, false positive rate
- [ ] SLA на разрешение break'ов: P0 — 24h, P1 — 72h

## Пример хорошего результата

**Схема данных:**
- `aggregator_transactions` — id, order_id, amount, status, created_at, psp_reference
- `bank_statements` — id, bank_ref, sum, fee, status, statement_date
- `reconciliation_results` — id, agg_tx_id, bank_stmt_id, match_type, status, created_at
- `breaks` — id, result_id, break_type, description, severity, resolved_at

**Алгоритм матчинга:**
1. Match по PSP Reference (строгий) → matched
2. Match по order_id + amount (tolerance ± 0.02) → partial
3. Оставшиеся → break (missing/orphan)

## Типичные ошибки

- **Разница в часовых поясах** — транзакция в 23:59 по Москве = уже следующий день для банка. Решение: time window ± 24 часа.
- **Копеечные расхождения** — комиссии, курсы, округления. Решение: tolerance ± 0.02.
- **Дубликаты** — повторный callback от банка. Решение: idempotency + дедупликация перед сверкой.
- **Изменение формата** — банк обновил формат выписки без уведомления. Решение: schema validation with alert.

## Связанные материалы

- [Reconciliation — полный гайд](/docs/specialization/fintech-reconciliation)
- [ETL для сверки](/docs/data/etl-basics) — загрузка данных
- [Платёжные системы](/docs/specialization/fintech-payments) — что сверяем
