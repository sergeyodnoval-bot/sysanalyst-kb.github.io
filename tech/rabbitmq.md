---
id: rabbitmq
title: "RabbitMQ"
sidebar_label: RabbitMQ
type: technology
tech_type: tool
category: integration
tags: [mq, queue, messaging, async, broker]
official_url: "https://www.rabbitmq.com/"
vendor: "VMware / Broadcom"
license: "Open Source (MPL 2.0)"
first_seen: 2007
requires_articles: [integration/async-message-queue]
used_in_tasks: []
alternatives: [kafka, activemq, nats]
difficulty: 3
estimated_time: 20
---

# RabbitMQ

RabbitMQ — брокер сообщений, реализующий протокол AMQP 0-9-1. Используется для асинхронного взаимодействия между сервисами.

## Для чего используется

- Task queues — фоновые задачи (отправка email, генерация отчётов)
- RPC over MQ — синхронные вызовы через очередь
- Event broadcasting — уведомление нескольких сервисов об одном событии
- Work queues — распределение задач между worker'ами

## Ключевые концепции

**Exchange** — точка входа сообщения. Определяет, в какую очередь направить.

**Queue** — буфер сообщений. Consumer читает из очереди.

**Binding** — правило, связывающее exchange с очередью.

**Virtual Host (vhost)** — изолированное окружение в одном RabbitMQ.

## Команды (CLI)

| Команда | Описание |
|---------|----------|
| `rabbitmqctl list_queues` | Список очередей |
| `rabbitmqctl list_exchanges` | Список exchange |
| `rabbitmqctl list_bindings` | Список bindings |
| `rabbitmq-plugins enable rabbitmq_management` | Включить веб-интерфейс |

## Как начать

1. Установите RabbitMQ через `apt`, `brew` или Docker
2. Откройте management UI: `http://localhost:15672`
3. Создайте exchange и очередь
4. Напишите producer и consumer на любом языке

## Ссылки

- [Официальная документация](https://www.rabbitmq.com/documentation.html)
- [RabbitMQ в Docker](https://hub.docker.com/_/rabbitmq)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Management UI](http://localhost:15672) (guest/guest)
