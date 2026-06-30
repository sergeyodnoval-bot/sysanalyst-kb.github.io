---
id: diameter
title: Diameter — базовый протокол Telecom
sidebar_label: Diameter
type: technology
tech_type: protocol
level: 4
tags: [telecom, diameter, protocol, sso7, network, 3gpp]
official_url: https://datatracker.ietf.org/doc/html/rfc6733
version: "RFC 6733"
requires_articles: [specialization/telecom-bss-oss, specialization/telecom-billing]
used_in_tasks: [telecom-design-billing, telecom-oss-integration]
alternatives: [ss7, radius, http2]
---

Diameter — протокол аутентификации, авторизации и тарификации в Telecom и IP-сетях. Замена RADIUS и SS7 в современных сетях.

**Ключевые приложения Diameter:**

| Приложение | Назначение | Использование |
|-----------|------------|---------------|
| **Ro** | Online charging | OCS ↔ PGW (pre-paid) |
| **Rf** | Offline charging | OCS → Billing (post-paid) |
| **Sh** | Доступ к HSS | IMS, VoLTE |
| **S6a/S6d** | 4G/5G аутентификация | MME ↔ HSS |
| **Gx** | Policy control | PCRF ↔ PGW |
| **Gy** | Credit control | OCS ↔ PGW (pre-paid) |

**Типовое использование (pre-paid data):**

```
1. PGW → OCS (Diameter Ro): «Сколько денег?»
2. OCS → PGW (Diameter Gy): «Квота 500 МБ»
3. PGW разрешает интернет
4. Когда квота кончилась → PGW → OCS: «Ещё?»
```

**Протокол:** Diameter основан на AVPs (Attribute-Value Pairs), работает поверх TCP/SCTP, поддерживает TLS и DTLS для безопасности.

**Для аналитика:** при интеграции BSS с сетью нужно знать, какие Diameter-приложения использует MNO. Ro — для pre-paid, Rf — для post-paid, Sh — для HSS/HLR. Замена SS7 на Diameter — ключевая задача модернизации Telecom.

**Ссылки:** [IETF RFC 6733 (Diameter Base)](https://datatracker.ietf.org/doc/html/rfc6733), [3GPP TS 29.xxx]
