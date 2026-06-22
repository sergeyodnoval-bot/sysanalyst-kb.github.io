import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

const CURRENT_YEAR = 2026;

const TECH_TYPE_LABELS: Record<string, string> = {
  standard: 'Стандарты',
  tool: 'Инструменты',
  methodology: 'Методологии',
};

export default function UsedTechnologies(): React.ReactElement | null {
  const {metadata} = useDoc();
  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: {id: string; title: string; type: string; tech_type?: string; first_seen?: number; link: string}[];
    edges: {from: string; to: string; type: string}[];
  }> | undefined;
  const graphData = graphPlugin?.default;
  if (!graphData) return null;

  const techNodeMap = new Map(graphData.nodes.filter((n) => n.type === 'technology').map((n) => [n.id, n]));

  const techIds = new Set<string>();
  for (const edge of graphData.edges) {
    if (edge.type === 'enables' && edge.from === metadata.id && techNodeMap.has(edge.to)) {
      techIds.add(edge.to);
    }
  }
  if (techIds.size === 0) return null;

  const grouped: Record<string, {id: string; title: string; link: string; isNew: boolean}[]> = {};
  for (const tid of techIds) {
    const node = techNodeMap.get(tid)!;
    const type = node.tech_type || 'other';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push({
      id: tid,
      title: node.title,
      link: node.link,
      isNew: !!node.first_seen && (CURRENT_YEAR - node.first_seen) <= 3,
    });
  }

  return (
    <div className="alert alert--info" style={{marginTop: '1rem'}}>
      <strong>🔧 Используемые технологии:</strong>
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} style={{marginTop: '0.5rem'}}>
          <div style={{fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4}}>
            {TECH_TYPE_LABELS[type] || type}
          </div>
          <ul style={{margin: 0}}>
            {items.map((item) => (
              <li key={item.id}>
                <Link to={item.link}>{item.title}</Link>
                {item.isNew && (
                  <span style={{
                    fontSize: 10, background: '#ef4444', color: '#fff',
                    padding: '1px 6px', borderRadius: 8, marginLeft: 6,
                  }}>🆕 NEW</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
