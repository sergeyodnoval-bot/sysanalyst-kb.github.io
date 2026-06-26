---
id: fintech-open-banking
title: Open Banking / PSD2 — API, SCA, Berlin Group
sidebar_label: Open Banking / PSD2
level: 7
category: specialization
tags: [fintech, open-banking, psd2, psd3, sca, berlin-group, fapi, api]
prerequisites: [specialization/fintech-regulation, integration/api-auth]
leads_to: []
related: [integration/api-design-detailed, integration/api-versioning, architecture/authorization]
estimated_time: 25
difficulty: 6
audience: senior
---

:::info TL;DR
Open Banking — требование регулятора (PSD2 в EU, Open Banking Standard в UK) заставить банки открыть API для третьих сторон. Аналитик должен понимать: какие типы API нужны (AISP, PISP), как работает consent management, что такое SCA (сильная аутентификация), и какие стандарты описывают API (Berlin Group, UK Standard, FAPI).
:::

## Что такое Open Banking

До PSD2: банк хранит данные клиента и сам инициирует платежи.
После PSD2: клиент может дать третьей стороне (финтех-приложению) доступ к своим данным и возможность инициировать платежи.

```
До PSD2:
  Банк ──── все данные и платежи ──── Клиент

После PSD2:
                   ┌──────────────────┐
                   │   Third Party    │
                   │   (FinTech App)  │
                   └────────┬─────────┘
                            │ API (с согласия клиента)
                            ▼
                   ┌──────────────────┐
                   │      Bank        │
                   └────────┬─────────┘
                            │
                            ▼
                       Клиент
```

## Роли в PSD2

| Роль | Что делает | Пример |
|------|-----------|--------|
| **ASPSP** (Account Servicing Payment Service Provider) | Банк, который предоставляет API | Сбер, Альфа-Банк |
| **AISP** (Account Information Service Provider) | Читает данные счета (с согласия клиента) | Приложение для учёта финансов |
| **PISP** (Payment Initiation Service Provider) | Инициирует платёж от имени клиента | Платежный сервис |
| **CISP** (Card Issuer Service Provider) | Работа с карточными данными | Карточный кошелёк |
| **TPP** (Third Party Provider) | Общее название для AISP/PISP/CISP | — |

## API-эндпоинты Open Banking

### Account Information (AISP)

```
GET    /accounts                                    — список счетов
GET    /accounts/{id}/balances                       — остатки
GET    /accounts/{id}/transactions                   — транзакции
GET    /accounts/{id}/beneficiaries                  — получатели
GET    /accounts/{id}/direct-debits                  — прямой дебет
GET    /accounts/{id}/standing-orders                — регулярные платежи
```

### Payment Initiation (PISP)

```
POST   /payments/sepa-credit-transfers              — инициировать SCT
GET    /payments/sepa-credit-transfers/{id}          — статус платежа
POST   /payments/sepa-instant-credit-transfers       — инициировать SCT Inst
POST   /payments/domestic-payments                    — локальный платёж
POST   /payments/file                                — bulk-платежи (файл)
```

### Consent Management

```
POST   /consents                                      — запрос согласия
GET    /consents/{id}                                 — статус согласия
DELETE /consents/{id}                                 — отозвать согласие
```

## SCA — Strong Customer Authentication

SCA требует два factor из трёх:
1. **Knowledge** — что знает клиент (пароль, PIN)
2. **Possession** — что имеет клиент (телефон, карта)
3. **Inherence** — что есть клиент (отпечаток, лицо)

### Когда SCA обязательна

| Сценарий | SCA нужна? |
|----------|-----------|
| Онлайн-платёж > 30 EUR | ✅ Да |
| Доступ к данным счета | ✅ Да (первый раз) |
| Инициация платежа | ✅ Да |
| Платёж < 30 EUR (low-risk) | ❌ Нет (исключение) |
| Подписка на один и тот же merchant | ❌ Нет (recurring) |
| Перевод между своими счетами | ❌ Нет (в одном банке) |

### Исключения (exemptions)

Банк может не требовать SCA в некоторых случаях:
- **Low-value**: < 30 EUR (лимит на 5 попыток или 100 EUR суммарно)
- **Recurring**: фиксированная подписка
- **Corporate**: B2B-платежи (корпоративные карты)
- **Trusted beneficiary**: получатель в белом списке
- **Transaction risk analysis (TRA)**: если банк оценил риск как низкий

