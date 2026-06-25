import React, {useState} from 'react';
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

function TrackCard({track, expanded, onToggle}: {track: TrackDef; expanded: boolean; onToggle: () => void}): React.ReactElement {
  const totalItems = track.stages.reduce((s, st) => s + st.items.length, 0);
  const articleCount = track.stages.reduce((s, st) => s + st.items.filter(i => i.type === 'article').length, 0);
  const techCount = track.stages.reduce((s, st) => s + st.items.filter(i => i.type === 'tech').length, 0);
  const taskCount = track.stages.reduce((s, st) => s + st.items.filter(i => i.type === 'task').length, 0);

  if (!expanded) {
    return (
      <div
        onClick={onToggle}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          cursor: 'pointer',
          background: '#fff',
          transition: 'box-shadow 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem'}}>{track.title}</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>{track.description}</div>
          </div>
          <div style={{fontSize: '1.5rem', color: '#9ca3af'}}>▸</div>
        </div>

        <div style={{display: 'flex', gap: '0.25rem', width: '100%', height: 6, background: '#e5e7eb', borderRadius: 3, marginTop: '1rem'}}>
          {track.stages.map((s, i) => {
            const pct = (s.items.length / totalItems) * 100;
            return (
              <div
                key={i}
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: stageColors[i] || '#9ca3af',
                  borderRadius: i === 0 ? '3px 0 0 3px' : i === track.stages.length - 1 ? '0 3px 3px 0' : 0,
                }}
                title={s.title}
              />
            );
          })}
        </div>

        <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: '#9ca3af'}}>
          <span>{articleCount} статей</span>
          <span>{techCount} технологий</span>
          <span>{taskCount} задач</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: '2px solid #6366f1',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: '1rem',
        background: '#fff',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
        <div>
          <div style={{fontSize: '1.25rem', fontWeight: 700}}>{track.title}</div>
          <p style={{color: '#6b7280', fontSize: '0.875rem', margin: '0.25rem 0 0'}}>{track.description}</p>
        </div>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            color: '#6366f1',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            fontWeight: 700,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{display: 'flex', gap: '0.25rem', width: '100%', height: 8, background: '#e5e7eb', borderRadius: 4, marginBottom: '1rem'}}>
        {track.stages.map((s, i) => {
          const pct = (s.items.length / totalItems) * 100;
          return (
            <div
              key={i}
              style={{
                width: `${pct}%`,
                height: '100%',
                background: stageColors[i] || '#9ca3af',
                borderRadius: i === 0 ? '4px 0 0 4px' : i === track.stages.length - 1 ? '0 4px 4px 0' : 0,
              }}
              title={s.title}
            />
          );
        })}
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem', fontSize: '0.8rem', color: '#6b7280', marginBottom: '1.5rem'}}>
        {track.stages.map((s, i) => (
          <span key={i}>
            <span style={{color: stageColors[i], fontWeight: 700}}>▬</span>{' '}
            {s.title.replace(/^\d+\.\s*/, '')} ({s.items.length})
          </span>
        ))}
      </div>

      {track.stages.map((stage, i) => (
        <div key={i} style={{marginBottom: '1.5rem'}}>
          <h3 style={{fontSize: '1.05rem', marginBottom: '0.2rem'}}>{stage.title}</h3>
          <p style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem'}}>{stage.description}</p>
          <StageBlock stage={stage} />
        </div>
      ))}

      <div style={{marginTop: '1rem', padding: '1rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: 8, fontSize: '0.85rem', color: '#6b7280'}}>
        <strong style={{color: 'var(--ifm-font-color-base)'}}>Всего в треке:</strong>{' '}
        {articleCount} статей · {techCount} технологий · {taskCount} задач
      </div>
    </div>
  );
}

export default function TracksPage(): React.ReactElement {
  const [openTrack, setOpenTrack] = useState<string | null>(null);

  return (
    <Layout title="Треки" description="Треки обучения системного аналитика">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 720}}>
        <h1 style={{marginBottom: '1.5rem'}}>Треки обучения</h1>
        {allTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            expanded={openTrack === track.id}
            onToggle={() => setOpenTrack(openTrack === track.id ? null : track.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
