---
id: api-soap-wsdl
sidebar_position: 6
title: SOAP / WSDL для работы с legacy-системами
sidebar_label: SOAP / WSDL
level: 5
category: integration
tags: [soap, wsdl, xml, legacy, integration]
prerequisites: [integration/api-rest-basics]
leads_to: []
related: [integration/api-design-detailed]
estimated_time: 20
difficulty: 4
---

# SOAP / WSDL для работы с legacy-системами

В 2025 году новый проект вряд ли начнут на SOAP. Но банки, страховые, государственные системы и крупные ритейлеры всё ещё используют SOAP-сервисы, написанные 10–15 лет назад. Системный аналитик должен уметь читать WSDL и понимать, как устроен обмен данными в SOAP.

## Чем SOAP отличается от REST

SOAP (Simple Object Access Protocol) и REST решают одну задачу — интеграцию систем — но принципиально разными способами.

| Характеристика | REST | SOAP |
|---------------|------|------|
| Формат данных | JSON (реже XML) | XML (только) |
| Протокол | HTTP | HTTP, SMTP, JMS и другие |
| Транспорт | только HTTP | любой |
| Состояние | Stateless | может быть stateful |
| Описание API | OpenAPI | WSDL |
| Гибкость | высокая | низкая (жёсткий контракт) |

SOAP — это не более "сложный" REST, а принципиально другой подход. REST проектируют вокруг ресурсов, SOAP — вокруг операций.

## Структура SOAP-сообщения

SOAP-запрос — это XML-конверт, в котором есть:

```xml
<?xml version="1.0"?>
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <soap:Header>
    <!-- необязательно: аутентификация, транзакции -->
    <auth:Token xmlns:auth="http://example.com/auth">abc123</auth:Token>
  </soap:Header>
  <soap:Body>
    <GetUser xmlns="http://example.com/users">
      <UserId>42</UserId>
    </GetUser>
    <soap:Fault>
      <!-- если ошибка -->
    </soap:Fault>
  </soap:Body>
</soap:Envelope>
```

- **Envelope** — корневой элемент, обёртка всего сообщения
- **Header** — метаданные (необязательно)
- **Body** — данные запроса или ответа
- **Fault** — информация об ошибке (если она произошла)

## WSDL — контракт SOAP-сервиса

WSDL (Web Services Description Language) — это XML-документ, который описывает, какие операции доступны, какие данные они принимают и возвращают.

**Ключевые секции WSDL:**

- **types** — типы данных (обычно XML Schema)
- **message** — структура запроса и ответа
- **portType** — набор операций (аналог интерфейса)
- **binding** — привязка к протоколу (SOAP over HTTP)
- **service** — адрес сервиса

```xml
<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
  <wsdl:types>
    <xsd:schema>
      <xsd:element name="GetUserRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="UserId" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </wsdl:types>
  <wsdl:portType name="UserService">
    <wsdl:operation name="GetUser">
      <wsdl:input message="GetUserRequest"/>
      <wsdl:output message="GetUserResponse"/>
    </wsdl:operation>
  </wsdl:portType>
</wsdl:definitions>
```

## Как аналитик работает с SOAP

**Читать WSDL.** На практике вам не нужно писать WSDL — их пишут разработчики или генерируют инструменты. Но читать и понимать структуру WSDL необходимо, чтобы:

1. Увидеть, какие операции доступны в сервисе
2. Понять, какие поля обязательны, а какие нет
3. Определить формат дат, чисел и идентификаторов
4. Найти описание ошибок (faults)

**Использовать инструменты.** Для тестирования SOAP-запросов можно использовать:

- **SoapUI** — специализированный инструмент для SOAP
- **Postman** — поддерживает базовые SOAP-запросы
- **Встроенные генераторы** — многие IDE умеют генерировать код по WSDL

**Документировать интеграцию.** При описании интеграции с SOAP-сервисом аналитик фиксирует:

- Какие операции вызываются и в какой последовательности
- Какие данные передаются в каждом запросе
- Как обрабатываются ошибки (timeout, fault, retry)
- Есть ли состояние между вызовами (stateful)

## Когда вы встретите SOAP

- **Банковские системы** — многие банки до сих пор используют SOAP для core-систем
- **Государственные интеграции** — ГИС, СМЭВ, ЕСИА
- **ERP / CRM / BPM** — SAP, Oracle, IBM-решения
- **Транспортные и логистические системы** — некоторые стандарты используют SOAP

## Стратегия работы с legacy SOAP

Если ваша задача — задокументировать или модернизировать интеграцию с SOAP-сервисом:

1. **Найдите WSDL** — обычно он доступен по `?wsdl` или `?singleWsdl`
2. **Импортируйте WSDL в инструмент** — SoapUI или Postman сгенерируют запросы
3. **Протестируйте базовые операции** — убедитесь, что сервис жив
4. **Опишите зависимости** — какие системы обращаются к сервису
5. **Документируйте контракт** — для новых интеграций используйте OpenAPI
6. **Планируйте миграцию** — если сервис устарел

## Ключевые термины

- **SOAP** — протокол обмена структурированными сообщениями в XML
- **WSDL** — язык описания веб-сервисов (контракт SOAP)
- **Envelope** — конверт SOAP-сообщения
- **Fault** — стандартный формат ошибки в SOAP
- **Legacy** — унаследованная система, обычно старая и сложная для изменений

## Что дальше

- **Основы REST API** — вернуться к современному подходу к API
- **Проектирование REST API** — детальный разбор проектирования

## Проверь себя

1. Чем SOAP принципиально отличается от REST?
2. Какие секции обязательно есть в WSDL?
3. В каких сценариях аналитик может встретить SOAP в 2025 году?
