import React from 'react';
import Link from '@docusaurus/Link';

interface DocInfo {
  title?: string;
  path: string;
}

interface ArticleLinkProps {
  docId: string;
  docsMap: Record<string, DocInfo>;
}

function formatLabel(docId: string): string {
  const map: Record<string, string> = {
    'basics/what-is-data': 'Что такое данные, информация, знания',
    'basics/what-is-network': 'Что такое интернет и компьютерная сеть',
    'basics/what-is-os': 'Что такое операционная система',
    'basics/what-is-app-types': 'Типы приложений: веб, мобайл, десктоп',
    'basics/what-is-sdlc': 'Жизненный цикл ПО (SDLC) — обзорно',
    'basics/what-is-database-basics': 'Основы баз данных — обзорно',
    'basics/what-is-testing': 'Основы тестирования и QA',
    'basics/what-is-sa-documentation': 'Основы документации системного аналитика',
    'basics/git-overview': 'Git и контроль версий — обзорно',
    'basics/what-is-protocol': 'Что такое протокол взаимодействия',
    'basics/client-server': 'Клиент-серверная архитектура',
    'basics/client-server-basics': 'Клиент-серверная архитектура',
    'basics/what-is-software': 'Что такое программное обеспечение',
    'basics/what-is-programming': 'Что такое программирование',
    'basics/who-is-system-analyst': 'Кто такой системный аналитик',
    'basics/how-computer-works': 'Как работает компьютер',
    'basics/what-is-api': 'Что такое API',
    'basics/it-roles': 'Роли в IT-команде',
    'basics/sa-day-in-life': 'Один день из жизни системного аналитика',
    'integration/api-rest-basics': 'Основы REST API',
    'integration/api-openapi': 'Документирование API со спецификацией OpenAPI',
    'modeling/bpmn': 'BPMN — моделирование бизнес-процессов',
    'requirements/what-is-requirement': 'Что такое требование',
    'requirements/stakeholder-communication': 'Коммуникация со стейкхолдерами',
    'requirements/user-stories': 'User Stories',
    'requirements/bdd-scenarios': 'BDD-сценарии и критерии приёмки',
  };
  return map[docId] || docId.split('/').pop() || docId;
}

export default function ArticleLink({docId, docsMap}: ArticleLinkProps): React.ReactElement {
  const doc = docsMap[docId];
  if (!doc) {
    return <span className="badge badge--secondary">{formatLabel(docId)}</span>;
  }
  return <Link to={doc.path}>{doc.title || formatLabel(docId)}</Link>;
}
