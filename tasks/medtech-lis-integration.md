---
id: medtech-lis-integration
title: Интеграция ЛИС с МИС
sidebar_label: Интеграция ЛИС с МИС
level: 6
type: task
tags: [medtech, lis, integration, task]
prerequisites: [specialization/medtech-lis]
related: [tech/hl7]
difficulty: 5
estimated_time: 6
spc: SPC-54
audience: middle
---

:::info[TL;DR]
Спроектировать интеграцию ЛИС с МИС по HL7 FHIR. Описать поток: назначение анализа → регистрация пробы → результат → верификация → запись в ЭМК. Результат: sequence диаграмма, спецификация FHIR-операций, обработка ошибок.
:::

## Контекст

Больница внедряет ЛИС. Лаборатория выполняет 2000+ проб в день. Интеграция с существующей МИС — через HL7 FHIR.

## Что нужно сделать

1. Описать flow-диаграмму: назначение → забор → проба → ЛИС → результат → ЭМК
2. Специфицировать FHIR-запросы:
   - МИС → ServiceRequest (назначение)
   - ЛИС → Observation (результат)
   - ЛИС → DiagnosticReport (отчёт)
3. Описать сценарии ошибок: отмена назначения, потеря пробы, ошибка анализатора
4. Спроектировать обработку автоверификации (70% результатов)
5. Нарисовать sequence diagram для сценария "успешный анализ"

## Результат

- Sequence diagram интеграции (МИС ↔ ЛИС ↔ Анализатор)
- Пример FHIR Request/Response для каждой операции
- Таблица статусов заказа (Order → InProgress → Completed → Error)
- Схема ретраев и timeout'ов

## Критерии приемки

- Поток интеграции описан end-to-end
- 2+ сценария ошибок с обработкой
- FHIR-спецификация для ServiceRequest, Observation, DiagnosticReport
- Sequence diagram отражает синхронные/асинхронные вызовы
