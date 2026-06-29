# CONTENT_PLAN.md — Полный план контента сайта системного аналитика

## 1. Легенда

### Уровни аналитика (от L0 до L5)

| Уровень | level | Опыт | Название в контенте |
|---------|-------|------|-------------------|
| L0 | 1 | Нулевой, смена профессии | «Балерина» |
| L1 | 2 | 0–1 год | Junior |
| L2 | 3–4 | 1–2 года | Strong Junior |
| L3 | 5–6 | 2–4 года | Middle |
| L4 | 7–8 | 4–7 лет | Senior |
| L5 | 9–10 | 7+ лет | Lead / Architect |

### Домены знаний

| Код | Домен | Раздел docs/ |
|-----|-------|-------------|
| **ITB** | Основы IT | `basics/` |
| **REQ** | Требования | `requirements/` |
| **MOD** | Моделирование | `modeling/` |
| **INT** | Интеграции и API | `integration/` |
| **DAT** | Данные и БД | `data/` |
| **ARC** | Архитектура ПО | `architecture/` |
| **PRO** | Процессы и методологии | `process/` |
| **SFT** | Софт-скиллы | `soft/` |
| **SPC** | Специализации | `specialization/` |

### Статусы

- ✅ **done** — уже написано и закоммичено
- 🔜 **planned** — запланировано, контент готовится
- ⏳ **backlog** — в бэклоге, тема определена
- 💡 **idea** — идея, требуется уточнение

### Обозначения в плане

- **Prereq** → какие статьи нужно прочитать ДО
- **Leads to** → какие статьи открываются ПОСЛЕ
- **Tech** → какие технологии связаны (tech/)
- **Tasks** → какие задачи связаны (tasks/)

---

## 2. Домены знаний

---

### 2.1 ITB — Основы IT (basics/)

Базовые понятия, без которых невозможно понимание IT вообще.
Целевая аудитория: L0 (смена профессии), L1 (junior).

#### L0 — Нулевой уровень (level: 1)

| # | Статья | Статус | Prereq | Leads to | Tech |
|---|--------|--------|--------|----------|------|
| 1 | Что такое программное обеспечение | ✅ | — | ITB-2, ITB-3 | — |
| 2 | Как работает компьютер | ✅ | ITB-1 | ITB-3, ITB-11, ITB-12 | — |
| 3 | Что такое программирование | ✅ | ITB-1, ITB-2 | ITB-4, ITB-18 | — |
| 4 | Кто такой системный аналитик | ✅ | ITB-3 | ITB-5, ITB-8, ITB-14, ITB-16, ITB-17 | — |
| 5 | Клиент-серверная архитектура | ✅ | ITB-4 | ITB-6, ITB-9, ITB-13 | — |
| 6 | Что такое API | ✅ | ITB-5 | ITB-9 | — |
| 7 | Что такое протокол взаимодействия | ✅ | ITB-5 | → INT-1 | `http` |
| 8 | Роли в IT-команде | ✅ | ITB-4 | ITB-9 | — |
| 9 | Один день из жизни SA | ✅ | ITB-6, ITB-8 | → REQ-1 | — |
| 10 | Что такое данные, информация, знания | ✅ | ITB-1 | ITB-15, → DAT-1 | — |
| 11 | Что такое интернет и сеть | ✅ | ITB-2 | ITB-7, → INT-1 | — |
| 12 | Что такое операционная система | ✅ | ITB-2 | ITB-13 | — |
| 13 | Типы приложений (веб/мобайл/десктоп) | ✅ | ITB-5 | → MOD-1, → ARC-1 | — |
| 14 | Жизненный цикл ПО (SDLC) — обзорно | ✅ | ITB-4 | → PRO-1, → REQ-1 | — |
| 15 | Основы баз данных — обзорно | ✅ | ITB-10 | → DAT-1, → DAT-2 | — |
| 16 | Основы тестирования и QA | ✅ | ITB-4 | → REQ-4 | — |
| 17 | Основы документации SA | ✅ | ITB-4, ITB-14 | → REQ-13 | — |
| 18 | Git и контроль версий — обзорно | ✅ | ITB-3 | → tech/git | — |

---

### 2.2 REQ — Требования (requirements/)

#### L1 — Junior (level: 2)

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 1 | Что такое требование | ✅ | ITB-4 | REQ-2, REQ-3 | — | — |
| 2 | Коммуникация со стейкхолдерами | ✅ | REQ-1, ITB-4 | REQ-3 | `confluence` | `elicit-requirements` |
| 3 | User Stories | ✅ | REQ-1, REQ-2 | REQ-4 | `jira` | `write-user-story` |
| 4 | BDD-сценарии и критерии приёмки | ✅ | REQ-3 | → INT-2, MOD-2 | — | — |

**Пропущенные L1–L2:**

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 5 | Функциональные требования (детально) | ✅ | REQ-1 | REQ-6 | `jira`, `confluence` | `write-user-story` |
| 6 | Нефункциональные требования (NFR) | ✅ | REQ-1 | REQ-7, ARC-1 | — | `analyze-nfr` |
| 7 | Приоритизация требований (MoSCoW, Kano, RICE) | ✅ | REQ-1 | — | `jira` | `prioritize-backlog` |
| 8 | Use Cases (формальные) | ✅ | REQ-3 | REQ-4, MOD-2 | — | `write-use-case` |
| 9 | User Story Mapping (требования) | ✅ | REQ-3 | — | `miro`, `jira` | — |
| 10 | Acceptance Criteria (детально) | ✅ | REQ-3, REQ-4 | — | — | `write-user-story` |
| 11 | Валидация требований | ✅ | REQ-1 | — | — | — |
| 12 | Управление изменениями требований | ✅ | REQ-1 | — | `jira` | — |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 13 | SRS — Software Requirements Specification | ✅ | REQ-1, REQ-3, REQ-4 | `confluence` | `elicit-requirements` |
| 14 | Трассировка требований | ✅ | REQ-1 | `jira` | — |
| 15 | Decision Log | ✅ | REQ-1 | `confluence` | `write-adr` |

