import React, {useEffect, useRef} from 'react';

function useMermaidZoom() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const closeOverlay = () => {
    overlayRef.current?.remove();
    overlayRef.current = null;
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.docusaurus-mermaid-container');
      if (!target || overlayRef.current) return;
      const svg = target.querySelector('svg');
      if (!svg) return;

      const overlay = document.createElement('div');
      overlay.className = 'mermaid-zoom-overlay';
      overlay.onclick = (e) => { if (e.target === overlay) closeOverlay(); };

      const container = document.createElement('div');
      container.className = 'mermaid-zoom-container';
      const cloned = svg.cloneNode(true) as SVGElement;
      cloned.removeAttribute('width');
      cloned.removeAttribute('height');
      container.appendChild(cloned);
      overlay.appendChild(container);
      document.body.appendChild(overlay);
      overlayRef.current = overlay;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      closeOverlay();
    };
  }, []);
}

export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  useMermaidZoom();
  return <>{children}</>;
}
