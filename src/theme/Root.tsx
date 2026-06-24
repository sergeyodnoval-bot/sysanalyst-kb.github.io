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

      let scale = 1;
      let panX = 0;
      let panY = 0;
      let isDragging = false;
      let startX = 0;
      let startY = 0;

      const overlay = document.createElement('div');
      overlay.className = 'mermaid-zoom-overlay';

      const controls = document.createElement('div');
      controls.className = 'mz-controls';
      controls.innerHTML = `
        <button class="mz-btn" data-action="zoom-out" title="Уменьшить">−</button>
        <span class="mz-scale">100%</span>
        <button class="mz-btn" data-action="zoom-in" title="Увеличить">+</button>
        <button class="mz-btn" data-action="reset" title="Сбросить">⟲</button>
        <button class="mz-btn mz-btn-close" data-action="close" title="Закрыть">✕</button>
      `;

      const wrapper = document.createElement('div');
      wrapper.className = 'mz-wrapper';

      const container = document.createElement('div');
      container.className = 'mz-container';

      const cloned = svg.cloneNode(true) as SVGElement;
      cloned.removeAttribute('width');
      cloned.removeAttribute('height');
      container.appendChild(cloned);
      wrapper.appendChild(container);
      overlay.append(controls, wrapper);
      document.body.appendChild(overlay);
      overlayRef.current = overlay;

      const updateTransform = () => {
        container.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
        controls.querySelector('.mz-scale')!.textContent = `${Math.round(scale * 100)}%`;
      };

      const zoomAtPoint = (newScale: number, cx: number, cy: number) => {
        const rect = wrapper.getBoundingClientRect();
        const mx = cx - rect.left;
        const my = cy - rect.top;
        panX = mx - (mx - panX) * (newScale / scale);
        panY = my - (my - panY) * (newScale / scale);
        scale = Math.min(Math.max(newScale, 0.1), 10);
        updateTransform();
      };

      controls.onclick = (e) => {
        const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'close') { closeOverlay(); return; }
        if (action === 'zoom-in') { zoomAtPoint(scale * 1.4, window.innerWidth / 2, window.innerHeight / 2); return; }
        if (action === 'zoom-out') { zoomAtPoint(scale / 1.4, window.innerWidth / 2, window.innerHeight / 2); return; }
        if (action === 'reset') { scale = 1; panX = 0; panY = 0; updateTransform(); return; }
      };

      overlay.onwheel = (e) => {
        if ((e.target as HTMLElement).closest('.mz-btn, .mz-scale')) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 / 1.2 : 1.2;
        zoomAtPoint(scale * delta, e.clientX, e.clientY);
      };

      overlay.onmousedown = (e) => {
        if ((e.target as HTMLElement).closest('.mz-btn, .mz-scale')) return;
        if (e.target === overlay) { closeOverlay(); return; }
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        wrapper.style.cursor = 'grabbing';
      };

      document.onmousemove = (e) => {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateTransform();
      };

      document.onmouseup = () => {
        isDragging = false;
        wrapper.style.cursor = '';
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeOverlay();
        if (e.key === '=' || e.key === '+') zoomAtPoint(scale * 1.4, window.innerWidth / 2, window.innerHeight / 2);
        if (e.key === '-') zoomAtPoint(scale / 1.4, window.innerWidth / 2, window.innerHeight / 2);
        if (e.key === '0') { scale = 1; panX = 0; panY = 0; updateTransform(); }
      };
      document.addEventListener('keydown', onKeyDown);
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