---

### 2.3 MOD — Моделирование (modeling/)

#### L1 — Junior (level: 2)

| # | Статья | Статус | Prereq | Leads to | Tasks |
|---|--------|--------|--------|----------|-------|
| 1 | Что такое модель и зачем моделировать | ✅ | ITB-5 | MOD-2 | — |
| 2 | Use Case diagram | ✅ | MOD-1, REQ-3 | MOD-3, MOD-5 | `write-use-case` |
| 3 | Sequence diagram | ✅ | MOD-2 | MOD-4, INT-2 | `create-sequence-diagram` |
| 4 | BPMN — базовый уровень | ✅ | ITB-5 | MOD-6 | `model-bpmn-process` |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 5 | ER-диаграммы (Entity-Relationship) | ✅ | DAT-3 | DAT-4 | — | `design-database-schema` |
| 6 | State diagram (UML State) | ✅ | MOD-3 | — | — | — |
| 7 | Class diagram для SA (упрощённо) | ✅ | MOD-2 | — | — | — |
| 8 | BPMN — продвинутый (подпроцессы, события, исключения) | ✅ | MOD-4 | MOD-9 | — | `model-bpmn-process` |
| 9 | C4 — Context diagram | ✅ | MOD-2 | ARC-1 | — | — |
| 10 | C4 — Container diagram | ✅ | MOD-9 | ARC-2 | `drawio` | — |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 11 | User Story Mapping | ✅ | MOD-6 | — | `miro` | — |
| 12 | Impact Mapping | ✅ | MOD-11 | — | `miro` | — |
| 13 | Data Flow Diagram (DFD) | ✅ | MOD-4 | — | `drawio` | — |
| 14 | UML — Component diagram | ✅ | MOD-7 | — | — | — |

---

### 2.4 INT — Интеграции и API (integration/)

#### L1 — Junior (level: 2)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 1 | HTTP — протокол передачи данных (технология) | ✅ | ITB-7, ITB-5 | — | — |
| 2 | Основы REST API | ✅ | ITB-7, ITB-5, `tech/http` | `postman`, `openapi` | `design-rest-api` |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 3 | Документирование API с OpenAPI | ✅ | INT-2, INT-1 | `openapi`, `swagger-editor`, `swagger-ui` | `design-rest-api` |
| 4 | Проектирование REST API (детально) | ✅ | INT-2, INT-3 | `postman` | `design-rest-api` |
| 5 | Версионирование API | ✅ | INT-4 | — | — |
| 6 | Аутентификация и авторизация в API | ✅ | INT-2 | `postman` | — |
| 7 | SOAP / WSDL для legacy | ✅ | INT-1 | — | — |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 8 | Асинхронное взаимодействие (Message Queue) | ✅ | INT-4 | `rabbitmq`, `kafka` | — |
| 9 | RabbitMQ — очереди сообщений | ✅ | INT-8 | `rabbitmq` | — |
| 10 | Kafka — событийный streaming | ✅ | INT-8 | `kafka` | — |
| 11 | Event-Driven Architecture (введение) | ✅ | INT-8 | — | — |
| 12 | Event Storming | ✅ | INT-11 | `miro` | — |

#### L4 — Senior (level: 7–8)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 13 | Enterprise Integration Patterns | ✅ | INT-11, INT-12 | — | — |
| 14 | API Gateway pattern | ✅ | INT-4, ARC-3 | — | — |
| 15 | Event Storming (продвинутый) | ✅ | INT-12 | `miro` | — |

---

### 2.5 DAT — Данные и БД (data/)

Новый раздел, папка `docs/data/`.

#### L1 — Junior (level: 2)

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 1 | Что такое база данных | ✅ | ITB-10 | DAT-2 | — | — |
| 2 | Основы SQL (SELECT, JOIN, WHERE) | ✅ | DAT-1 | DAT-3 | `postgres`, `dbeaver` | — |
| 3 | JSON и XML — форматы данных | ✅ | ITB-7 | DAT-5 | — | — |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 4 | Нормализация БД | ✅ | DAT-2 | DAT-6 | — | `design-database-schema` |
| 5 | NoSQL — когда и зачем | ✅ | DAT-1 | — | `mongodb` | — |
| 6 | Моделирование данных (ER) | ✅ | MOD-5, DAT-4 | — | `drawio`, `dbeaver` | `design-database-schema` |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 7 | Хранилища данных (DWH) — основы | ✅ | DAT-6 | — | — |
| 8 | ETL — основы | ✅ | DAT-7 | — | — |
| 9 | Миграции данных — стратегии | ✅ | DAT-6 | — | — |
| 10 | API-first design | ✅ | INT-4 | `openapi` | `design-rest-api` |

---

### 2.6 ARC — Архитектура ПО (architecture/)

Новый раздел, папка `docs/architecture/`.

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Leads to | Tasks |
|---|--------|--------|--------|----------|-------|
| 1 | Что такое архитектура ПО | ✅ | ITB-5, INT-2 | ARC-2 | — |
| 2 | Слоистая архитектура (layered) | ✅ | ARC-1 | ARC-3 | — |
| 3 | Монолит vs Микросервисы | ✅ | ARC-2 | ARC-4 | — |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq | Leads to | Tech | Tasks |
|---|--------|--------|--------|----------|------|-------|
| 4 | Микросервисы — базовые паттерны | ✅ | ARC-3 | ARC-5, INT-11 | `docker` | — |
| 5 | CQRS — Command Query Responsibility Segregation | ✅ | ARC-4 | — | — | — |
| 6 | Event-Driven Architecture (детально) | ✅ | ARC-5, INT-12 | — | `kafka` | `design-event-scheme` |
| 7 | SOLID для системного аналитика | ✅ | ARC-1 | — | — | — |
| 8 | ADR — Architecture Decision Records | ✅ | ARC-1 | — | `confluence` | `write-adr` |

