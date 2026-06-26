---
id: telecom-oss-integration
title: Интеграция OSS-систем (TM Forum API)
sidebar_label: Интеграция OSS-систем
type: task
level: 7
tags: [telecom, oss, integration, tm-forum, provisioning]
---

## Контекст

Вы — системный аналитик в Telecom-компании. Оператор связи внедряет новую BSS-платформу и нужна интеграция с существующей OSS (Network Inventory + Provisioning). Нужно спроектировать интеграцию по стандартам TM Forum.

**Текущие системы:**
- OSS: Ericsson Provisioning (старая, закрытый API)
- Network Inventory: Huawei U2020
- HLR: Nokia HLR (MAP/SS7)
- OCS: Huawei OCS (Diameter Ro)

**Новая BSS:**
- CRM и Order Management — новое, на микросервисах
- API-стиль: REST (TM Forum Open API)
- Брокер сообщений: Kafka

## Что нужно сделать

1. **Выбор API** — какие TM Forum API использовать для каждого сценария (TMF622, TMF638, TMF639)
2. **Sequence diagram** — поток «Заказ на активацию»: OM → Provisioning → Network → OM
3. **Маппинг статусов** — таблица: статус TM Forum → статус OSS → статус в сети
4. **Async vs Sync** — какие шаги синхронные (ожидание ответа), какие асинхронные (Kafka)
5. **Error handling** — что если Provisioning не ответил за N секунд? Network вернул ошибку?

## Критерии приемки

- [ ] Выбраны 3+ TM Forum API с обоснованием
- [ ] Sequence diagram содержит не менее 7 шагов (BSS → OSS → Network)
- [ ] Маппинг статусов содержит не менее 8 статусов
- [ ] Обосновано, почему выбран async или sync для каждого шага
- [ ] Учтён сценарий таймаута и отката (rollback)
