---
id: fintech-pci-checklist
title: PCI DSS compliance checklist для платёжного шлюза
sidebar_label: PCI DSS compliance checklist
type: task
category: specialization
difficulty: 5
estimated_time: 240
requires_articles: [specialization/fintech-regulation, architecture/authorization, architecture/logging]
requires_tech: [pci-dss]
deliverables:
  - Scope CDE (какие компоненты in-scope)
  - PCI DSS requirements checklist (12 domains)
  - Data flow diagram (с точками шифрования/токенизации)
  - Гэп-анализ (5+ несоответствий)
  - План имплементации (6 месяцев, milestones)
context: |
  Ваша компания разрабатывает платёжный шлюз (payment gateway) — микросервис, который принимает карточные транзакции. CTO сказал: «Нам нужен PCI DSS Level 1». Ваша задача — подготовить checklist требований для команды разработки и инфраструктуры.
steps:
  - "Определить scope CDE — какие микросервисы, БД, очереди попадают в CDE"
  - "Для каждого из 12 требований PCI DSS v4.0 определить, что нужно сделать"
  - "Нарисовать data flow diagram: данные карты от клиента до банка"
  - "Провести гэп-анализ: что текущая система НЕ выполняет (минимум 5)"
  - "Составить план имплементации на 6 месяцев с milestones"
  - "Оценить бюджет: лицензии, инфраструктура, аудит, обучение"
  - "Согласовать план с CTO и security-командой"
pitfalls:
  - "Scope определён слишком широко — все 12 микросервисов in-scope, хотя работают 4"
  - "CVV хранится в логах разработчиков — прямое нарушение req 3.2"
  - "Нет процесса ротации ключей шифрования — req 3.6"
  - "SAQ-D не заполнен — нет формальной процедуры compliance"
next_tasks: []
part_of_tracks: [fintech-track]
---

## Контекст

Платёжный шлюз — 12 микросервисов, Kafka, PostgreSQL, Redis. Обрабатывает 6+ млн транзакций/год (Level 1 → ROC). Команда: 8 разработчиков, 2 DevOps, 1 аналитик. Бюджет на security — $50k.

**Бизнес-требования:**
- PCI DSS Level 1 (ROC + QSA аудит)
- Хранение PAN в зашифрованном виде для recurring payments
- Токенизация для мерчантов (не хранить PAN у них)
- Zero-trust network segmentation

## Цель задачи

Подготовить полный PCI DSS compliance checklist и план достижения Level 1. Аналитик выступает мостом между разработкой, инфраструктурой и security.

## Пошаговый подход

1. **Scoping** — определить, какие сервисы входят в CDE (данные карты), какие out-of-scope
2. **Data flow mapping** — нарисовать путь PAN/CVV от клиента до банка
3. **Requirements checklist** — по каждому из 12 требований: текущий статус, гэп, решение
4. **Гэп-анализ** — что не хватает до PCI DSS v4.0
5. **План имплементации** — 6 месяцев по месяцам с milestones
6. **Бюджет** — лицензии, инструменты, аудит, обучение

## Критерии выполнения

- [ ] CDE scope определён явно: какие сервисы in-scope, какие out-of-scope
- [ ] Checklist покрывает все 12 требований PCI DSS v4.0
- [ ] Data flow diagram описывает путь данных карты с указанием шифрования, токенизации
- [ ] Гэп-анализ содержит не менее 5 несоответствий с предполагаемым решением
- [ ] План имплементации помещается в 6 месяцев с конкретными milestones
- [ ] Бюджет оценён и согласован

## Пример хорошего результата

**Scope CDE:**
- In-scope: Payment Service, Token Vault, Card Storage (with encryption), Kafka (card topics)
- Out-of-scope: User Service, Notification Service, Admin Dashboard, Analytics

**Гэп-анализ (пример):**
| Требование | Текущий статус | Гэп | Решение | Срок |
|-----------|---------------|-----|---------|------|
| Req 3.4 — шифрование PAN | Храним plaintext | CVV тоже хранится | Внедрить AES-256 + токенизацию | Мес 1-2 |
| Req 7 — контроль доступа | 20 dev имеют доступ | Нет RBAC | Внедрить модель ролей | Мес 2 |
| Req 10 — мониторинг | Нет SIEM | Логи не централизованы | Внедрить Wazuh/ELK | Мес 3-4 |

## Типичные ошибки

- **Scope слишком широкий** — все сервисы in-scope = все нужно сертифицировать. Решение: сегментировать сеть, вывести out-of-scope что можно.
- **CVV в логах** — разработчики логируют весь request «для дебага». Решение: masking в логах (show_last_4), запрет на CVV в любой записи.
- **Нет ротации ключей** — ключи шифрования менять раз в год минимум. Решение: KMS + автоматическая ротация.
- **SAQ/ROC не заполняется** — нет процесса. Решение: quarterly review + внешний QSA.

## Связанные материалы

- [Регуляторика в FinTech](/docs/specialization/fintech-regulation) — PCI DSS, 115-ФЗ, ЦБ
- [PCI DSS — стандарт](/tech/pci-dss) — детали требований
- [Авторизация RBAC/ABAC](/docs/architecture/authorization) — контроль доступа
