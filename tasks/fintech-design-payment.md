---
id: fintech-design-payment
title: Спроектировать платёжную интеграцию
sidebar_label: Проектирование платёжной интеграции
type: task
category: specialization
difficulty: 4
estimated_time: 180
requires_articles: [specialization/fintech-payments, specialization/fintech-protocols, integration/api-design-detailed]
requires_tech: [openapi, iso20022, swift]
deliverables:
  - Sequence diagram (happy path + 2 error paths)
  - API-спецификация (5+ эндпоинтов)
  - Таблица статусов заказа
  - Схема БД (сущности и связи)
  - Описание обработки ошибок
context: |
  Вы — системный аналитик в платёжной компании. Клиент (крупный e-commerce) хочет подключить новый способ оплаты — BNPL через партнёра (сервис типа «Долями»). Нужно спроектировать интеграцию.
steps:
  - "Определить участников: User, Checkout, Payment Gateway, BNPL Provider, Merchant API"
  - "Нарисовать sequence diagram для happy path (одобрение BNPL → платёж мерчанту)"
  - "Нарисовать sequence diagram для 2 error paths (отказ BNPL, недоступность BNPL-сервиса)"
  - "Описать API-эндпоинты: запрос на кредит, статус кредита, возврат, уведомление"
  - "Разработать таблицу статусов с переходами (не менее 6 статусов)"
  - "Спроектировать сущности БД: orders, payments, bnpl_schedules, payment_transactions"
  - "Описать обработку ошибок: таймауты, повторные попытки, компенсации (saga)"
  - "Согласовать API-спецификацию с командой BNPL-провайдера"
pitfalls:
  - "Не учтён сценарий refund — как деньги возвращаются пользователю при частичном возврате товара"
  - "Idempotency не заложена с первого дня — двойные списания при повторах запросов"
  - "Нет fallback при недоступности BNPL-провайдера — пользователь теряет способ оплаты"
  - "Статусная модель не покрывает lifecycle BNPL-кредита (4 платежа с просрочками)"
next_tasks: [fintech-reconciliation]
part_of_tracks: [fintech-track]
---

## Контекст

BNPL (Buy Now Pay Later) набирает 30% рынка e-commerce. Крупный e-commerce (5000 заказов/день) хочет подключить его как способ оплаты. Партнёр — BNPL-сервис с REST API.

**Бизнес-требования:**
- Пользователь выбирает BNPL на checkout'е
- BNPL-сервис проводит упрощённый скоринг (soft check)
- Если одобрено — BNPL-сервис платит full amount мерчанту сразу
- Пользователь платит BNPL-сервису 4 равными платежами каждые 2 недели
- Просрочка — пеня 0.5% в день
- Комиссия BNPL-сервиса — 3% от суммы
- Мерчант получает payout каждый день (batch)

## Цель задачи

Спроектировать интеграцию с BNPL-провайдером: от выбора способа оплаты до возврата товара. На выходе — спецификация для команды разработки.

## Пошаговый подход

1. **Анализ участников** — кто с кем взаимодействует
2. **Sequence diagram** — описать happy path (8 шагов)
3. **Sequence diagram** — error path #1 (отказ BNPL)
4. **Sequence diagram** — error path #2 (таймаут BNPL)
5. **API-спецификация** — эндпоинты, request/response, ошибки
6. **Статусная модель** — все состояния PENDING → CLOSED
7. **Схема БД** — таблицы, ключи, связи
8. **Error handling** — таймауты, retry, компенсации

## Критерии выполнения

- [ ] Sequence diagram покрывает happy path и 2 error path
- [ ] API-спецификация содержит не менее 5 эндпоинтов с request/response
- [ ] Таблица статусов полная (все переходы, не менее 6 статусов)
- [ ] Учтён сценарий refund (как деньги возвращаются пользователю)
- [ ] 3+ варианта обработки ошибок с решением
- [ ] Idempotency key предусмотрен для всех идемпотентных эндпоинтов

## Пример хорошего результата

**Sequence diagram (happy path):**
1. User → Checkout: выбор BNPL
2. Checkout → Payment Gateway: запрос BNPL-кредита
3. Payment Gateway → BNPL API: POST /credit/apply
4. BNPL API → Payment Gateway: approved + credit_id
5. Payment Gateway → Merchant API: уведомление об оплате
6. Merchant API → Checkout: подтверждение заказа
7. User ← Checkout: заказ подтверждён
8. Payment Gateway ← BNPL API: settlement (full amount минус комиссия)

## Типичные ошибки

- **Нет idempotency** — повторный запрос создаёт дубликат кредита. Решение: idempotency_key на каждый запрос.
- **Статусная модель не замкнута** — нет статусов для всех состояний BNPL (4 платежа). Решение: 10+ статусов в lifecycle.
- **Нет компенсаций** — кредит одобрен, товар не отгружен, а BNPL уже заплатил. Решение: saga с компенсирующими шагами.
- **Игнорирование SLA** — BNPL API может отвечать 3 секунды, checkout ждать не будет. Решение: async обработка + webhook.

## Связанные материалы

- [Платёжные системы](/docs/specialization/fintech-payments) — 4-сторонняя модель
- [API Design](/docs/integration/api-design-detailed) — проектирование REST API
- [ISO 20022](/tech/iso20022) — стандарт платёжных сообщений
