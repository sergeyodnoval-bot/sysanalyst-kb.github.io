import React, {useState, useEffect} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import {
  getItemType,
  trackLookup,
  itemIcons,
  itemLabels,
  trackItemPath,
} from '@site/src/data/tracks-data';

export default function TrackNav(): React.ReactElement | null {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {metadata} = useDoc();
  // metadata.pluginId is undefined on client for all plugin types
  let type = getItemType(metadata.pluginId);
  if (!type) {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/tech/')) type = 'tech';
    else if (path.includes('/tasks/')) type = 'task';
    else type = 'article';
  }
  const key = type ? `${type}:${metadata.id}` : '';
  const positions = key ? trackLookup.get(key) : undefined;

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCurrent(0);
  }, [key]);

  if (!type || !isClient) return null;
  if (!positions || positions.length === 0) return null;

  const clamped = Math.min(current, positions.length - 1);
  const pos = positions[clamped];
  const progress = ((pos.index + 1) / pos.total) * 100;
  const icon = itemIcons[type] || '📄';
  const labelMap = itemLabels[type];
  const docId = metadata.id.split('/').pop()!;
  const label = labelMap ? labelMap[docId] || metadata.id : metadata.id;

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
          marginBottom: '0.5rem',
        }}
      >
        <span style={{fontWeight: 700, fontSize: '0.85rem'}}>
          {pos.trackTitle}
        </span>
        {positions.length > 1 && (
          <div style={{display: 'flex', gap: '0.25rem'}}>
            {positions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  border: 'none',
                  background:
                    i === clamped
                      ? 'var(--ifm-color-primary)'
                      : 'var(--ifm-color-emphasis-300)',
                  cursor: 'pointer',
                }}
                aria-label={`Трек ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          height: 4,
          borderRadius: 2,
          background: 'var(--ifm-color-emphasis-200)',
          marginBottom: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: 2,
            background: 'var(--ifm-color-primary)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div style={{fontSize: '0.8rem', lineHeight: 1.5}}>
        <div style={{marginBottom: '0.25rem'}}>
          <strong>Текущий шаг:</strong>{' '}
          <span style={{fontWeight: 600}}>
            {icon} {label}
          </span>
        </div>
        <div
          style={{
            color: 'var(--ifm-color-emphasis-700)',
            marginBottom: '0.5rem',
          }}
        >
          Этап: {pos.stageTitle} &middot; Шаг {pos.index + 1} из {pos.total}
        </div>

        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          {pos.prev ? (
            <Link
              to={trackItemPath(pos.prev)}
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 4,
                background: 'var(--ifm-color-emphasis-200)',
                fontSize: '0.75rem',
              }}
            >
              ← Предыдущий
            </Link>
          ) : (
            <span
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 4,
                background: 'var(--ifm-color-emphasis-100)',
                fontSize: '0.75rem',
                color: 'var(--ifm-color-emphasis-400)',
              }}
            >
              ← Начало трека
            </span>
          )}
          <Link
            to={`/tracks`}
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: 4,
              background: 'var(--ifm-color-primary)',
              color: '#fff',
              fontSize: '0.75rem',
            }}
          >
            Ко всем трекам
          </Link>
          {pos.next ? (
            <Link
              to={trackItemPath(pos.next)}
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 4,
                background: 'var(--ifm-color-emphasis-200)',
                fontSize: '0.75rem',
              }}
            >
              Следующий →
            </Link>
          ) : (
            <span
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 4,
                background: 'var(--ifm-color-emphasis-100)',
                fontSize: '0.75rem',
                color: 'var(--ifm-color-emphasis-400)',
              }}
            >
              Конец трека →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
