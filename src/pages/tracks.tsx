import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

interface TrackItem {
  type: 'article' | 'tech' | 'task';
  id: string;
}

interface Stage {
  title: string;
  description: string;
  items: TrackItem[];
}

const stageSections: Stage[] = [
  {
    title: '0. Погружение в IT',
    description: 'Поймите, как устроен компьютер, программы и интернет. Без этого фундамента остальные темы будут висеть в воздухе.',
    items: [
      {type: 'article', id: 'basics/how-computer-works'},
      {type: 'article', id: 'basics/what-is-programming'},
      {type: 'article', id: 'basics/what-is-software'},
      {type: 'article', id: 'basics/what-is-os'},
      {type: 'article', id: 'basics/what-is-network'},
      {type: 'tech', id: 'browser'},
      {type: 'article', id: 'basics/what-is-app-types'},
    ],
  },
  {
    title: '1. Профессия системного аналитика',
    description: 'Узнайте, кто такой системный аналитик, чем он занимается, как встроен в команду и процесс разработки.',
    items: [
      {type: 'article', id: 'basics/who-is-system-analyst'},
      {type: 'article', id: 'basics/it-roles'},
      {type: 'article', id: 'basics/sa-day-in-life'},
      {type: 'article', id: 'basics/what-is-sdlc'},
      {type: 'article', id: 'basics/what-is-testing'},
      {type: 'article', id: 'basics/what-is-sa-documentation'},
      {type: 'article', id: 'basics/git-overview'},
      {type: 'task', id: 'find-analyst-in-team'},
    ],
  },
  {
    title: '2. Работа с требованиями',
    description: 'Основная работа аналитика — требования. Научитесь их собирать, формулировать и документировать.',
    items: [
      {type: 'article', id: 'requirements/what-is-requirement'},
      {type: 'article', id: 'requirements/stakeholder-communication'},
      {type: 'article', id: 'requirements/user-stories'},
      {type: 'article', id: 'requirements/bdd-scenarios'},
      {type: 'tech', id: 'jira'},
      {type: 'tech', id: 'confluence'},
      {type: 'task', id: 'elicit-requirements'},
      {type: 'task', id: 'write-user-story'},
    ],
  },
  {
    title: '3. Моделирование',
    description: 'Научитесь визуализировать процессы, архитектуру и сценарии — от BPMN до UML-диаграмм.',
    items: [
      {type: 'article', id: 'modeling/what-is-model'},
      {type: 'article', id: 'modeling/bpmn'},
      {type: 'article', id: 'modeling/use-case-diagram'},
      {type: 'article', id: 'modeling/sequence-diagram'},
      {type: 'tech', id: 'drawio'},
      {type: 'tech', id: 'plantuml'},
    ],
  },
  {
    title: '4. Данные и базы данных',
    description: 'Поймите, как устроены данные, научитесь писать SQL и разбираться в форматах обмена.',
    items: [
      {type: 'article', id: 'basics/what-is-data'},
      {type: 'article', id: 'basics/what-is-database-basics'},
      {type: 'article', id: 'data/sql-basics'},
      {type: 'article', id: 'data/json-xml'},
      {type: 'tech', id: 'postgresql'},
      {type: 'tech', id: 'dbeaver'},
      {type: 'task', id: 'sql-query'},
    ],
  },
  {
    title: '5. Интеграции и API',
    description: 'Клиент-сервер, протоколы, REST, OpenAPI — ключевые темы для аналитика, работающего с распределёнными системами.',
    items: [
      {type: 'article', id: 'basics/client-server-basics'},
      {type: 'article', id: 'basics/what-is-protocol'},
      {type: 'article', id: 'basics/what-is-api'},
      {type: 'article', id: 'integration/api-rest-basics'},
      {type: 'tech', id: 'http'},
      {type: 'article', id: 'integration/api-openapi'},
      {type: 'tech', id: 'openapi'},
      {type: 'tech', id: 'curl'},
      {type: 'tech', id: 'postman'},
      {type: 'tech', id: 'miro'},
      {type: 'tech', id: 'scrum'},
      {type: 'task', id: 'describe-feature'},
      {type: 'task', id: 'design-rest-api'},
    ],
  },
  {
    title: '6. Первые рабочие задачи',
    description: 'Типовые задачи, которые Junior аналитик выполняет в команде: от acceptance criteria до баг-репортов.',
    items: [
      {type: 'tech', id: 'figma'},
      {type: 'task', id: 'acceptance-criteria'},
      {type: 'task', id: 'test-checklist'},
      {type: 'task', id: 'bug-report'},
      {type: 'task', id: 'grooming'},
      {type: 'task', id: 'describe-system-to-friend'},
    ],
  },
];

const iconMap: Record<string, string> = {
  article: '📖',
  tech: '🔧',
  task: '🎯',
};

const colorMap: Record<string, string> = {
  article: '#4f8ef7',
  tech: '#10b981',
  task: '#f59e0b',
};

const basePathMap: Record<string, string> = {
  article: '/docs',
  tech: '/tech',
  task: '/tasks',
};

const totalItems = stageSections.reduce((sum, s) => sum + s.items.length, 0);

