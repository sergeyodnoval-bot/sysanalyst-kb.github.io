import React from 'react';
import Link from '@docusaurus/Link';

interface DocInfo {
  title?: string;
  path: string;
}

interface ArticleLinkProps {
  docId: string;
  docsMap: Record<string, DocInfo>;
}

function formatLabel(docId: string): string {
  const map: Record<string, string> = {
    'basics/http-protocol': 'HTTP',
    'basics/client-server': 'Клиент-сервер',
    'integration/api-rest-basics': 'REST API',
    'integration/api-openapi': 'OpenAPI',
    'modeling/bpmn': 'BPMN',
  };
  return map[docId] || docId.split('/').pop() || docId;
}

export default function ArticleLink({docId, docsMap}: ArticleLinkProps): React.ReactElement {
  const doc = docsMap[docId];
  if (!doc) {
    return <span className="badge badge--secondary">{formatLabel(docId)}</span>;
  }
  return <Link to={doc.path}>{doc.title || formatLabel(docId)}</Link>;
}
