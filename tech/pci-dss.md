---
id: pci-dss
title: PCI DSS — стандарт безопасности данных карт
sidebar_label: PCI DSS
type: technology
tech_type: standard
category: specialization
tags: [fintech, security, compliance, payments, cards, standard]
official_url: https://www.pcisecuritystandards.org
version: "4.0"
published_date: 2024-03-01
first_seen: 2004
difficulty: 5
estimated_time: 30
requires_articles: [specialization/fintech-regulation, architecture/authorization]
used_in_tasks: [fintech-pci-checklist, fintech-design-payment]
alternatives: []
citation_key: pci_dss40
citation_format: |
  PCI Security Standards Council. PCI DSS v4.0 — Payment Card Industry Data Security Standard.
  URL: https://www.pcisecuritystandards.org
audience: middle
---

:::info TL;DR
PCI DSS (Payment Card Industry Data Security Standard) — стандарт безопасности данных платёжных карт, обязательный для всех, кто обрабатывает, хранит или передаёт данные карт (PAN, CVV, срок действия). Состоит из 12 требований, разделённых на 6 групп. Уровень соответствия зависит от объёма транзакций.
:::

## Для чего используется

- Обеспечение безопасности карточных данных
- Получение сертификации для приёма платежей
- Прохождение аудита (SAQ или ROC)
- Избежание штрафов (до $500K/инцидент)

## Ключевые концепции

**12 требований PCI DSS v4.0:**

| Группа | Требования |
|--------|-----------|
| **1. Защищённая сеть** | Firewall, сегментация сети |
| **2. Безопасные конфигурации** | Безопасные настройки ПО, смена дефолтных паролей |
| **3. Защита данных** | Шифрование PAN, не хранить CVV, токенизация |
| **4. Шифрование передачи** | TLS 1.2+, шифрование в transit |
| **5. Защита от вредоносного ПО** | Антивирус, EDR, регулярные сканирования |
| **6. Безопасная разработка** | SAST, DAST, code review, patch management |
| **7. Контроль доступа** | RBAC, принцип наименьших привилегий |
| **8. Аутентификация** | MFA, уникальные ID |
| **9. Физическая безопасность** | Контроль доступа к серверам, CCTV |
| **10. Мониторинг** | SIEM, алерты, retention логов 12 мес |
| **11. Тестирование** | Pen-test ежегодно, ASV каждые 90 дней |
| **12. Политики** | Документация, обучение, инцидент-менеджмент |

**Уровни соответствия:**

| Уровень | Транзакций/год | Требования |
|---------|---------------|-----------|
| Level 1 | > 6 млн | ROC + QSA-аудит ежегодно |
| Level 2 | 1–6 млн | SAQ D + QSA |
| Level 3 | 20k–1 млн | SAQ B/IP |
| Level 4 | < 20k | SAQ A |

## Когда использовать

- Система принимает, хранит или передаёт карточные данные
- Платёжный шлюз, процессинг, PSP
- E-commerce с приёмом карт
- Mobile wallet

## Когда НЕ использовать

- Система работает только с токенами (без PAN)
- Платежи только через Apple Pay/Google Pay (токенизированы)
- B2B-переводы без карточных данных

## Альтернативы

- **ISO 27001** — общий стандарт ИБ (не заменяет PCI DSS, но дополняет)
- **SOC 2** — контроль процессов (для SaaS-провайдеров)
- **GDPR/152-ФЗ** — защита ПД (не карточных данных)

## Как начать

1. Определить scope CDE (Cardholder Data Environment)
2. Заполнить SAQ (Self-Assessment Questionnaire)
3. Пройти ASV-сканирование (каждые 90 дней)
4. Внедрить требования по шифрованию и контролю доступа
5. Нанять QSA (Qualified Security Assessor) для Level 1

## Ссылки

- [PCI Security Standards Council](https://www.pcisecuritystandards.org) — официальный сайт
- [PCI DSS v4.0 Library](https://www.pcisecuritystandards.org/document_library/) — документация
- [SAQ Instructions](https://www.pcisecuritystandards.org/saq/) — анкеты самооценки
