import React, {useMemo} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

interface Track {
  id: string;
  title: string;
  description: string;
  articles: string[];
  technologies: string[];
  tasks: string[];
}

const tracks: Track[] = [
  {
    id: 'junior-track',
    title: 'Путь Junior System Analyst',
    description: 'С нуля до первой работы. Подойдёт тем, кто только начинает изучать системный анализ.',
    articles: ['basics/client-server', 'basics/what-is-protocol', 'modeling/bpmn', 'integration/api-rest-basics', 'integration/api-openapi'],
    technologies: ['openapi', 'postman'],
    tasks: ['design-rest-api'],
  },
  {
    id: 'api-track',
    title: 'Путь API-интегратора',
    description: 'Фокус на интеграциях — от протоколов до документирования.',
    articles: ['basics/what-is-protocol', 'integration/api-rest-basics', 'integration/api-openapi'],
    technologies: ['openapi', 'postman'],
    tasks: ['design-rest-api'],
  },
];

const articleNames: Record<string, string> = {
  'basics/client-server': 'Клиент-серверная архитектура',
  'basics/what-is-protocol': 'Что такое протокол взаимодействия',
  'modeling/bpmn': 'BPMN — моделирование бизнес-процессов',
  'integration/api-rest-basics': 'Основы REST API',
  'integration/api-openapi': 'Документирование API со спецификацией OpenAPI',
};

const techNames: Record<string, string> = {
  openapi: 'OpenAPI Specification (Swagger)',
  postman: 'Postman',
  scrum: 'Scrum',
  http: 'HTTP — HyperText Transfer Protocol',
};

const taskNames: Record<string, string> = {
  'design-rest-api': 'Проектирование REST API',
  'conduct-stakeholder-interview': 'Проведение интервью со стейкхолдером',
};

function getTotalItems(track: Track): number {
  return track.articles.length + track.technologies.length + track.tasks.length;
}

function SectionList({items, basePath, names, color, label}: {
  items: string[];
  basePath: string;
  names: Record<string, string>;
  color: string;
  label: string;
}): React.ReactElement | null {
  if (items.length === 0) return null;
  return (
    <div style={{marginBottom: '1.5rem'}}>
      <h3 style={{fontSize: '1rem', color, marginBottom: '0.75rem'}}>{label}</h3>
      <ol style={{paddingLeft: '1.25rem', margin: 0}}>
        {items.map((id, idx) => (
          <li key={id} style={{padding: '0.4rem 0'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <span style={{
                background: color,
                color: '#fff',
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {idx + 1}
              </span>
              <Link to={`${basePath}/${id}`} style={{fontWeight: 500, fontSize: '0.9rem'}}>
                {names[id] || id}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TrackDetail({track}: {track: Track}): React.ReactElement {
  const total = getTotalItems(track);

  return (
    <Layout title={track.title} description={track.description}>
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem', maxWidth: 700}}>
        <Link to="/tracks" style={{fontSize: '0.875rem'}}>← Все треки</Link>
        <h1 style={{marginTop: '1rem'}}>{track.title}</h1>
        <p>{track.description}</p>

        <div style={{
          width: '100%', height: 8, background: '#e5e7eb', borderRadius: 4,
          marginTop: '1rem', marginBottom: '1.5rem', display: 'flex',
        }}>
          {track.articles.length > 0 && (
            <div style={{
              width: `${(track.articles.length / total) * 100}%`,
              height: '100%', background: '#4f8ef7', borderRadius: '4px 0 0 4px',
            }} title={`${track.articles.length} статей`} />
          )}
          {track.technologies.length > 0 && (
            <div style={{
              width: `${(track.technologies.length / total) * 100}%`,
              height: '100%', background: '#10b981',
            }} title={`${track.technologies.length} технологий`} />
          )}
          {track.tasks.length > 0 && (
            <div style={{
              width: `${(track.tasks.length / total) * 100}%`,
              height: '100%', background: '#f59e0b', borderRadius: '0 4px 4px 0',
            }} title={`${track.tasks.length} задач`} />
          )}
        </div>

        <div style={{display: 'flex', gap: 16, fontSize: '0.8rem', color: '#6b7280', marginBottom: '2rem'}}>
          <span><span style={{color: '#4f8ef7'}}>■</span> {track.articles.length} статей</span>
          <span><span style={{color: '#10b981'}}>■</span> {track.technologies.length} технологий</span>
          <span><span style={{color: '#f59e0b'}}>■</span> {track.tasks.length} задач</span>
        </div>

        <SectionList items={track.articles} basePath="/docs" names={articleNames} color="#4f8ef7" label="Статьи" />
        <SectionList items={track.technologies} basePath="/tech" names={techNames} color="#10b981" label="Технологии" />
        <SectionList items={track.tasks} basePath="/tasks" names={taskNames} color="#f59e0b" label="Задачи" />
      </div>
    </Layout>
  );
}

function TrackList(): React.ReactElement {
  return (
    <Layout title="Треки обучения" description="Треки обучения для системных аналитиков">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem', maxWidth: 700}}>
        <h1>📚 Треки обучения</h1>
        <p>Выберите трек и двигайтесь по нему последовательно, от простого к сложному.</p>

        {tracks.map((track) => {
          const total = getTotalItems(track);
          return (
            <div
              key={track.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <h2 style={{marginBottom: '0.5rem'}}>{track.title}</h2>
              <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>{track.description}</p>
              <p style={{fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.75rem'}}>
                {track.articles.length} статей · {track.technologies.length} технологий · {track.tasks.length} задач
              </p>
              <div style={{width: '100%', height: 6, background: '#e5e7eb', borderRadius: 3, marginBottom: '1rem', display: 'flex'}}>
                <div style={{width: `${(track.articles.length / total) * 100}%`, height: '100%', background: '#4f8ef7', borderRadius: '3px 0 0 3px'}} />
                <div style={{width: `${(track.technologies.length / total) * 100}%`, height: '100%', background: '#10b981'}} />
                <div style={{width: `${(track.tasks.length / total) * 100}%`, height: '100%', background: '#f59e0b', borderRadius: '0 3px 3px 0'}} />
              </div>
              <Link
                to={`/tracks?track=${track.id}`}
                className="button button--primary button--sm"
              >
                Открыть трек
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default function TracksPage(): React.ReactElement {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const trackId = params.get('track');
  const track = trackId ? tracks.find((t) => t.id === trackId) : undefined;

  if (track) {
    return <TrackDetail track={track} />;
  }

  return <TrackList />;
}
