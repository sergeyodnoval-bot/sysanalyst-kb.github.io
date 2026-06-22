import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import ArticleLink from './ArticleLink';

function useDocsMap(): Record<string, {title?: string; path: string}> {
  const allDocs = useAllDocsData();
  const map: Record<string, {title?: string; path: string}> = {};
  const defaultPlugin = allDocs['default'];
  if (!defaultPlugin) return map;
  for (const version of defaultPlugin.versions ?? []) {
    for (const doc of version.docs ?? []) {
      map[doc.id] = {path: doc.path};
    }
  }
  return map;
}

export default function NextStepsList(): React.ReactElement | null {
  const {frontMatter} = useDoc();
  const leadsTo = frontMatter.leads_to as string[] | undefined;
  if (!leadsTo || leadsTo.length === 0) return null;

  const docsMap = useDocsMap();

  return (
    <div className="alert alert--success" style={{marginTop: '1rem'}}>
      <strong>🚀 Куда двигаться дальше:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {leadsTo.map((id) => (
          <li key={id}>
            <ArticleLink docId={id} docsMap={docsMap} />
          </li>
        ))}
      </ul>
    </div>
  );
}
