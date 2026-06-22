import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

export default function AlternativesList(): React.ReactElement | null {
  const {metadata} = useDoc();
  const frontMatter = metadata.frontMatter || {};
  const alternatives = frontMatter.alternatives as string[] | undefined;
  if (!alternatives || alternatives.length === 0) return null;

  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: {id: string; title: string; type: string; link: string}[];
  }> | undefined;
  const graphData = graphPlugin?.default;
  const nodeMap = new Map((graphData?.nodes || []).map((n) => [n.id, n]));

  return (
    <div className="alert alert--warning" style={{marginTop: '1rem'}}>
      <strong>🔄 Альтернативы:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {alternatives.map((id) => {
          const node = nodeMap.get(id);
          return (
            <li key={id}>
              {node ? <Link to={node.link}>{node.title}</Link> : <span>{id}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
