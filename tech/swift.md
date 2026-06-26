---
id: swift
title: SWIFT — межбанковские сообщения
sidebar_label: SWIFT
level: 4
tags: [fintech, messaging, payments, interbank]
---

SWIFT (Society for Worldwide Interbank Financial Telecommunication) — глобальная сеть для передачи финансовых сообщений между банками.

**Ключевые понятия:**

- **BIC (Business Identifier Code)** — уникальный код банка в сети SWIFT (8 или 11 символов)
  - `SABRRUMM` = Сбербанк (пример)
  - Первые 4: institution, 5-6: country, 7-8: location, 9-11: branch (опционально)
- **MT (Message Type)** — старый формат сообщений (например, MT103 — клиентский перевод)
- **MX** — новый формат на основе ISO 20022 XML
- **FIN** — основной сервис передачи сообщений

**Типовые MT-сообщения для аналитика:**

| MT | Назначение |
|----|-----------|
| MT103 | Customer Credit Transfer — клиентский перевод |
| MT202 | Financial Institution Transfer — межбанковский перевод |
| MT900/910 | Confirmation of Debit/Credit — подтверждение |
| MT940/950 | Statement/Account report — выписка |
| MT101 | Request for Transfer — запрос на перевод |
| MT760 | Guarantee — банковская гарантия |

**Для аналитика:** при интеграции с банком через SWIFT нужно знать:
- Банк использует MT или переходит на MX (ISO 20022)
- Какие сообщения поддерживаются для конкретной операции
- Время доставки: MT — несколько часов (store-and-forward), MX — near real-time
- Формат: MT — фиксированная длина полей, MX — XML

**Переход MT → MX:** К 2025 году SWIFT ожидает, что все участники перейдут на ISO 20022. MX-сообщения богаче по данным, поддерживают структурированные адреса, unbounded поля.

**Ссылки:** [SWIFT Standards](https://www.swift.com/standards), [ISO 20022 для SWIFT](https://www.swift.com/standards/iso-20022)
