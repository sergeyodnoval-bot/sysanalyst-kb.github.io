import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

interface Track {
  id: string;
  title: string;
  description: string;
  articles: string[];
}

const tracks: Track[] = [
  {
    id: 'junior-track',
    title: 'Путь Junior System Analyst',
    description: 'С нуля до первой работы. Подойдёт тем, кто только начинает изучать системный анализ.',
    articles: ['basics/client-server', 'basics/http-protocol', 'modeling/bpmn', 'integration/api-rest-basics', 'integration/api-openapi'],
  },
  {
    id: 'api-track',
    title: 'Путь API-интегратора',
    description: 'Фокус на интеграциях — от протоколов до документирования.',
    articles: ['basics/http-protocol', 'integration/api-rest-basics', 'integration/api-openapi'],
  },
];

const articleNames: Record<string, string> = {
  'basics/client-server': 'Клиент-серверная архитектура',
  'basics/http-protocol': 'HTTP — протокол передачи данных',
  'modeling/bpmn': 'BPMN — моделирование бизнес-процессов',
  'integration/api-rest-basics': 'Основы REST API',
  'integration/api-openapi': 'Документирование API со спецификацией OpenAPI',
};

function TrackDetail({track}: {track: Track}): React.ReactElement {
  return (
    <Layout title={track.title} description={track.description}>
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem', maxWidth: 700}}>
        <Link to="/tracks" style={{fontSize: '0.875rem'}}>← Все треки</Link>
        <h1 style={{marginTop: '1rem'}}>{track.title}</h1>
        <p>{track.description}</p>

        <h2 style={{marginTop: '2rem'}}>Статьи в треке</h2>
        <ol style={{paddingLeft: '1.25rem'}}>
          {track.articles.map((articleId, idx) => (
            <li key={articleId} style={{padding: '0.5rem 0'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <span style={{
                  background: '#4f8ef7',
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
                <Link to={`/docs/${articleId}`} style={{fontWeight: 500}}>
                  {articleNames[articleId] || articleId}
                </Link>
              </div>
            </li>
          ))}
        </ol>
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

        {tracks.map((track) => (
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
            <p style={{fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem'}}>
              {track.articles.length} статей
            </p>
            <Link
              to={`/tracks?track=${track.id}`}
              className="button button--primary button--sm"
            >
              Открыть трек
            </Link>
          </div>
        ))}
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
