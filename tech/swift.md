---
id: swift
title: SWIFT — межбанковские сообщения
sidebar_label: SWIFT
type: technology
tech_type: standard
category: integration
tags: [fintech, messaging, payments, interbank, swift, standard]
official_url: https://www.swift.com
version: "2025"
published_date: 2024-06-01
first_seen: 1973
difficulty: 4
estimated_time: 25
requires_articles: [specialization/fintech-protocols, specialization/fintech-payments]
used_in_tasks: [fintech-design-payment, fintech-reconciliation]
alternatives: [iso20022, edi]
citation_key: swift_standards
citation_format: |
  SWIFT. SWIFT Standards — MT and MX message formats.
  URL: https://www.swift.com/standards
---

:::info TL;DR
SWIFT (Society for Worldwide Interbank Financial Telecommunication) — глобальная сеть для передачи финансовых сообщений между банками. Используется для международных переводов, выписок, документарных операций. Поддерживает два формата: legacy MT (фиксированные поля) и новый MX (ISO 20022 XML).
:::

## Для чего используется

- Международные банковские переводы
- Подтверждения операций (debit/credit)
- Банковские выписки
- Аккредитивы и гарантии
- Валютный контроль
- Межбанковские расчёты

## Ключевые концепции

- **BIC (Business Identifier Code)** — уникальный код банка в сети SWIFT (8 или 11 символов)
  - `SABRRUMM` = Сбербанк (пример)
  - Первые 4: institution, 5-6: country, 7-8: location, 9-11: branch (опционально)
- **MT (Message Type)** — старый формат сообщений (например, MT103 — клиентский перевод)
- **MX** — новый формат на основе ISO 20022 XML
- **FIN** — основной сервис передачи сообщений (store-and-forward)

**Типовые MT-сообщения для аналитика:**

| MT | Назначение |
|----|-----------|
| MT103 | Customer Credit Transfer — клиентский перевод |
| MT202 | Financial Institution Transfer — межбанковский перевод |
| MT900/910 | Confirmation of Debit/Credit — подтверждение |
| MT940/950 | Statement/Account report — выписка |
| MT101 | Request for Transfer — запрос на перевод |
| MT760 | Guarantee — банковская гарантия |

## Когда использовать

- Международные переводы (cross-border)
- Интеграция с банками через SWIFT FIN
- Документарные операции (аккредитивы, гарантии)
- B2B-платежи с подтверждением

## Когда НЕ использовать

- Локальные переводы (внутри страны) — обычно через НСПС/СБП
- Карточные транзакции — используйте ISO 8583
- Высокочастотные платежи (latency > minutes)
- Микроплатежи (стоимость SWIFT-сообщения ~$0.50)

## Альтернативы

| Стандарт | Описание |
|----------|----------|
| **ISO 20022 (MX)** | Замена MT-форматов, XML |
| **SEPA** | Европейские переводы в евро |
| **СБП (РФ)** | Система быстрых платежей |
| **EDI** | Корпоративный документооборот |

## Как начать

1. Получить BIC-код (через SWIFT)
2. Определить нужные MT/MX сообщения
3. Подключиться к SWIFT через Alliance Access / Cloud
4. Настроить маршрутизацию сообщений
5. Пройти SWIFT certification

## Ссылки

- [SWIFT Standards](https://www.swift.com/standards) — документация по форматам
- [SWIFT ISO 20022](https://www.swift.com/standards/iso-20022) — миграция на MX
- [BIC Search](https://www.swift.com/bsl) — поиск BIC-кодов
