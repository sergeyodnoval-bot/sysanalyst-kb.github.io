import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

export default function PracticalTasks(): React.ReactElement | null {
  const {metadata} = useDoc();
  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: {id: string; title: string; type: string; difficulty?: number; estimated_time?: number; link: string}[];
    edges: {from: string; to: string; type: string}[];
  }> | undefined;
  const graphData = graphPlugin?.default;
  if (!graphData) return null;

  const taskNodeMap = new Map(graphData.nodes.filter((n) => n.type === 'task').map((n) => [n.id, n]));

  const taskIds = new Set<string>();
  for (const edge of graphData.edges) {
    if (edge.type === 'enables' && edge.from === metadata.id && taskNodeMap.has(edge.to)) {
      taskIds.add(edge.to);
    }
  }
  if (taskIds.size === 0) return null;

  const tasks = [...taskIds].map((id) => taskNodeMap.get(id)!);

  return (
    <div className="alert alert--success" style={{marginTop: '1rem'}}>
      <strong>⚡ Практические задачи:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={task.link}>{task.title}</Link>
            {task.difficulty && (
              <span style={{color: '#f59e0b', marginLeft: 6, fontSize: 12}}>
                {'★'.repeat(Math.min(task.difficulty, 5))}
              </span>
            )}
            {task.estimated_time && (
              <span style={{color: '#94a3b8', marginLeft: 6, fontSize: 12}}>
                {task.estimated_time} мин
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