**Liability shift:** если мерчант не запросил SCA там, где нужно — ответственность за chargeback на мерчанте.

## Стандарты Open Banking

### Berlin Group NextGenPSD2

Европейский стандарт, самый популярный. Описывает:

- **Restful API** — JSON over HTTPS
- **Стандартизированные эндпоинты** (accounts, payments, consents)
- **Формат ошибок** — единый для всех банков
- **SCA flows** — redirect, decoupled, embedded
- **Сертификация** — тестовый стенд для TPP

**Для аналитика:** Berlin Group — стандарт де-факто в EU. Если банк хочет соответствовать PSD2 — имплементирует Berlin Group API.

### UK Open Banking Standard

Британский стандарт (схожий с Berlin Group, но не идентичный). Особенности:
- Требует FAPI (Financial-grade API) — более строгий security profile
- OAuth 2.0 + OpenID Connect
- Использует JWT для подписи запросов
- Обязательный сертификат (eIDAS QWAC + QSealC)

### FAPI (Financial-grade API)

OAuth 2.0 profile для финансовых API. Отличия от обычного OAuth:
- **Mutual TLS** (mTLS) — двусторонняя аутентификация
- **JWT Secured Authorization Request** (JAR) — подписанный request object
- **JWT Secured Introspection Response** (JWT-RAR)
- **Sender-Constrained Tokens** — токен привязан к TLS-сессии

## Consent management

**Проблема:** как дать TPP доступ к данным клиента, не давая ему логин/пароль от банка?

**Решение:** OAuth 2.0 consent flow:

```
1. Пользователь нажимает «Подключить банк» в FinTech-приложении
2. FinTech → Bank: запрос на consent (какие данные, на сколько)
3. Банк показывает пользователю экран согласия:
   «FinTechApp запрашивает доступ к транзакциям за последние 90 дней»
4. Пользователь подтверждает (SCA)
5. Банк выдаёт access_token FinTech-приложению
6. FinTech → Bank API: GET /accounts/... (с токеном)
```

## Требования к Open Banking API (спецификация)

При проектировании Open Banking API аналитик должен определить:

| Параметр | Пример |
|----------|--------|
| Стандарт | Berlin Group NextGenPSD2 |
| Типы доступа | AISP (read), PISP (write) |
| Период согласия | 90 дней (требование PSD2) |
| SCA flow | Redirect (перенаправление в банк) |
| Security | FAPI, mTLS, JWT |
| Rate limiting | 1000 запросов/мин на TPP |
| Мониторинг | Алерт при аномальном количестве запросов от TPP |

## Ключевые термины

- **PSD2/PSD3** — европейские директивы Open Banking
- **AISP** — сервис чтения данных счета
- **PISP** — сервис инициации платежа
- **SCA** — сильная аутентификация клиента (2FA)
- **Berlin Group** — стандарт API для PSD2
- **FAPI** — Financial-grade API (OAuth 2.0 + mTLS)
- **Consent** — согласие клиента на доступ к данным
- **TPP** — Third Party Provider (финтех-приложение)

## Что дальше

- [Регуляторика в FinTech](/docs/specialization/fintech-regulation) — PSD2, ЦБ, PCI DSS
- [Авторизация — RBAC, ABAC](/docs/architecture/authorization) — consent как авторизация
- [Аутентификация в API](/docs/integration/api-auth) — OAuth 2.0, JWT

## Проверь себя

1. **Какие есть роли в PSD2 и чем они отличаются?**
   *Ответ:* ASPSP (банк), AISP (читает данные), PISP (инициирует платежи), TPP (общее название для AISP/PISP).

2. **Что такое SCA и какие factor'ы используются?**
   *Ответ:* Strong Customer Authentication — 2FA из трёх: знание (пароль/PIN), владение (телефон/карта), биометрия (отпечаток/лицо).

3. **Как работает consent flow в Open Banking?**
   *Ответ:* Пользователь даёт согласие через OAuth 2.0: FinTech → Bank (запрос) → Банк → пользователь (экран согласия) → SCA → access_token → FinTech → Bank API.