#### L4 — Senior (level: 7–8)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 9 | DDD — Domain-Driven Design (введение) | ✅ | ARC-7, ARC-8 | — | — |
| 10 | Hexagonal Architecture (Ports & Adapters) | ✅ | ARC-4 | — | — |
| 11 | Saga pattern — управление транзакциями | ✅ | ARC-5 | `kafka` | — |
| 12 | Strangler Fig — миграция legacy | ✅ | ARC-3 | — | — |

#### L4 — Cross-cutting (level: 7–8)

| # | Статья | Статус | Prereq |
|---|--------|--------|--------|
| 13 | Логирование — уровни, форматы, агрегация (ELK, Loki) | ✅ | ARC-4 |
| 14 | Мониторинг и observability — метрики, алерты, дашборды | ✅ | ARC-13 |
| 15 | Distributed Tracing — трассировка запросов между сервисами | ✅ | ARC-14, ARC-4 |
| 16 | Авторизация — RBAC, ABAC, политики доступа | ✅ | INT-6 |
| 17 | Resilience patterns — circuit breaker, retry, rate limiting | ✅ | ARC-4 |
| 18 | Кэширование — стратегии, Redis, CDN | ✅ | ARC-4 |

---

### 2.7 PRO — Процессы и методологии (process/)

Новый раздел, папка `docs/process/`.

#### L1 — Junior (level: 2)

| # | Статья | Статус | Prereq | Tech |
|---|--------|--------|--------|------|
| 1 | SDLC — модели жизненного цикла ПО | ✅ | ITB-4 | — |
| 2 | Scrum — основы (фреймворк) | ✅ | PRO-1 | `scrum`, `jira` |
| 3 | Kanban — основы | ✅ | PRO-1 | `jira` |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 4 | Scrum — роли, артефакты, события (детально) | ✅ | PRO-2 | `jira` | — |
| 5 | Оценка задач (story points, t-shirt sizing) | ✅ | REQ-3 | `jira` | — |
| 6 | Ретроспективы — техники и фасилитация | ✅ | PRO-4, SFT-3 | — | — |
| 7 | Требования в Agile | ✅ | REQ-3, PRO-2 | `jira`, `confluence` | — |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 8 | BABOK — обзор для системного аналитика | ✅ | REQ-1 | — | — |
| 9 | Управление требованиями (Requirements Management) | ✅ | REQ-1, REQ-12 | `jira` | — |
| 10 | Анализ стейкхолдеров (Power/Interest Grid) | ✅ | REQ-2 | — | `conduct-stakeholder-interview` |
| 11 | Cost-Benefit Analysis (CBA) | ✅ | REQ-1 | — | — |
| 12 | Управление рисками | ✅ | PRO-1 | — | — |

---

### 2.8 SFT — Софт-скиллы (soft/)

Новый раздел, папка `docs/soft/`.

#### L1 — Junior (level: 2)

| # | Статья | Статус | Prereq | Leads to | Tasks |
|---|--------|--------|--------|----------|-------|
| 1 | Что такое soft skills и зачем они аналитику | ✅ | — | SFT-2 | — |
| 2 | Критическое мышление | ✅ | SFT-1 | SFT-4 | — |
| 3 | Деловая переписка и презентации | ✅ | SFT-1 | SFT-7 | — |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Tasks |
|---|--------|--------|--------|-------|
| 4 | Фасилитация встреч | ✅ | SFT-3 | `facilitate-workshop` |
| 5 | Деловая переписка и коммуникация | ✅ | SFT-1 | — |
| 6 | Техники воркшопов | ✅ | SFT-4 | `facilitate-workshop` |
| 7 | Переговоры и работа с возражениями | ✅ | SFT-1, SFT-5 | — |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq |
|---|--------|--------|--------|
| 8 | Менторство для аналитиков | ✅ | — |
| 9 | Коучинг — базовые техники | ✅ | SFT-8 |

---

### 2.9 SPC — Специализации (specialization/)

Новый раздел, папка `docs/specialization/`.

#### L2 (level: 3–4)

| # | Статья | Статус | Prereq |
|---|--------|--------|--------|
| 1 | Бизнес-аналитик vs Системный аналитик | ✅ | ITB-4 |

#### L3 (level: 5–6)

| # | Статья | Статус | Prereq |
|---|--------|--------|--------|
| 2 | Путь Data-аналитика | ✅ | DAT-6 |
| 3 | Путь Solution-архитектора | ✅ | ARC-9, MOD-14 |
| 4 | Отраслевая аналитика (FinTech, Retail, Logistics) | ✅ | — |

#### L4 (level: 6–7)

