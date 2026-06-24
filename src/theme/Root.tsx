import React, {useEffect} from 'react';

function useMermaidZoom() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.mermaid');
      if (!target) return;
      const svg = target.querySelector('svg');
      if (!svg) return;

      const overlay = document.createElement('div');
      overlay.className = 'mermaid-zoom-overlay';
      overlay.innerHTML = '<div class="mermaid-zoom-container">' + svg.outerHTML + '</div>';
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const overlay = document.querySelector('.mermaid-zoom-overlay');
        if (overlay) overlay.remove();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  useMermaidZoom();
  return <>{children}</>;
}
