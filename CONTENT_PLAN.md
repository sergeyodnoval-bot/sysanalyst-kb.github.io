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
| 5 | Функциональные требования (детально) | 🔜 | REQ-1 | REQ-6 | `jira`, `confluence` | `write-user-story` |
| 6 | Нефункциональные требования (NFR) | 🔜 | REQ-1 | REQ-7, ARC-1 | — | `analyze-nfr` |
| 7 | Приоритизация требований (MoSCoW, Kano, RICE) | 🔜 | REQ-1 | — | `jira` | `prioritize-backlog` |
| 8 | Use Cases (формальные) | ⏳ | REQ-3 | REQ-4, MOD-2 | — | `write-use-case` |
| 9 | User Story Mapping | ⏳ | REQ-3 | — | `miro`, `jira` | — |
| 10 | Acceptance Criteria (детально) | ⏳ | REQ-3, REQ-4 | — | — | `write-user-story` |
| 11 | Валидация требований | ⏳ | REQ-1 | — | — | — |
| 12 | Управление изменениями требований | ⏳ | REQ-1 | — | `jira` | — |

#### L2 — Strong Junior (level: 3–4)

| # | Статья | Статус | Prereq | Tech | Tasks |
|---|--------|--------|--------|------|-------|
| 13 | SRS — Software Requirements Specification | ⏳ | REQ-1, REQ-3, REQ-4 | `confluence` | `elicit-requirements` |
| 14 | Трассировка требований | ⏳ | REQ-1 | `jira` | — |
| 15 | Decision Log | 💡 | REQ-1 | `confluence` | `write-adr` |

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
| 4 | Фасилитация встреч | ⏳ | SFT-3 | `facilitate-workshop` |
| 5 | Деловая переписка и коммуникация | ⏳ | SFT-1 | — |
| 6 | Техники воркшопов | ⏳ | SFT-4 | `facilitate-workshop` |
| 7 | Переговоры и работа с возражениями | ⏳ | SFT-1, SFT-5 | — |

#### L3 — Middle (level: 5–6)

| # | Статья | Статус | Prereq |
|---|--------|--------|--------|
| 8 | Менторство для аналитиков | ⏳ | — |
| 9 | Коучинг — базовые техники | 💡 | SFT-8 |

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

### Запланированные

| ID | Название | tech_type | Связанные статьи | Статус |
|----|----------|-----------|-----------------|--------|
| `git` | Git / GitHub | tool | ITB-3 | ✅ |
| `docker` | Docker | technology | ARC-4 | 🔜 |
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
| `grpc` | gRPC | technology | INT-9 | ⏳ |
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
| **Data-аналитик** | DAT-1 → DAT-2 → DAT-3 → DAT-4 → DAT-6 | ⏳ |
| **Solution Architect** | ARC-1 → ARC-2 → ARC-3 → ARC-4 → ARC-9 → MOD-14 | ⏳ |
| **Интегратор (продвинутый)** | INT-2 → INT-3 → INT-4 → INT-11 → INT-12 | ⏳ |
| **Мастер коммуникации** | SFT-1 → SFT-3 → SFT-4 → SFT-6 → SFT-7 | ⏳ |

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

---

## 8. Сводка

| Тип | Существующие | Запланированные (🔜+⏳+💡) | Всего |
|-----|-------------|--------------------------|-------|
| Статьи (docs/) | 24 | 77 | ~101 |
| Технологии (tech/) | 8 | 13 | ~21 |
| Задачи (tasks/) | 6 | 11 | ~17 |
| Треки | 3 | 4 | ~7 |

**Всего единиц контента:** ~153 (полный охват L0–L5)