| # | Статья | Статус | Prereq |
|---|--------|--------|--------|
| 5 | AI-аналитик — введение и роль | ✅ | ITB-7, DAT-6 |
| 6 | Основы ML для аналитика | ✅ | ITB-7, DAT-6 |
| 7 | EDA — разведочный анализ данных | ✅ | SPC-6 |
| 8 | AI-аналитик — сбор требований для ML-систем | ✅ | REQ-3, SPC-5 |
| 9 | AI-аналитик — данные для ML: качество, разметка, пайплайны | ✅ | DAT-6, SPC-5 |
| 10 | AI-аналитик — метрики ML-продуктов | ✅ | SPC-5 |
| 11 | AI-аналитик — LLM, RAG и промпт-инжиниринг | ✅ | INT-8, SPC-5 |
| 12 | AI-аналитик — этика, bias и регуляторика ИИ | ✅ | SPC-5 |
| 13 | AI-аналитик — архитектура AI-решений (MLOps, feature store) | ✅ | ARC-7, SPC-5 |
| 14 | AI-агенты — введение и архитектура | ✅ | SPC-11, SPC-13 |
| 15 | Мультиагентные системы — паттерны, оркестрация | ✅ | SPC-14 |
| 16 | MCP — Model Context Protocol для подключения инструментов | ✅ | SPC-14, SPC-11 |
| 17 | Разработка AI-агентов — скилы, LSP, best practices | ✅ | SPC-14, SPC-16 |
| 18 | **FinTech-аналитик — путь в финтех** | ✅ | — |
| 19 | **Платёжные системы — как работают переводы** | ✅ | SPC-18 |
| 20 | **Регуляторика в FinTech — ЦБ, 115-ФЗ, PCI DSS, PSD2** | ✅ | SPC-19 |
| 21 | **Платёжные протоколы — ISO 8583, ISO 20022** | ✅ | SPC-19 |
| 22 | **Double-entry ledger — бухгалтерский учёт в коде** | ✅ | SPC-19, SPC-20 |
| 23 | **Сверка (reconciliation) — выявление расхождений** | ✅ | SPC-19, SPC-22 |
| 24 | **Open Banking / PSD2 — API, SCA, Berlin Group** | ✅ | SPC-20, SPC-22 |
| 25 | **Фрод-мониторинг — антифрод-системы** | ✅ | SPC-20, SPC-22 |
| 26 | **Кредитный конвейер — loan origination, scoring, amortization** | ✅ | SPC-20, SPC-22 |
| 27 | **E-commerce & Retail — путь аналитика** | ✅ | — |
| 28 | **OMS — Order Management System и статусы заказа** | ✅ | SPC-27 |
| 29 | **Каталог товаров и управление инвентаризацией** | ✅ | SPC-28 |
| 30 | **Ценообразование, промо и скидки** | ✅ | SPC-28 |
| 31 | **Маркетплейсы — модель и интеграции** | ✅ | SPC-28 |
| 32 | **Фулфилмент и логистика в Retail** | ✅ | SPC-28 |
| 33 | **Программы лояльности и кешбэк** | ✅ | SPC-28 |
| 34 | **Retail-аналитика и персонализация** | ✅ | SPC-28, SPC-33 |
| 35 | **Telecom — путь аналитика** | ✅ | — |
| 36 | **BSS/OSS — архитектура Telecom-систем** | ✅ | SPC-35 |
| 37 | **Billing и Charging (online/offline)** | ✅ | SPC-36 |
| 38 | **CRM и Order Management в Telecom** | ✅ | SPC-36 |
| 39 | **Provisioning и активация услуг** | ✅ | SPC-36 |
| 40 | **Регуляторика в Telecom (СОРМ, ПД, лицензии)** | ✅ | SPC-36 |
| 41 | **MVNO — модель виртуальных операторов** | ✅ | SPC-36, SPC-37 |
| 42 | **5G, IoT и новые технологии в Telecom** | ✅ | SPC-36 |
| 43 | **GovTech — путь аналитика в госсекторе** | ✅ | — |
| 44 | **Архитектура ГИС — государственные информсистемы** | ✅ | SPC-43 |
| 45 | **Госуслуги и порталы — проектирование** | ✅ | SPC-44 |
| 46 | **СМЭВ — межведомственное взаимодействие** | ✅ | SPC-44 |
| 47 | **Импортозамещение и реестр ПО** | ✅ | SPC-44 |
| 48 | **Безопасность и аттестация (ФСТЭК, Криптография)** | ✅ | SPC-44 |
| 49 | **Госзакупки (44-ФЗ, 223-ФЗ)** | ✅ | SPC-44 |
| 50 | **ЭДО и документооборот в госсекторе** | ✅ | SPC-44, SPC-48 |
| 51 | **MedTech — путь аналитика в медицине и фарме** | ✅ | — |
| 52 | **ЭМК — электронные медицинские карты** | ✅ | SPC-51 |
| 53 | **МИС — медицинские информационные системы** | ✅ | SPC-51 |
| 54 | **ЛИС — лабораторные информационные системы** | ✅ | SPC-51, SPC-53 |
| 55 | **Фарма — учёт лекарств и маркировка (Честный ЗНАК)** | ✅ | SPC-51 |
| 56 | **Телемедицина и дистанционные консультации** | ✅ | SPC-51, SPC-53 |
| 57 | **PACS / DICOM — медицинские изображения** | ✅ | SPC-53 |
| 58 | **Регуляторика в медицине (323-ФЗ, 152-ФЗ, оборот лекарств)** | ✅ | SPC-51 |
| 59 | **Логистика — путь аналитика** | ✅ | — |
| 60 | **TMS — система управления перевозками** | ✅ | SPC-59 |
| 61 | **Складская логистика и WMS** | ✅ | SPC-59 |
| 62 | **Доставка последней мили и трекинг** | ✅ | SPC-59, SPC-60 |
| 63 | **Маршрутизация и оптимизация** | ✅ | SPC-60 |
| 64 | **ЭДО и документооборот в логистике** | ✅ | SPC-59 |
| 65 | **Интеграции с маркетплейсами и курьерами** | ✅ | SPC-59, SPC-62 |
| 66 | **Аналитика в логистике** | ✅ | SPC-59, SPC-63 |
| 67 | **GameDev — путь аналитика** | ✅ | — |
| 68 | **Архитектура игровых проектов** | ✅ | SPC-67 |
| 69 | **Матчмейкинг и игровые сессии** | ✅ | SPC-67, SPC-68 |
| 70 | **Игровая экономика и баланс** | ✅ | SPC-67 |
| 71 | **Социальные механики и друзья** | ✅ | SPC-67, SPC-69 |
| 72 | **Монетизация (IAP, реклама, подписки)** | ✅ | SPC-67, SPC-70 |
| 73 | **LiveOps — управление живым продуктом** | ✅ | SPC-67, SPC-72 |
| 74 | **Game Analytics** | ✅ | SPC-67, SPC-73 |
| 75 | **Соцсети и контентные платформы — путь аналитика** | ✅ | — |
| 76 | **Лента контента (feed, ranking, рекомендации)** | ✅ | SPC-75 |
| 77 | **Мессенджеры и real-time коммуникации** | ✅ | SPC-75 |
| 78 | **Модерация контента и безопасность** | ✅ | SPC-75 |
| 79 | **Социальный граф и друзья** | ✅ | SPC-75, SPC-77 |
| 80 | **Монетизация соцсетей (реклама, подписки)** | ✅ | SPC-75 |
| 81 | **Платформа контента (видео, музыка, stories)** | ✅ | SPC-75 |
| 82 | **Платформенные механики (API, SDK, маркетплейс приложений)** | ✅ | SPC-75, SPC-81 |

