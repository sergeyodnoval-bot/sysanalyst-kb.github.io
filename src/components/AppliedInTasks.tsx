import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

export default function AppliedInTasks(): React.ReactElement | null {
  const {metadata} = useDoc();
  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: {id: string; title: string; type: string; difficulty?: number; link: string}[];
    edges: {from: string; to: string; type: string}[];
  }> | undefined;
  const graphData = graphPlugin?.default;
  if (!graphData) return null;

  const taskNodeMap = new Map(graphData.nodes.filter((n) => n.type === 'task').map((n) => [n.id, n]));

  const taskIds = new Set<string>();
  for (const edge of graphData.edges) {
    if (edge.type === 'required_for' && edge.from === metadata.id && taskNodeMap.has(edge.to)) {
      taskIds.add(edge.to);
    }
  }

  if (taskIds.size === 0) {
    const usedInTasks = metadata.frontMatter?.used_in_tasks as string[] | undefined;
    if (!usedInTasks || usedInTasks.length === 0) return null;
    for (const tid of usedInTasks) {
      if (taskNodeMap.has(tid)) taskIds.add(tid);
    }
    if (taskIds.size === 0) return null;
  }

  return (
    <div className="alert alert--success" style={{marginTop: '1rem'}}>
      <strong>⚡ Где применяется:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {[...taskIds].map((id) => {
          const task = taskNodeMap.get(id)!;
          return (
            <li key={id}>
              <Link to={task.link}>{task.title}</Link>
              {task.difficulty && (
                <span style={{color: '#f59e0b', marginLeft: 6, fontSize: 12}}>
                  {'★'.repeat(Math.min(task.difficulty, 5))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
