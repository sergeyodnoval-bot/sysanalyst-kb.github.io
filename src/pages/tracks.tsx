import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  allTracks,
  type TrackDef,
  type TrackStage,
  itemLabels,
  itemColors,
  itemIcons,
  trackItemPath,
} from '@site/src/data/tracks-data';

const stageColors = ['#6366f1', '#4f8ef7', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

function StageBlock({stage}: {stage: TrackStage}): React.ReactElement {
  return (
    <div style={{marginBottom: '2.5rem'}}>
      <ol style={{paddingLeft: '1.25rem', margin: 0}}>
        {stage.items.map((item) => {
          const label = itemLabels[item.type]?.[item.id] || item.id;
          const link = trackItemPath(item);
          const color = itemColors[item.type];
          const icon = itemIcons[item.type];
          return (
            <li
              key={`${item.type}-${item.id}`}
              style={{padding: '0.45rem 0', fontSize: '0.9rem', lineHeight: 1.5}}
            >
              <Link
                to={link}
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

function TrackDetail({track}: {track: TrackDef}): React.ReactElement {
  const totalItems = track.stages.reduce((s, st) => s + st.items.length, 0);
  return (
    <>
      <h1>{track.title}</h1>
      <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>{track.description}</p>

      <div
        style={{
          display: 'flex',
          gap: '0.25rem',
          width: '100%',
          height: 8,
          background: '#e5e7eb',
          borderRadius: 4,
          marginTop: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {track.stages.map((s, i) => {
          const pct = (s.items.length / totalItems) * 100;
          return (
            <div
              key={i}
              style={{
                width: `${pct}%`,
                height: '100%',
                background: stageColors[i] || '#9ca3af',
                borderRadius:
                  i === 0 ? '4px 0 0 4px' : i === track.stages.length - 1 ? '0 4px 4px 0' : 0,
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
          marginBottom: '2rem',
        }}
      >
        {track.stages.map((s, i) => (
          <span key={i}>
            <span style={{color: stageColors[i], fontWeight: 700}}>▬</span>{' '}
            {s.title.replace(/^\d+\.\s*/, '')} ({s.items.length})
          </span>
        ))}
      </div>

      {track.stages.map((stage, i) => (
        <div key={i} style={{marginBottom: '2rem'}}>
          <h2 style={{fontSize: '1.15rem', marginBottom: '0.3rem'}}>{stage.title}</h2>
          <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem'}}>
            {stage.description}
          </p>
          <StageBlock stage={stage} />
        </div>
      ))}

      <div
        style={{
          marginTop: '1rem',
          padding: '1.25rem',
          background: 'var(--ifm-color-emphasis-100)',
          borderRadius: 8,
          fontSize: '0.875rem',
          color: '#6b7280',
        }}
      >
        <strong style={{color: 'var(--ifm-font-color-base)'}}>Всего в треке:</strong>{' '}
        {track.stages.reduce((s, st) => s + st.items.filter(i => i.type === 'article').length, 0)} статей ·{' '}
        {track.stages.reduce((s, st) => s + st.items.filter(i => i.type === 'tech').length, 0)} технологий ·{' '}
        {track.stages.reduce((s, st) => s + st.items.filter(i => i.type === 'task').length, 0)} задач
      </div>
    </>
  );
}

export default function TracksPage(): React.ReactElement {
  return (
    <Layout title="Треки" description="Треки обучения системного аналитика">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 720}}>
        {allTracks.map((track) => (
          <div key={track.id} style={{marginBottom: '3rem'}}>
            <TrackDetail track={track} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
