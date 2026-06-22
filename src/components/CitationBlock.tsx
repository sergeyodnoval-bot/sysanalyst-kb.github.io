import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function CitationBlock(): React.ReactElement | null {
  const {frontMatter} = useDoc();
  const officialUrl = frontMatter.official_url as string | undefined;
  const version = frontMatter.version as string | undefined;
  const publishedDate = frontMatter.published_date as string | undefined;
  const citationKey = frontMatter.citation_key as string | undefined;

  if (!officialUrl && !version && !publishedDate && !citationKey) return null;

  return (
    <div style={{
      marginTop: '1rem', padding: '12px 16px', background: '#f8fafc',
      border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13,
    }}>
      <strong style={{display: 'block', marginBottom: 8}}>📎 Ссылка на оригинал</strong>

      {officialUrl && (
        <div style={{marginBottom: 4}}>
          <span style={{color: '#666'}}>Официальный сайт: </span>
          <a href={officialUrl} target="_blank" rel="noopener noreferrer">{officialUrl}</a>
        </div>
      )}

      {version && (
        <div style={{marginBottom: 4}}>
          <span style={{color: '#666'}}>Версия: </span>{version}
        </div>
      )}

      {publishedDate && (
        <div style={{marginBottom: 4}}>
          <span style={{color: '#666'}}>Дата публикации: </span>{publishedDate}
        </div>
      )}

      {citationKey && (
        <div style={{marginTop: 8}}>
          <div style={{fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4}}>Цитирование:</div>
          <pre style={{
            background: '#fff', padding: 8, borderRadius: 4, fontSize: 12,
            overflowX: 'auto', margin: 0, whiteSpace: 'pre-wrap',
          }}>
{`[^${citationKey}]: ${frontMatter.title || citationKey}. ${officialUrl ? `URL: ${officialUrl}` : ''}${publishedDate ? ` (дата обращения: ${new Date().toLocaleDateString('ru-RU')})` : ''}`}
          </pre>
        </div>
      )}
    </div>
  );
}
