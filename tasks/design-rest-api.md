---
id: design-rest-api
sidebar_position: 1
title: Проектирование REST API
sidebar_label: Проектирование REST API
type: task
category: integration
difficulty: 2
estimated_time: 90
requires_articles:
  - basics/http-protocol
  - basics/client-server
  - integration/api-rest-basics
  - integration/api-openapi
requires_tech:
  - openapi
  - postman
deliverables:
  - OpenAPI-спецификация
  - Sequence diagram основного сценария
  - Таблица endpoint'ов с методами и параметрами
context: |
  Вам нужно спроектировать REST API для системы управления задачами (Task Manager).
  Система должна поддерживать CRUD-операции над задачами, аутентификацию пользователей
  и назначение исполнителей. API будут использовать внешние сервисы.
steps:
  - Определить ресурсы системы (tasks, users, projects)
  - Спроектировать URL-структуру (эндпоинты)
  - Выбрать HTTP-методы для каждого эндпоинта
  - Определить структуру запросов и ответов (JSON)
  - Добавить пагинацию, сортировку и фильтрацию
  - Описать схемы ошибок
  - Настроить аутентификацию (Bearer token)
  - Оформить спецификацию в OpenAPI 3.1
pitfalls:
  - Использование глаголов в URL (вместо /getTasks используйте /tasks)
  - Отсутствие версионирования API
  - Неправильный выбор HTTP-метода (GET для создания)
  - Игнорирование идемпотентности методов
  - Слишком большие ответы без пагинации
next_tasks:
  - write-api-documentation
previous_tasks: []
part_of_tracks:
  - junior-track
  - api-track
---

# Проектирование REST API

**Тип задачи:** Интеграция  
**Уровень:** Strong Junior  
**Оценка времени:** ~90 минут

## Контекст

Вы — системный аналитик в команде, которая разрабатывает систему управления задачами (Task Manager). Система должна предоставлять REST API для внешних интеграций. Ваша задача — спроектировать API и оформить его в виде OpenAPI-спецификации.

## Пошаговый подход

### 1. Определите ресурсы

| Ресурс | Описание | Основные поля |
|---|---|---|
| `tasks` | Задачи | id, title, description, status, assignee, created_at |
| `users` | Пользователи | id, name, email, role |
| `projects` | Проекты | id, name, description, owner |

### 2. Спроектируйте эндпоинты

| Метод | URL | Описание |
|---|---|---|
| GET | `/api/v1/tasks` | Список задач (с пагинацией) |
| POST | `/api/v1/tasks` | Создать задачу |
| GET | `/api/v1/tasks/{id}` | Детали задачи |
| PUT | `/api/v1/tasks/{id}` | Обновить задачу |
| DELETE | `/api/v1/tasks/{id}` | Удалить задачу |
| GET | `/api/v1/projects/{id}/tasks` | Задачи проекта |

### 3. Определите модели данных

```yaml
Task:
  type: object
  properties:
    id:
      type: integer
    title:
      type: string
      maxLength: 200
    description:
      type: string
    status:
      type: string
      enum: [todo, in_progress, done]
    assignee:
      type: integer
      nullable: true
    created_at:
      type: string
      format: date-time
```

### 4. Чек-лист проверки

- [ ] Все эндпоинты используют правильные HTTP-методы
- [ ] URL используют существительные во множественном числе
- [ ] Реализована пагинация (page, per_page, total)
- [ ] Обработка ошибок (400, 401, 404, 500)
- [ ] Версионирование через URL (/api/v1/)
- [ ] Аутентификация через Bearer token
- [ ] OpenAPI-спецификация валидна (нет ошибок)

## Пример результата

После выполнения задачи у вас будет OpenAPI-файл `task-manager-api.yaml` с 5+ эндпоинтами, схемами данных и примерами ответов. Спецификацию можно открыть в Swagger Editor или Postman.
