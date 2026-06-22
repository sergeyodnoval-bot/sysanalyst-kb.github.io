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
      map[doc.id] = {title: doc.title, path: doc.path};
    }
  }
  return map;
}

export default function PrerequisitesList(): React.ReactElement | null {
  const {frontMatter} = useDoc();
  const prereqs = frontMatter.prerequisites as string[] | undefined;
  if (!prereqs || prereqs.length === 0) return null;

  const docsMap = useDocsMap();

  return (
    <div className="alert alert--info" style={{marginTop: '2rem'}}>
      <strong>📖 Что нужно знать до этой статьи:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {prereqs.map((id) => (
          <li key={id}>
            <ArticleLink docId={id} docsMap={docsMap} />
          </li>
        ))}
      </ul>
    </div>
  );
}
