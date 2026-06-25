import React from 'react';
import Link from '@docusaurus/Link';
import {getDocLabel} from './docLabels';

interface DocInfo {
  title?: string;
  path: string;
}

interface ArticleLinkProps {
  docId: string;
  docsMap: Record<string, DocInfo>;
}

export default function ArticleLink({docId, docsMap}: ArticleLinkProps): React.ReactElement {
  let doc = docsMap[docId];
  if (!doc && docId.includes('/')) {
    const shortId = docId.split('/').pop()!;
    doc = docsMap[shortId];
  }
  if (!doc) {
    return <span className="badge badge--secondary">{getDocLabel(docId)}</span>;
  }
  return <Link to={doc.path}>{doc.title || getDocLabel(docId)}</Link>;
}
