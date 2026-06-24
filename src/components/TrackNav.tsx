import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {
  trackLookup,
  basePaths,
  itemLabels,
  itemIcons,
  itemColors,
  type NavInfo,
} from '@site/src/data/tracks-data';

const pluginTypeMap: Record<string, 'article' | 'tech' | 'task'> = {
  default: 'article',
  tech: 'tech',
  tasks: 'task',
};

function itemPath(item: {type: string; id: string}): string {
  const base = basePaths[item.type] || '/docs';
  return `${base}/${item.id}`;
}

function navHref(nav: NavInfo): string {
  return `/tracks#${nav.trackId}`;
}

export default function TrackNav(): React.ReactElement | null {
  const {metadata} = useDoc();
  const type = pluginTypeMap[metadata.pluginId];
  if (!type) return null;

  const key = `${type}:${metadata.id}`;
  const positions = trackLookup.get(key);
  if (!positions || positions.length === 0) return null;

  const [activeIdx, setActiveIdx] = useState(0);
  const curIdx = Math.min(activeIdx, positions.length - 1);
  const nav = positions[curIdx];

  return (
    <div
      style={{
        marginTop: '2rem',
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
          marginBottom: '0.75rem',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
          <span style={{fontSize: '0.8rem', color: '#6b7280', whiteSpace: 'nowrap'}}>
            🎓 Трек:
          </span>
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
                color: 'var(--ifm-font-color-base)',
              }}
            >
              {positions.map((p, i) => (
                <option key={p.trackId} value={i}>
                  {p.trackTitle}
                </option>
              ))}
            </select>
          ) : (
            <Link
              to={navHref(nav)}
              style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--ifm-link-color)'}}
            >
              {nav.trackTitle}
            </Link>
          )}
          <span style={{fontSize: '0.75rem', color: '#9ca3af'}}>
            {nav.stageTitle.replace(/^\d+\.\s*/, '')} · Шаг {nav.index + 1} из {nav.total}
          </span>
        </div>
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
              to={itemPath(nav.prev)}
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
              <span style={{fontSize: '0.75rem'}}>←</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: itemColors[nav.prev.type] || '#6b7280',
                  color: '#fff',
                  fontSize: '0.55rem',
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
            <span style={{fontSize: '0.8rem', color: '#9ca3af'}}>Начало трека</span>
          )}
        </div>

        <div style={{flex: 1, minWidth: 0, textAlign: 'right'}}>
          {nav.next ? (
            <Link
              to={itemPath(nav.next)}
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
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: itemColors[nav.next.type] || '#6b7280',
                  color: '#fff',
                  fontSize: '0.55rem',
                  flexShrink: 0,
                }}
              >
                {itemIcons[nav.next.type] || '?'}
              </span>
              <span style={{fontSize: '0.75rem'}}>→</span>
            </Link>
          ) : (
            <span style={{fontSize: '0.8rem', color: '#9ca3af'}}>Конец трека</span>
          )}
        </div>
      </div>
    </div>
  );
}