---

## 3. Технологии (tech/)

### Существующие

| ID | Название | tech_type | Связанные статьи (requires_articles) | Статус |
|----|----------|-----------|--------------------------------------|--------|
| `http` | HTTP | technology | ITB-5, ITB-7 | ✅ |
| `openapi` | OpenAPI | standard | INT-2 | ✅ |
| `postman` | Postman | tool | INT-2 | ✅ |
| `scrum` | Scrum | methodology | PRO-2 | ✅ |
| `jira` | Jira | tool | REQ-1, REQ-3 | ✅ |
| `confluence` | Confluence | tool | REQ-1, REQ-3 | ✅ |
| `figma` | Figma | tool | *планируется* | ✅ |
| `browser` | Браузер | tool | ITB-7 | ✅ |
| `llm` | Large Language Model | technology | SPC-5, SPC-9 | ✅ |
| `langchain` | LangChain | tool | SPC-9 | ✅ |
| `huggingface` | Hugging Face | tool | SPC-5, SPC-9 | ✅ |
| `mlflow` | MLflow | tool | SPC-11 | ✅ |
| `vector-database` | Vector Database (Qdrant, Pinecone) | technology | SPC-9 | ✅ |
| `grpc` | gRPC | technology | INT-1 | ✅ |
| `mcp` | MCP — Model Context Protocol | protocol | SPC-14 | ✅ |
| `docker` | Docker | tool | ARC-4 | ✅ |
| `prometheus` | Prometheus | tool | ARC-14 | ✅ |
| `redis` | Redis | technology | ARC-18 | ✅ |
| `iso20022` | ISO 20022 — финансовые сообщения | standard | SPC-19, SPC-21 | ✅ |
| `pci-dss` | PCI DSS — стандарт безопасности карт | standard | SPC-20 | ✅ |
| `swift` | SWIFT — межбанковские сообщения | standard | SPC-19, SPC-21 | ✅ |
| `elasticsearch` | Elasticsearch — поиск и каталог | technology | SPC-29 | ✅ |
| `erp` | ERP-системы (SAP, 1С, Oracle) | system | SPC-28, SPC-32 | ✅ |
| `wms` | WMS — складские системы | system | SPC-32 | ✅ |
| `tmforum` | TM Forum Open API — стандарт Telecom | standard | SPC-36 | ✅ |
| `diameter` | Diameter / HTTP2 — telecom-протоколы | protocol | SPC-36 | ✅ |
| `kubernetes` | Kubernetes — оркестрация контейнеров | tool | ARC-4 | ✅ |
| `smev` | СМЭВ — система межведомственного взаимодействия | system | SPC-46 | ✅ |
| `crypto` | Криптография (УКЭП, PKI, ГОСТ) | technology | SPC-48 | ✅ |
| `astra-linux` | Astra Linux / ГосОС | os | SPC-47 | ✅ |
| `hl7` | HL7 FHIR — медицинский обмен данными | standard | SPC-52, SPC-53 | ✅ |
| `emias` | ЕГИСЗ / ЕМИАС — госмедицина | system | SPC-53 | ✅ |
| `dicom` | PACS / DICOM — медицинские изображения | standard | SPC-57 | ✅ |
| `tms` | TMS — транспортные системы | system | SPC-60 | ✅ |
| `geodata` | Геоданные (Яндекс.Карты, 2GIS, Mapbox) | technology | SPC-63 | ✅ |
| `edi` | EDI — электронный обмен данными | standard | SPC-64 | ✅ |
| `unity` | Unity / Unreal Engine | engine | SPC-68 | ✅ |
| `photon` | Photon / Netcode — мультиплеер | technology | SPC-69 | ✅ |
| `appsflyer` | AppsFlyer / Adjust — mobile analytics | tool | SPC-74 | ✅ |
| `recommendation` | Рекомендательные системы (ML, collaborative filtering) | technology | SPC-76 | ✅ |
| `websocket` | WebSocket / SSE — real-time протоколы | protocol | SPC-77 | ✅ |
| `cdn` | CDN — доставка контента | infrastructure | SPC-81 | ✅ |

### Запланированные

