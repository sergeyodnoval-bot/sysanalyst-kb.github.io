---
id: traceability
sidebar_position: 14
title: "Трассировка требований"
sidebar_label: "Трассировка требований"
level: 3
category: requirements
tags: [requirements, l2, junior, traceability, tracking]
prerequisites: [requirements/what-is-requirement]
leads_to: []
related: [requirements/srs, requirements/change-management]
estimated_time: 20
difficulty: 3
---

# Трассировка требований

Трассировка (traceability) — это способность **проследить требование** от источника (интервью, закон) до реализации (код, тест) и обратно.

## Зачем нужна трассировка

- **Полнота** — все ли требования реализованы?
- **Покрытие тестами** — каждое ли требование проверено?
- **Impact analysis** — если требование изменилось, что ещё нужно поменять?
- **Аудит** — регулятор может запросить: «покажите, как это требование реализовано»
- **Релиз** — можно сказать: «требования ID 1–50 реализованы, 51–60 — в следующем релизе»

## Типы связей

```
Источник (интервью, закон, RFC)
    ↓
Требование (REQ-001)
    ↓
Спецификация (FR-001, FR-002)
    ↓
Дизайн / Архитектура (ARC-001)
    ↓
Код (класс, модуль)
    ↓
Тест (TC-001, TC-002)
```

### Forward traceability (прямая)

От источника → к реализации. Проверяет: **всё ли реализовано?**

### Backward traceability (обратная)

От реализации → к источнику. Проверяет: **нет ли лишнего?** (gold-plating).

## Матрица трассировки (RTM)

Requirements Traceability Matrix — таблица, связывающая требования с тестами.

| Req ID | Источник | FR ID | TC ID | Статус |
|--------|----------|-------|-------|--------|
| REQ-001 | Интервью с Ивановым 12.03 | FR-001, FR-002 | TC-01, TC-02 | ✅ Passed |
| REQ-002 | 152-ФЗ ст.6 | FR-003 | TC-03 | ✅ Passed |
| REQ-003 | RFC 8259 (JSON) | FR-004 | TC-04 | ❌ Failed |
| REQ-004 | Протокол №3 от 01.04 | — | — | ⏳ Не реализовано |

## Инструменты

| Инструмент | Как работает |
|-----------|-------------|
| **Jira** | Линковка задач: this issue blocks / is blocked by, relates to |
| **Confluence** | Встроенные ссылки на страницы и задачи |
| **Doors (IBM)** | Enterprise-class traceability (авиация, медицина) |
| **ReQtest** | Agile traceability |
| **Excel / Google Sheets** | RTM вручную (просто, но не масштабируется) |

## Когда обязательна

- **Регулируемые отрасли** — Banking (ЦБ), Medical (FDA), Aviation (DO-178C)
- **Госпроекты** — тендеры требуют полную трассировку
- **Большие команды** — > 50 человек, без traceability хаос

Когда можно без:
- Стартап / MVP
- Небольшая команда (все помнят, что делают)

## Типичные ошибки

- **RTM ради RTM** — таблица есть, но никто её не обновляет
- **Слишком детально** — каждый цикл for связан с требованием (перебор)
- **Нет обратной трассировки** — код есть, а требования нет (gold-plating)
- **RTM в Excel** — живёт отдельно от Jira и Confluence

## Ссылки

- [Requirements Traceability (IIBA BABOK)](https://www.iiba.org/babok-guide/)
- [RTM — подробный гайд (reqtest)](https://reqtest.com/requirements-engineering/requirements-traceability-matrix/)
- [Traceability in Agile — когда и как (medium)](https://medium.com/@michael.tarnowski/requirements-traceability-in-agile-projects-a4e4a8d8c0e1)
- [DO-178C Traceability (aviation)](https://en.wikipedia.org/wiki/DO-178C)
