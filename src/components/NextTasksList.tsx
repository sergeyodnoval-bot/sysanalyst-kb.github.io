import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

export default function NextTasksList(): React.ReactElement | null {
  const {frontMatter} = useDoc();
  const nextTasks = frontMatter.next_tasks as string[] | undefined;
  if (!nextTasks || nextTasks.length === 0) return null;

  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: {id: string; title: string; type: string; link: string}[];
  }> | undefined;
  const graphData = graphPlugin?.default;
  const taskNodeMap = new Map(
    (graphData?.nodes || []).filter((n) => n.type === 'task').map((n) => [n.id, n]),
  );

  return (
    <div className="alert alert--success" style={{marginTop: '1rem'}}>
      <strong>➡️ Следующие задачи:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {nextTasks.map((id) => {
          const node = taskNodeMap.get(id);
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
