import React, {useState, useEffect} from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {
  trackLookup,
  itemLabels,
  itemIcons,
  itemColors,
  trackItemPath,
  type NavInfo,
} from '@site/src/data/tracks-data';

const pluginTypeMap: Record<string, 'article' | 'tech' | 'task'> = {
  '': 'article',
  default: 'article',
  tech: 'tech',
  tasks: 'task',
};

const stageColors = ['#6366f1', '#4f8ef7', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function TrackNav(): React.ReactElement | null {
  const {metadata} = useDoc();

  const pluginId = metadata.pluginId;
  const docId = metadata.id;
  const type = pluginTypeMap[pluginId];
  if (!type) return null;

  const key = `${type}:${docId}`;
  const positions = trackLookup.get(key);
  if (!positions || positions.length === 0) return null;

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [key]);

  const curIdx = Math.min(activeIdx, positions.length - 1);
  const nav = positions[curIdx];
  const pct = ((nav.index + 1) / nav.total) * 100;

  const icon = itemIcons[type] || '📄';
  const label = itemLabels[type]?.[docId] || docId;

  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1rem 1.25rem',
        background: 'var(--ifm-color-emphasis-100)',
        borderRadius: 8,
        border: '1px solid var(--ifm-color-emphasis-200)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
          <span style={{fontSize: '0.85rem', fontWeight: 600}}>
            🎓{' '}
            {positions.length > 1 ? (
              <select
                value={activeIdx}
                onChange={(e) => setActiveIdx(Number(e.target.value))}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--ifm-link-color)',
                }}
              >
                {positions.map((p, i) => (
                  <option key={p.trackId} value={i}>
                    {p.trackTitle}
                  </option>
                ))}
              </select>
            ) : (
              <span style={{color: 'var(--ifm-link-color)'}}>{nav.trackTitle}</span>
            )}
          </span>
          <span style={{fontSize: '0.75rem', color: '#6b7280'}}>
            {nav.stageTitle.replace(/^\d+\.\s*/, '')}
          </span>
        </div>
        <span style={{fontSize: '0.75rem', color: '#9ca3af', whiteSpace: 'nowrap'}}>
          Шаг {nav.index + 1} из {nav.total}
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: 6,
          background: '#e5e7eb',
          borderRadius: 3,
          marginBottom: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: stageColors[nav.stageIndex] || '#6366f1',
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div
        style={{
          fontSize: '0.8rem',
          color: '#6b7280',
          marginBottom: '0.75rem',
        }}
      >
        {icon} <strong>{label}</strong> — текущий шаг
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{flex: 1, minWidth: 0}}>
          {nav.prev ? (
            <Link
              to={trackItemPath(nav.prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.875rem',
                color: 'var(--ifm-link-color)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <span style={{fontSize: '0.8rem'}}>←</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: itemColors[nav.prev.type] || '#6b7280',
                  color: '#fff',
                  fontSize: '0.6rem',
                  flexShrink: 0,
                }}
              >
                {itemIcons[nav.prev.type] || '?'}
              </span>
              <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {itemLabels[nav.prev.type]?.[nav.prev.id] || nav.prev.id}
              </span>
            </Link>
          ) : (
            <span style={{fontSize: '0.8rem', color: '#9ca3af'}}>
              ← Начало трека
            </span>
          )}
        </div>

        <div style={{flex: 1, minWidth: 0, textAlign: 'right'}}>
          {nav.next ? (
            <Link
              to={trackItemPath(nav.next)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.875rem',
                color: 'var(--ifm-link-color)',
                textDecoration: 'none',
                fontWeight: 500,
                justifyContent: 'flex-end',
              }}
            >
              <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {itemLabels[nav.next.type]?.[nav.next.id] || nav.next.id}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: itemColors[nav.next.type] || '#6b7280',
                  color: '#fff',
                  fontSize: '0.6rem',
                  flexShrink: 0,
                }}
              >
                {itemIcons[nav.next.type] || '?'}
              </span>
              <span style={{fontSize: '0.8rem'}}>→</span>
            </Link>
          ) : (
            <span style={{fontSize: '0.8rem', color: '#9ca3af'}}>
              Конец трека →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
