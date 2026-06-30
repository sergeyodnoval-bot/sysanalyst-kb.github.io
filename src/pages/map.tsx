import React, {useMemo, useState, useEffect} from 'react';
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

const CURRENT_YEAR = 2026;

const CATEGORY_COLORS: Record<string, string> = {
  basics: '#4f8ef7',
  integration: '#22c55e',
  modeling: '#f59e0b',
  requirements: '#ef4444',
  architecture: '#8b5cf6',
  soft: '#ec4899',
  testing: '#06b6d4',
  process: '#a855f7',
  other: '#6b7280',
};

const EDGE_STYLES: Record<string, {style: React.CSSProperties; markerEnd?: {type: MarkerType}}> = {
  prerequisite: {
    style: {stroke: '#94a3b8', strokeWidth: 2},
    markerEnd: {type: MarkerType.ArrowClosed, color: '#94a3b8'},
  },
  enables: {
    style: {stroke: '#10b981', strokeWidth: 2, strokeDasharray: '6 3'},
    markerEnd: {type: MarkerType.ArrowClosed, color: '#10b981'},
  },
  required_for: {
    style: {stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '10 4 3 4'},
    markerEnd: {type: MarkerType.ArrowClosed, color: '#f59e0b'},
  },
  next_task: {
    style: {stroke: '#8b5cf6', strokeWidth: 3},
    markerEnd: {type: MarkerType.ArrowClosed, color: '#8b5cf6'},
  },
  alternative: {
    style: {stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4'},
  },
  leads_to: {
    style: {stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '8 4'},
    markerEnd: {type: MarkerType.ArrowClosed, color: '#3b82f6'},
  },
};

function ArticleNode({data}: NodeProps) {
  const color = CATEGORY_COLORS[data.category] || CATEGORY_COLORS.other;
  return (
    <Link to={data.link} style={{textDecoration: 'none'}} onClick={(e) => e.stopPropagation()}>
      <div style={{
        background: '#fff',
        border: `2px solid ${color}`,
        borderRadius: 8,
        padding: '10px 16px',
        minWidth: 140,
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}>
        <div style={{fontSize: 14, fontWeight: 600, color: '#1a1a2e'}}>{data.label}</div>
        <div style={{
          fontSize: 11, marginTop: 4, background: color, color: '#fff',
          display: 'inline-block', padding: '1px 8px', borderRadius: 10,
        }}>
          LVL {data.level}
        </div>
      </div>
    </Link>
  );
}

function getHexPath(w: number, h: number): string {
  const cx = w / 2, cy = h / 2;
  const rx = w * 0.45, ry = h * 0.45;
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    pts.push([cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)]);
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + 'Z';
}

function TechnologyNode({data}: NodeProps) {
  const w = 160, h = 80;
  const path = getHexPath(w, h);
  const isNew = data.first_seen && (CURRENT_YEAR - data.first_seen) <= 3;

  const strokeMap: Record<string, string> = {
    standard: '#10b981',
    tool: '#059669',
    methodology: '#34d399',
  };
  const color = strokeMap[data.tech_type] || '#10b981';

  const dashMap: Record<string, string> = {
    methodology: '6 4',
  };
  const strokeDash = dashMap[data.tech_type] || undefined;

  return (
    <Link to={data.link} style={{textDecoration: 'none'}} onClick={(e) => e.stopPropagation()}>
      <div style={{position: 'relative', width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg width={w} height={h} style={{position: 'absolute', top: 0, left: 0}}>
          <path d={path} fill="#fff" stroke={color} strokeWidth={2}
            strokeDasharray={strokeDash}
          />
        </svg>
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 130}}>
          <div style={{fontSize: 13, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.2}}>{data.label}</div>
          {isNew && (
            <span style={{
              fontSize: 10, background: '#ef4444', color: '#fff',
              padding: '1px 6px', borderRadius: 8, marginTop: 2, display: 'inline-block',
            }}>
              🆕 NEW
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function TaskNode({data}: NodeProps) {
  const diff = data.difficulty || 2;
  const size = 60 + diff * 12;
  return (
    <Link to={data.link} style={{textDecoration: 'none'}} onClick={(e) => e.stopPropagation()}>
      <div style={{
        background: '#fff',
        border: '2px solid #f59e0b',
        borderRadius: '50%',
        width: size,
        height: size * 0.75,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        padding: 4,
      }}>
        <div style={{fontSize: 11, fontWeight: 600, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.2}}>
          {data.label}
        </div>
        <div style={{fontSize: 10, color: '#f59e0b', marginTop: 2}}>
          {'★'.repeat(Math.min(diff, 5))}
        </div>
      </div>
    </Link>
  );
}

const nodeTypes = {article: ArticleNode, technology: TechnologyNode, task: TaskNode};

interface FilterState {
  articles: boolean;
  technologies: {standard: boolean; tool: boolean; methodology: boolean};
  tasks: {show: boolean; difficulty: number[]};
  showAlternatives: boolean;
}

type GraphNodeData = {
  id: string; title: string; label: string; level: number;
  category: string; type: string; tech_type?: string;
  difficulty?: number; first_seen?: number; link: string;
};

type GraphEdgeData = {from: string; to: string; type: string};

export default function KnowledgeMap(): React.ReactElement {
  const graphPlugin = useAllPluginInstancesData('knowledge-graph') as Record<string, {
    nodes: GraphNodeData[];
    edges: GraphEdgeData[];
  }> | undefined;
  const graphData = graphPlugin?.default;
  useEffect(() => {
    const hasData = !!graphData;
    const n = graphData?.nodes?.length ?? 0;
    const e = graphData?.edges?.length ?? 0;
    const div = document.createElement('div');
    div.id = 'kg-debug';
    div.style.cssText = 'position:fixed;bottom:8px;right:8px;background:#1a1a2e;color:#fff;padding:8px 12px;border-radius:6px;font:12px monospace;z-index:9999;';
    div.textContent = `KG: data=${hasData} nodes=${n} edges=${e}`;
    document.body.appendChild(div);

    const firstPos = layoutedNodes[0]?.position;
    const firstNode = layoutedNodes[0]?.id;
    const log = document.createElement('div');
    log.id = 'kg-log';
    log.style.cssText = 'position:fixed;bottom:48px;right:8px;background:#1a1a2e;color:#0f0;padding:8px 12px;border-radius:6px;font:11px monospace;z-index:9999;max-width:500px;white-space:pre-wrap;';
    log.textContent = `nodes: ${nodes.length}\nedges: ${edges.length}\nfiltered: ${filteredNodes.length}|${filteredEdges.length}\nlayouted: ${layoutedNodes.length}\nfirstNode: ${firstNode}\nfirstPos: ${JSON.stringify(firstPos)}\nhasNaN: ${layoutedNodes.some(n => Number.isNaN(n.position.x) || Number.isNaN(n.position.y))}`;
    document.body.appendChild(log);
    return () => { div.remove(); log.remove(); };
  });

  const [filters, setFilters] = useState<FilterState>({
    articles: true,
    technologies: {standard: true, tool: true, methodology: true},
    tasks: {show: true, difficulty: [1, 2, 3, 4, 5]},
    showAlternatives: false,
  });

  const {nodes: filteredNodes, edges: filteredEdges} = useMemo(() => {
    if (!graphData) return {nodes: [], edges: []};

    const nodeTypeFilter = (n: GraphNodeData): boolean => {
      if (n.type === 'article') return filters.articles;
      if (n.type === 'technology') {
        const sub = filters.technologies;
        return sub[n.tech_type as keyof typeof sub] ?? false;
      }
      if (n.type === 'task') {
        if (!filters.tasks.show) return false;
        return filters.tasks.difficulty.includes(n.difficulty || 2);
      }
      return false;
    };

    const edgeTypeFilter = (e: GraphEdgeData): boolean => {
      if (e.type === 'alternative') return filters.showAlternatives;
      return true;
    };

    const visibleNodes = graphData.nodes.filter(nodeTypeFilter);
    const visibleIds = new Set(visibleNodes.map((n) => n.id));
    const visibleEdges = graphData.edges.filter(
      (e) => visibleIds.has(e.from) && visibleIds.has(e.to) && edgeTypeFilter(e),
    );

    const nodes = visibleNodes.map((n) => ({
      id: n.id,
      type: n.type,
      data: {
        label: n.label,
        category: n.category,
        level: n.level,
        type: n.type,
        tech_type: n.tech_type,
        difficulty: n.difficulty,
        first_seen: n.first_seen,
        link: n.link,
      },
      position: {x: 0, y: 0},
    }));

    const edges = visibleEdges.map((e, i) => {
      const edgeStyle = EDGE_STYLES[e.type] || EDGE_STYLES.prerequisite;
      return {
        id: `e${i}`,
        source: e.from,
        target: e.to,
        type: 'smoothstep',
        animated: e.type !== 'alternative',
        ...edgeStyle,
      };
    });

    return {nodes, edges};
  }, [graphData, filters]);

  const layoutedNodes = useMemo(() => {
    if (filteredNodes.length === 0) return [];
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({rankdir: 'LR', nodesep: 60, ranksep: 100});
    for (const node of filteredNodes) {
      g.setNode(node.id, {width: 160, height: 80});
    }
    for (const edge of filteredEdges) {
      g.setEdge(edge.source, edge.target);
    }
    dagre.layout(g);
    return filteredNodes.map((node) => {
      const pos = g.node(node.id);
      return {...node, position: {x: pos.x - 80, y: pos.y - 40}};
    });
  }, [filteredNodes, filteredEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => { if (layoutedNodes.length) setNodes(layoutedNodes); }, [layoutedNodes, setNodes]);
  useEffect(() => { if (filteredEdges.length) setEdges(filteredEdges); }, [filteredEdges, setEdges]);

  const toggleTech = (key: keyof FilterState['technologies']) => {
    setFilters((f) => ({...f, technologies: {...f.technologies, [key]: !f.technologies[key]}}));
  };

  const toggleTaskDifficulty = (d: number) => {
    setFilters((f) => {
      const current = f.tasks.difficulty;
      const next = current.includes(d) ? current.filter((x) => x !== d) : [...current, d];
      return {...f, tasks: {...f.tasks, difficulty: next.length ? next : current}};
    });
  };

  return (
    <Layout title="Карта знаний" description="Интерактивная карта знаний системного аналитика">
      <div style={{display: 'flex', height: 'calc(100vh - 60px)'}}>
        <div style={{
          width: 220, background: '#f8fafc', borderRight: '1px solid #e2e8f0',
          padding: 16, overflowY: 'auto', flexShrink: 0,
        }}>
          <h4 style={{margin: '0 0 12px', fontSize: 14}}>Фильтры</h4>

          <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, cursor: 'pointer'}}>
            <input type="checkbox" checked={filters.articles}
              onChange={() => setFilters((f) => ({...f, articles: !f.articles}))} />
            <span style={{color: '#3b82f6', fontWeight: 600}}>Статьи</span>
          </label>

          <div style={{marginBottom: 8}}>
            <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
              <input type="checkbox" checked={filters.technologies.standard}
                onChange={() => toggleTech('standard')} />
              <span style={{color: '#10b981', fontWeight: 600}}>Стандарты</span>
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4, marginLeft: 20}}>
              <input type="checkbox" checked={filters.technologies.tool}
                onChange={() => toggleTech('tool')} />
              Инструменты
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginLeft: 20}}>
              <input type="checkbox" checked={filters.technologies.methodology}
                onChange={() => toggleTech('methodology')} />
              Методологии
            </label>
          </div>

          <div style={{marginBottom: 12}}>
            <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
              <input type="checkbox" checked={filters.tasks.show}
                onChange={() => setFilters((f) => ({...f, tasks: {...f.tasks, show: !f.tasks.show}}))} />
              <span style={{color: '#f59e0b', fontWeight: 600}}>Задачи</span>
            </label>
            {filters.tasks.show && (
              <div style={{marginLeft: 20, fontSize: 12}}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <label key={d} style={{display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginBottom: 2}}>
                    <input type="checkbox" checked={filters.tasks.difficulty.includes(d)}
                      onChange={() => toggleTaskDifficulty(d)} />
                    {'★'.repeat(d)}
                  </label>
                ))}
              </div>
            )}
          </div>

          <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer'}}>
            <input type="checkbox" checked={filters.showAlternatives}
              onChange={() => setFilters((f) => ({...f, showAlternatives: !f.showAlternatives}))} />
            Альтернативы
          </label>

          <div style={{marginTop: 24, fontSize: 11, color: '#94a3b8', lineHeight: 1.6}}>
            <div><span style={{color: '#94a3b8'}}>━━━</span> prerequisite</div>
            <div><span style={{color: '#10b981', borderBottom: '2px dashed #10b981'}}>╌╌╌</span> enables</div>
            <div><span style={{color: '#f59e0b', borderBottom: '2px dashed #f59e0b'}}>╌╌╌</span> required_for</div>
            <div><span style={{color: '#3b82f6', borderBottom: '2px dashed #3b82f6'}}>╌╌╌</span> leads_to</div>
            <div><span style={{color: '#8b5cf6', fontWeight: 'bold'}}>━━━</span> next_task</div>
          </div>
        </div>

        <div style={{flex: 1, height: '100%'}}>
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
              nodeColor={(nd) => {
                const d = nd.data as Record<string, string>;
                return CATEGORY_COLORS[d.category] || CATEGORY_COLORS.other;
              }}
              style={{width: 200, height: 150}}
            />
          </ReactFlow>
        </div>
      </div>
    </Layout>
  );
}
