import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function TypicalPitfalls(): React.ReactElement | null {
  const {frontMatter} = useDoc();
  const pitfalls = frontMatter.pitfalls as string[] | undefined;
  if (!pitfalls || pitfalls.length === 0) return null;

  return (
    <div className="alert alert--danger" style={{marginTop: '1rem'}}>
      <strong>⚠️ Типичные ошибки:</strong>
      <ul style={{marginBottom: 0, marginTop: '0.5rem'}}>
        {pitfalls.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