| ID | Название | tech_type | Связанные статьи | Статус |
|----|----------|-----------|-----------------|--------|
| `git` | Git / GitHub | tool | ITB-3 | ✅ |
| `drawio` | draw.io / diagrams.net | tool | MOD-2, MOD-3 | ✅ |
| `miro` | Miro | tool | SFT-6 | 🔜 |
| `swagger-editor` | Swagger Editor | tool | INT-3 | 🔜 |
| `swagger-ui` | Swagger UI | tool | INT-3 | 🔜 |
| `kafka` | Apache Kafka | technology | INT-11, INT-12 | ✅ |
| `rabbitmq` | RabbitMQ | technology | INT-11 | ✅ |
| `postgres` | PostgreSQL | technology | DAT-1, DAT-2 | ⏳ |
| `mongodb` | MongoDB | technology | DAT-5 | ⏳ |
| `dbeaver` | DBeaver / DataGrip | tool | DAT-2 | ⏳ |
| `graphql` | GraphQL | technology | INT-8 | ⏳ |
| `newman` | Newman (CLI для Postman) | tool | INT-4 | ⏳ |

---

## 4. Задачи (tasks/)

### Существующие

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `design-rest-api` | Проектирование REST API | 2 | INT-2, INT-3, REQ-1 | `openapi`, `postman` | ✅ |
| `conduct-stakeholder-interview` | Интервью со стейкхолдером | 3 | REQ-1, REQ-2 | — | ✅ |
| `find-analyst-in-team` | Найти аналитика в команде | 1 | ITB-4 | — | ✅ |
| `describe-system-to-friend` | Объяснить систему «ребёнку» | 1 | ITB-5 | — | ✅ |
| `elicit-requirements` | Сбор требований у стейкхолдера | 2 | REQ-1, REQ-2 | `confluence` | ✅ |
| `write-user-story` | Написание user story | 1 | REQ-3, REQ-4 | `jira` | ✅ |

### FinTech

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `fintech-design-payment` | Проектирование платёжной интеграции (BNPL) | 6 | SPC-18, SPC-19 | `iso20022`, `swift` | ✅ |
| `fintech-reconciliation` | Проектирование системы сверки | 6 | SPC-23 | — | ✅ |
| `fintech-pci-checklist` | PCI DSS compliance checklist для платёжного шлюза | 6 | SPC-20 | `pci-dss` | ✅ |

### E-commerce / Retail

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `ecommerce-design-catalog` | Проектирование каталога товаров | 6 | SPC-29 | `elasticsearch` | ✅ |
| `ecommerce-oms-flow` | Проектирование OMS (статусы и переходы) | 6 | SPC-28 | — | ✅ |
| `ecommerce-loyalty` | Проектирование программы лояльности | 6 | SPC-33 | — | ✅ |

### Telecom

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `telecom-design-billing` | Проектирование биллинговой модели | 6 | SPC-37 | — | ✅ |
| `telecom-oss-integration` | Интеграция OSS-систем (TM Forum API) | 6 | SPC-36 | `tmforum` | ✅ |
| `telecom-compliance` | Чек-лист соответствия регулятору (СОРМ) | 6 | SPC-40 | — | ✅ |

### GovTech / Госсектор

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `gov-design-service` | Проектирование госуслуги | 6 | SPC-45 | — | ✅ |
| `gov-smev-integration` | Интеграция через СМЭВ | 6 | SPC-46 | `smev` | ✅ |
| `gov-security-audit` | Чек-лист аттестации ГИС (ФСТЭК) | 6 | SPC-48 | `crypto`, `astra-linux` | ✅ |

### MedTech / Медицина

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `medtech-design-emk` | Проектирование электронной медкарты (ЭМК) | 6 | SPC-52 | `hl7`, `emias` | ✅ |
| `medtech-lis-integration` | Интеграция ЛИС с МИС | 6 | SPC-54 | `hl7` | ✅ |
| `medtech-compliance` | Чек-лист соответствия 323-ФЗ | 6 | SPC-58 | — | ✅ |

### Logistics / Логистика

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `logistics-design-delivery` | Проектирование системы доставки | 6 | SPC-62 | `geodata` | ✅ |
| `logistics-integration-courier` | Интеграция с курьерской службой | 6 | SPC-65 | `edi` | ✅ |
| `logistics-optimization` | Оптимизация маршрутов доставки | 6 | SPC-63 | — | ✅ |

### GameDev

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `gamedev-design-economy` | Проектирование игровой экономики | 6 | SPC-70 | — | ✅ |
| `gamedev-matchmaking-flow` | Проектирование матчмейкинга | 6 | SPC-69 | `photon` | ✅ |
| `gamedev-liveops` | Проектирование LiveOps-кампании | 6 | SPC-73 | `appsflyer` | ✅ |

### Соцсети / Контентные платформы

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `socnet-design-feed` | Проектирование ленты контента | 6 | SPC-76 | `recommendation` | ✅ |
| `socnet-moderation-flow` | Проектирование системы модерации | 6 | SPC-78 | — | ✅ |
| `socnet-recommendations` | Проектирование рекомендательной системы | 6 | SPC-76 | `recommendation`, `mlflow` | ✅ |

### Запланированные

