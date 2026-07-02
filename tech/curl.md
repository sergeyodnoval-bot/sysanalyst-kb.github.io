id: curl
audience: junior
title: "cURL"
sidebar_label: cURL
type: technology
tech_type: tool
category: integration
tags: [http, api, cli, testing, tool]
official_url: "https://curl.se/"
vendor: "Open Source (Daniel Stenberg)"
license: "Open Source (MIT-like)"
first_seen: 1996
requires_articles: [basics/what-is-api, integration/api-rest-basics]
used_in_tasks: [design-rest-api]
alternatives: [postman, httpie]
difficulty: 1
estimated_time: 10

# cURL

cURL — это консольная утилита для передачи данных по различным протоколам. Аналитики используют её для быстрой проверки API, отладки запросов и демонстрации примеров в документации.

## Для чего используется

- Отправка HTTP-запросов (GET, POST, PUT, DELETE)
- Проверка REST API из командной строки
- Тестирование аутентификации и заголовков
- Загрузка и выгрузка файлов
- Демонстрация примеров в документации

## Ключевые концепции

### Базовый синтаксис

```bash
curl [options] <URL>
```

### Основные опции

| Опция | Описание | Пример |
|-------|----------|--------|
| `-X` | HTTP-метод | `curl -X POST ...` |
| `-H` | Заголовок | `curl -H "Content-Type: application/json"` |
| `-d` | Тело запроса | `curl -d '{"key":"value"}'` |
| `-i` | Показать заголовки ответа | `curl -i https://api.example.com` |
| `-v` | Подробный вывод | `curl -v https://api.example.com` |
| `-o` | Сохранить в файл | `curl -o output.json https://api.example.com` |

### Примеры

**GET-запрос:**
```bash
curl https://api.github.com/users/octocat
```

**POST с JSON:**
```bash
curl -X POST https://api.example.com/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token123" \
  -d '{"title": "Новая задача", "status": "todo"}'
```

**Проверка заголовков ответа:**
```bash
curl -i -X GET https://api.example.com/users
```

### Зачем аналитику cURL

- Быстро проверить, работает ли API (без открытия Postman)
- Показать разработчику точный запрос: «Вот что я отправляю, вот что получаю»
- Включить примеры запросов в документацию
- Автоматизировать проверку API (скрипты, CI)

## Когда использовать

- Нужно быстро проверить эндпоинт
- Документируете примеры запроса/ответа
- Пишете автотесты для API (bash скрипты)
- Сервер без GUI (SSH-доступ)

## Когда НЕ использовать

- **Сложные сценарии с несколькими шагами** — Postman лучше (коллекции, переменные)
- **Визуальный просмотр ответов** — Postman или Insomnia
- **Командная работа с API** — Postman Collections / Swagger

## Как начать

1. Проверьте, установлен ли cURL: `curl --version`
2. Выполните `curl https://jsonplaceholder.typicode.com/posts/1`
3. Попробуйте `curl -i https://jsonplaceholder.typicode.com/posts` — посмотрите заголовки
4. Отправьте POST: `curl -X POST https://jsonplaceholder.typicode.com/posts -H "Content-Type: application/json" -d '{"title":"test","body":"test","userId":1}'`
5. Посмотрите разницу: `-v`, `-i`, `-o /dev/null`

## Ссылки

- [Официальный сайт](https://curl.se/)
- [Документация](https://curl.se/docs/)
- [curl tutorial](https://curl.se/docs/manual.html)
