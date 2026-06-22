import React, {useMemo} from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  type NodeProps,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from '@dagrejs/dagre';
import Layout from '@theme/Layout';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';

const CATEGORY_COLORS: Record<string, string> = {
  basics: '#4f8ef7',
  integration: '#22c55e',
  modeling: '#f59e0b',
  requirements: '#ef4444',
  architecture: '#8b5cf6',
  soft: '#ec4899',
  other: '#6b7280',
};

function CustomNode({data}: NodeProps) {
  const color = CATEGORY_COLORS[data.category] || CATEGORY_COLORS.other;
  return (
    <Link
      to={data.link}
      style={{textDecoration: 'none'}}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          background: '#fff',
          border: `2px solid ${color}`,
          borderRadius: 8,
          padding: '10px 16px',
          minWidth: 140,
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{fontSize: 14, fontWeight: 600, color: '#1a1a2e'}}>
          {data.label}
        </div>
        <div
          style={{
            fontSize: 11,
            marginTop: 4,
            color: '#666',
            background: color,
            color: '#fff',
            display: 'inline-block',
            padding: '1px 8px',
            borderRadius: 10,
          }}
        >
          LVL {data.level}
        </div>
      </div>
    </Link>
  );
}

const nodeTypes = {custom: CustomNode};

export default function KnowledgeMap(): React.ReactElement {
  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: {id: string; title: string; label: string; level: number; category: string}[];
    edges: {from: string; to: string; type: string}[];
  }> | undefined;
  const graphData = graphPlugin?.default;

  const {nodes: initialNodes, edges: initialEdges} = useMemo(() => {
    if (!graphData) return {nodes: [], edges: []};

    const nodes: Node[] = graphData.nodes.map((n) => ({
      id: n.id,
      type: 'custom',
      data: {
        label: n.label,
        category: n.category,
        level: n.level,
        link: `/docs/${n.id}`,
      },
      position: {x: 0, y: 0},
    }));

    const edges: Edge[] = graphData.edges.map((e, i) => ({
      id: `e${i}`,
      source: e.from,
      target: e.to,
      type: 'smoothstep',
      animated: true,
      markerEnd: {type: MarkerType.ArrowClosed},
      style: {stroke: '#888'},
    }));

    return {nodes, edges};
  }, [graphData]);

  const layoutedNodes = useMemo(() => {
    if (initialNodes.length === 0) return [];

    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({rankdir: 'LR', nodesep: 60, ranksep: 100});

    for (const node of initialNodes) {
      g.setNode(node.id, {width: 160, height: 70});
    }
    for (const edge of initialEdges) {
      g.setEdge(edge.source, edge.target);
    }

    dagre.layout(g);

    return initialNodes.map((node) => {
      const pos = g.node(node.id);
      return {
        ...node,
        position: {x: pos.x - 80, y: pos.y - 35},
      };
    });
  }, [initialNodes, initialEdges]);

  const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Layout title="Карта знаний" description="Интерактивная карта знаний системного аналитика">
      <div style={{height: 'calc(100vh - 60px)', width: '100%'}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background />
          <MiniMap
            nodeColor={(node) => CATEGORY_COLORS[(node.data as Record<string, string>).category] || CATEGORY_COLORS.other}
            style={{width: 200, height: 150}}
          />
        </ReactFlow>
      </div>
    </Layout>
  );
}
