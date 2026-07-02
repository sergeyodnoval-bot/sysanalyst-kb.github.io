---
id: mcp
title: MCP — Model Context Protocol
sidebar_label: MCP
type: technology
tech_type: protocol
category: ai
tags: [ai, agents, mcp, protocol, tools]
requires_articles: [specialization/ai-agents-intro]
official_url: https://modelcontextprotocol.io/
github: https://github.com/modelcontextprotocol/servers
audience: middle
---

# MCP — Model Context Protocol

**MCP (Model Context Protocol)** — открытый протокол для подключения инструментов и источников данных к AI-агентам. Разработан Anthropic для стандартизации взаимодействия LLM с внешними системами.

## Ключевые возможности

- **Tools** — вызываемые функции (чтение файлов, запросы к БД, вызов API)
- **Resources** — данные с URI-адресацией (файлы, БД, API endpoints)
- **Prompts** — шаблоны промптов для типовых задач

## Транспорт

- **STDIO** — локальное подключение через дочерний процесс
- **SSE** — удалённое HTTP-подключение

## Зачем аналитику

MCP — стандарт де-факто для подключения агентов к корпоративным системам. Вместо N интеграций (каждый агент × каждая система) нужно N MCP-серверов. Аналитик специфицирует, какие MCP-серверы нужны, их полномочия и SLA.