| ID | Название | difficulty | requires_articles | requires_tech | Статус |
|----|----------|-----------|-------------------|---------------|--------|
| `write-use-case` | Написание use case | 2 | MOD-2, REQ-3 | — | 🔜 |
| `model-bpmn-process` | Смоделировать процесс в BPMN | 2 | MOD-4 | `drawio` | 🔜 |
| `create-sequence-diagram` | Нарисовать sequence diagram | 2 | MOD-3 | `drawio` | 🔜 |
| `design-database-schema` | Спроектировать схему БД | 2 | DAT-4, DAT-6 | `dbeaver`, `drawio` | ⏳ |
| `analyze-nfr` | Собрать и специфицировать NFR | 3 | REQ-6 | `confluence` | ⏳ |
| `prioritize-backlog` | Приоритизировать бэклог | 2 | REQ-7 | `jira` | ⏳ |
| `facilitate-workshop` | Провести воркшоп | 3 | SFT-4, SFT-6 | `miro`, `figma`, `confluence` | ⏳ |
| `write-openapi-spec` | Написать OpenAPI-спецификацию | 2 | INT-3 | `openapi`, `swagger-editor` | 🔜 |
| `integrate-two-systems` | Проектирование интеграции двух систем | 3 | INT-4, INT-11, ARC-9 | — | ✅ |
| `frame-ml-problem` | Формулировка ML-задачи | 4 | SPC-5, SPC-6 | — | ✅ |
| `define-ml-metrics` | Определение метрик ML-продукта | 4 | SPC-8 | — | ✅ |
| `design-rag-pipeline` | Проектирование RAG-пайплайна | 5 | SPC-9, SPC-11, SPC-7 | `llm`, `langchain`, `vector-database` | ✅ |
| `design-agent-system` | Проектирование AI-агента для продакшна | 5 | SPC-14, SPC-15, SPC-16, SPC-17 | `mcp` | ✅ |
| `write-adr` | Зафиксировать архитектурное решение | 3 | ARC-8 | `confluence` | ⏳ |
| `design-event-scheme` | Спроектировать событийную схему | 4 | INT-11, ARC-6 | `kafka` | ⏳ |

---

## 5. Треки обучения (paths/)

### Существующие

| Трек | Состав | Статус |
|------|--------|--------|
| **Junior SA** | ITB-5 → ITB-7 → MOD-4 → INT-2 → INT-3 | ✅ |
| **API-интегратор** | ITB-7 → INT-2 → INT-3 | ✅ |
| **Аналитик требований** | REQ-1 → REQ-2 → REQ-3 → REQ-4 | ✅ |

### Запланированные

| Трек | Состав (уровни) | Статус |
|------|----------------|--------|
| **Data-аналитик** | DAT-1 → DAT-2 → DAT-3 → DAT-4 → DAT-6 | ✅ |
| **Solution Architect** | ARC-1 → ARC-2 → ARC-3 → ARC-4 → ARC-9 → MOD-14 | ✅ |
| **AI / ML Analyst** | SPC-5 → SPC-6 → SPC-7 → SPC-8 → SPC-9 → SPC-10 → SPC-11 | ✅ |
| **Senior SA** | REQ-9–15, SFT-4–9, PRO-8–12 | ✅ |
| **Lead SA** | SFT-4, SFT-7–9, PRO-8–10, PRO-12, SPC-1–4 | ✅ |
| **E-commerce / Retail** | SPC-27–34: путь, OMS, каталог, ценообразование, маркетплейсы, фулфилмент, лояльность, аналитика | ✅ |
| **Telecom** | SPC-35–42: путь, BSS/OSS, биллинг, CRM, provisioning, регуляторика, MVNO, 5G/IoT | ✅ |
| **GovTech** | SPC-43–50: путь, ГИС, госуслуги, СМЭВ, импортозамещение, безопасность, закупки, ЭДО | ✅ |
| **MedTech** | SPC-51–58: путь, ЭМК, МИС, ЛИС, фарма, телемедицина, PACS, регуляторика | ✅ |
| **Logistics** | SPC-59–66: путь, TMS, WMS, доставка, маршрутизация, ЭДО, интеграции, аналитика | ✅ |
| **GameDev** | SPC-67–74: путь, архитектура, матчмейкинг, экономика, соцмеханики, монетизация, LiveOps, аналитика | ✅ |
| **Соцсети / Контент** | SPC-75–82: путь, лента, мессенджеры, модерация, соцграф, монетизация, контент, платформа | ✅ |

---

## 6. Граф зависимостей (ключевые связи)

### Краткая карта «что к чему ведёт»

```
ITB-1 (ПО) ──→ ITB-2 (Компьютер) ──→ ITB-3 (Программирование) ──→ ITB-18 (Git)
                │                       │
                ↓                       ↓
          ITB-11 (Сеть)           ITB-4 (Кто такой SA)
                ↓                  /     |      |       \
          ITB-7 (Протокол)        ↓     ↓      ↓        ↓
                ↓           ITB-5(CS) ITB-8  ITB-14   ITB-16
           INT-1 (HTTP)        /  |  \   (Роли)  (SDLC)  (QA)
                               ↓   ↓  ↓        |         |
                           ITB-6  ITB-9 ITB-13 → → →    REQ-4
                           (API) (День) (Типы) |   ↓
                              ↓              MOD-1  ARC-1
                          ITB-9 ───→ REQ-1 ←───┘
                                      /    \
                                     ↓      ↓
                              REQ-2 (Stake)  REQ-3 (US)
                                     |         |
                                     ↓         ↓
                              REQ-4 (BDD)  MOD-2 (Use Case)
                                              |
                                              ↓
                                         MOD-3 (Sequence)
                                              |
                                              ↓
                                         MOD-4 (BPMN) ──→ MOD-8

ITB-1 ──→ ITB-10 (Данные) ──→ ITB-15 (БД обзор) ──→ DAT-1, DAT-2
                                        ↓
ITB-10 ───────────── DAT-1 ─────────────┘

ITB-2 ──→ ITB-12 (ОС) ──→ ITB-13 (Типы приложений)

ITB-4 ──→ ITB-17 (Документация SA) ──→ REQ-13
ITB-14 (SDLC) ──→ PRO-1, REQ-1
```