function StageBlock({stage, idx}: {stage: Stage; idx: number}): React.ReactElement {
  return (
    <div style={{marginBottom: '2.5rem'}}>
      <h2 style={{fontSize: '1.15rem', marginBottom: '0.3rem'}}>
        {stage.title}
      </h2>
      <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem'}}>
        {stage.description}
      </p>
      <ol style={{paddingLeft: '1.25rem', margin: 0}}>
        {stage.items.map((item) => {
          const label = names[item.type][item.id] || item.id;
          const base = basePathMap[item.type];
          const color = colorMap[item.type];
          const icon = iconMap[item.type];
          return (
            <li
              key={`${item.type}-${item.id}`}
              style={{
                padding: '0.45rem 0',
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}
            >
              <Link
                to={`${base}/${item.id}`}
                style={{
                  color: 'var(--ifm-link-color)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: color,
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    marginRight: 8,
                    flexShrink: 0,
                    verticalAlign: 'middle',
                  }}
                >
                  {icon}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const names: Record<string, Record<string, string>> = {
  article: {
    'basics/how-computer-works': 'Как устроен компьютер',
    'basics/what-is-programming': 'Что такое программирование',
    'basics/what-is-software': 'Что такое программное обеспечение',
    'basics/what-is-os': 'Что такое операционная система',
    'basics/what-is-network': 'Что такое компьютерные сети',
    'basics/what-is-app-types': 'Типы приложений',
    'basics/who-is-system-analyst': 'Кто такой системный аналитик',
    'basics/it-roles': 'Роли в IT-команде',
    'basics/sa-day-in-life': 'День системного аналитика',
    'basics/what-is-sdlc': 'Что такое SDLC',
    'basics/what-is-testing': 'Как тестируют программы',
    'basics/what-is-sa-documentation': 'Документы аналитика',
    'basics/git-overview': 'Git — контроль версий',
    'basics/what-is-data': 'Что такое данные, информация, знания',
    'basics/what-is-database-basics': 'Что такое база данных (основы)',
    'basics/client-server-basics': 'Клиент-серверная архитектура',
    'basics/what-is-protocol': 'Что такое протокол взаимодействия',
    'basics/what-is-api': 'Что такое API',
    'integration/api-rest-basics': 'Основы REST API',
    'integration/api-openapi': 'OpenAPI — документирование API',
    'modeling/what-is-model': 'Что такое модель',
    'modeling/bpmn': 'BPMN — моделирование процессов',
    'modeling/use-case-diagram': 'Use Case diagram',
    'modeling/sequence-diagram': 'Sequence diagram',
    'requirements/what-is-requirement': 'Что такое требование',
    'requirements/stakeholder-communication': 'Коммуникация со стейкхолдерами',
    'requirements/user-stories': 'User Stories',
    'requirements/bdd-scenarios': 'BDD-сценарии',
    'data/sql-basics': 'Основы SQL',
    'data/json-xml': 'JSON и XML',
  },
  tech: {
    browser: 'Веб-браузер',
    jira: 'Jira',
    confluence: 'Confluence',
    drawio: 'Draw.io (diagrams.net)',
    plantuml: 'PlantUML',
    postgresql: 'PostgreSQL',
    dbeaver: 'DBeaver',
    http: 'HTTP',
    openapi: 'OpenAPI Specification',
    curl: 'cURL',
    postman: 'Postman',
    miro: 'Miro',
    scrum: 'Scrum',
    figma: 'Figma',
    git: 'Git',
  },
  task: {
    'find-analyst-in-team': 'Найти аналитика в знакомых',
    'elicit-requirements': 'Сбор требований у стейкхолдера',
    'write-user-story': 'Написание user story',
    'sql-query': 'SQL-запрос по ТЗ',
    'describe-feature': 'Описать существующую фичу',
    'design-rest-api': 'Проектирование REST API',
    'acceptance-criteria': 'Acceptance criteria',
    'test-checklist': 'Чек-лист тестирования',
    'bug-report': 'Баг-репорт',
    'grooming': 'Refinement (grooming)',
    'describe-system-to-friend': 'Объяснить другу интернет',
  },
};

export default function TracksPage(): React.ReactElement {
  return (
    <Layout
      title="Трек: Junior System Analyst"
      description="Полный путь обучения системного аналитика с нуля до Junior"
    >
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 720}}>
        <h1>🎓 Junior System Analyst</h1>
        <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>
          Полный путь от человека без IT-опыта до Junior системного аналитика.
          Порядок освоения — строго последовательный.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            width: '100%',
            height: 8,
            background: '#e5e7eb',
            borderRadius: 4,
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          {stageSections.map((s, i) => {
            const pct = (s.items.length / totalItems) * 100;
            const colors = ['#6366f1', '#4f8ef7', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
            return (
              <div
                key={i}
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: colors[i] || '#9ca3af',
                  borderRadius: i === 0 ? '4px 0 0 4px' : i === stageSections.length - 1 ? '0 4px 4px 0' : 0,
                }}
                title={s.title}
              />
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem 1.25rem',
            fontSize: '0.8rem',
            color: '#6b7280',
            marginBottom: '2.5rem',
          }}
        >
          {stageSections.map((s, i) => {
            const colors = ['#6366f1', '#4f8ef7', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
            return (
              <span key={i}>
                <span style={{color: colors[i], fontWeight: 700}}>▬</span>{' '}
                {s.title.replace(/^\d+\.\s*/, '')} ({s.items.length})
              </span>
            );
          })}
        </div>

        {stageSections.map((stage, i) => (
          <StageBlock key={i} stage={stage} idx={i} />
        ))}

        <div
          style={{
            marginTop: '2rem',
            padding: '1.25rem',
            background: 'var(--ifm-color-emphasis-100)',
            borderRadius: 8,
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          <strong style={{color: 'var(--ifm-font-color-base)'}}>Всего в треке:</strong>{' '}
          {stageSections.reduce((s, st) => s + st.items.filter(i => i.type === 'article').length, 0)} статей ·{' '}
          {stageSections.reduce((s, st) => s + st.items.filter(i => i.type === 'tech').length, 0)} технологий ·{' '}
          {stageSections.reduce((s, st) => s + st.items.filter(i => i.type === 'task').length, 0)} задач
        </div>
      </div>
    </Layout>
  );
}
