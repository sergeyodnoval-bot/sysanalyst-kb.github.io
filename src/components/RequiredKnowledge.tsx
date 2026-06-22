import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';

export default function RequiredKnowledge(): React.ReactElement | null {
  const {frontMatter, metadata} = useDoc();
  const requiresArticles = frontMatter.requires_articles as string[] | undefined;
  const requiresTech = frontMatter.requires_tech as string[] | undefined;

  if ((!requiresArticles || requiresArticles.length === 0) && (!requiresTech || requiresTech.length === 0)) {
    return null;
  }

  const allDocs = useAllDocsData();
  function getDocPath(id: string): string | undefined {
    for (const plugin of Object.values(allDocs)) {
      for (const version of plugin.versions ?? []) {
        for (const doc of version.docs ?? []) {
          if (doc.id === id) return doc.path;
        }
      }
    }
    return undefined;
  }

  const techLinkMap: Record<string, string> = {
    openapi: '/tech/openapi',
    postman: '/tech/postman',
    scrum: '/tech/scrum',
  };

  return (
    <div className="alert alert--info" style={{marginTop: '1rem'}}>
      <strong>📚 Что нужно знать:</strong>

      {requiresArticles && requiresArticles.length > 0 && (
        <>
          <div style={{fontSize: 12, fontWeight: 600, color: '#666', marginTop: '0.5rem', marginBottom: 4}}>Статьи</div>
          <ul style={{margin: 0}}>
            {requiresArticles.map((id) => {
              const path = getDocPath(id);
              return (
                <li key={id}>
                  {path ? <Link to={path}>{id.split('/').pop()}</Link> : <span>{id.split('/').pop()}</span>}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {requiresTech && requiresTech.length > 0 && metadata.pluginId === 'tasks' && (
        <>
          <div style={{fontSize: 12, fontWeight: 600, color: '#666', marginTop: '0.5rem', marginBottom: 4}}>Технологии</div>
          <ul style={{margin: 0}}>
            {requiresTech.map((id) => (
              <li key={id}>
                <Link to={techLinkMap[id] || `/tech/${id}`}>{id}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