### Связи tech → статьи → задачи

```
http ──→ INT-2 ──→ design-rest-api
                           │
openapi ──→ INT-3 ────────┘
postman ──→ INT-2 ────────┘

jira ──→ REQ-3 ──→ write-user-story
              │
confluence ───┘
              │
              └────→ elicit-requirements

scrum ──→ PRO-2 (Scrum основы)
```

---

## 7. Приоритеты на следующие batch'и

| Batch | Фокус | Состав | Статус |
|-------|-------|--------|--------|
| **0** | L0 completion | ITB-10–18: data, network, OS, app types, SDLC, DB overview, testing, documentation, git | 🔜 |
| **1** | L1 requirements | REQ-1–4, tech/jira, tech/confluence, 2 tasks | ✅ готово |
| **2** | L1 modeling + data | MOD-1–3, DAT-1–3, tech/drawio, tasks/model-bpmn, create-sequence-diagram | ✅ готово |
| **3** | L1 processes + soft | PRO-1–3, SFT-1–3, tech/git | ✅ готово |
| **4** | L2 API | INT-4–7, tasks/write-openapi-spec | ✅ готово |
| **5** | L2 modeling | MOD-5–10, tech/drawio, tasks/design-database-schema | ✅ готово |
| **6** | L2 architecture | ARC-1–3, tasks/integrate-two-systems | ✅ готово |
| **7** | L2 processes | PRO-4–7, tech/miro | ✅ готово |
| **8** | L3 integration | INT-8–12, tech/kafka, tech/rabbitmq | ✅ готово |
| **9** | L3 architecture + modeling | ARC-4–8, MOD-11–14 | ✅ готово |
| **10** | L3 processes + data | PRO-8–12, DAT-7–10 | ✅ готово |
| **11** | L4+ | ARC-9–12, INT-13–15, SPC-1–4 | ✅ готово |
| **12** | AI / ML Analyst | SPC-5–13: AI-аналитик (введение, ML basics, EDA, ML-требования, данные, метрики, LLM, этика, MLOps) + tech/llm, langchain, huggingface, mlflow, vector-database, grpc + tasks/frame-ml-problem, define-ml-metrics, design-rag-pipeline | ✅ готово |
| **13** | AI-агенты | SPC-14–17: введение, мультиагентность, MCP, разработка агентов + tech/mcp + task/design-agent-system | ✅ готово |
| **14** | Cross-cutting (системные компоненты) | ARC-13–18: логирование, мониторинг, tracing, авторизация, resilience, кэширование + tech/docker, prometheus, redis | ✅ готово |
| **15** | FinTech-специализация | SPC-18–26: путь, платежи, регуляторика, протоколы, ledger, сверка, Open Banking, фрод, кредиты + tech/iso20022, pci-dss, swift + tasks/fintech-design-payment, fintech-reconciliation, fintech-pci-checklist + FinTech-трек | ✅ готово |
| **16** | E-commerce / Retail | SPC-27–34: путь, OMS, каталог, ценообразование, маркетплейсы, фулфилмент, лояльность, аналитика + tech/elasticsearch, erp, wms + tasks/ecommerce-design-catalog, ecommerce-oms-flow, ecommerce-loyalty + Retail-трек | ✅ готово |
| **17** | Telecom | SPC-35–42: путь, BSS/OSS, биллинг, CRM, provisioning, регуляторика, MVNO, 5G/IoT + tech/tmforum, diameter, kubernetes + tasks/telecom-design-billing, telecom-oss-integration, telecom-compliance + Telecom-трек | ✅ готово |
| **18** | GovTech / Госсектор | SPC-43–50: путь, ГИС, госуслуги, СМЭВ, импортозамещение, безопасность, закупки, ЭДО + tech/smev, crypto, astra-linux + tasks/gov-design-service, gov-smev-integration, gov-security-audit + GovTech-трек | ✅ готово |
| **19** | MedTech / Медицина | SPC-51–58: путь, ЭМК, МИС, ЛИС, фарма, телемедицина, PACS, регуляторика + tech/hl7, emias, dicom + tasks/medtech-design-emk, medtech-lis-integration, medtech-compliance + MedTech-трек | ✅ |
| **20** | Logistics / Логистика | SPC-59–66: путь, TMS, WMS, доставка, маршрутизация, ЭДО, интеграции, аналитика + tech/tms, geodata, edi + tasks/logistics-design-delivery, logistics-integration-courier, logistics-optimization + Logistics-трек | ✅ |
| **21** | GameDev | SPC-67–74: путь, архитектура, матчмейкинг, экономика, соцмеханики, монетизация, LiveOps, аналитика + tech/unity, photon, appsflyer + tasks/gamedev-design-economy, gamedev-matchmaking-flow, gamedev-liveops + GameDev-трек | ✅ |
| **22** | Соцсети / Контент | SPC-75–82: путь, лента, мессенджеры, модерация, соцграф, монетизация, контент, платформа + tech/recommendation, websocket, cdn + tasks/socnet-design-feed, socnet-moderation-flow, socnet-recommendations + SocNet-трек | ✅ |

---

## 8. Сводка

| Тип | Существующие | Запланированные (🔜+⏳+💡) | Всего |
|-----|-------------|--------------------------|-------|
| Статьи (docs/) | 76 | 109 (55 + 24 + 24 новых) | ~185 |
| Технологии (tech/) | 30 | 17 (5 + 3 + 9 новых) | ~47 |
| Задачи (tasks/) | 22 | 20 (8 + 3 + 9 новых) | ~42 |
| Треки | 12 | 4 | ~16 |

**Всего единиц контента:** ~303 (полный охват L0–L5 + 8 отраслевых специализаций)
