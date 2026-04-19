import { useEffect } from 'react';

export default function useCursor() {
  useEffect(() => {
    const blob = document.getElementById('cur');
    const dot  = document.getElementById('cur-dot');
    if (!blob || !dot) return;

    let mx = 0, my = 0;
    let bx = 0, by = 0;
    let vx = 0, vy = 0;
    let af;

    const mv = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const tick = () => {
      vx = mx - bx;
      vy = my - by;
      bx += vx * 0.12;
      by += vy * 0.12;

      const speed = Math.sqrt(vx * vx + vy * vy);
      const stretch = Math.min(1 + speed * 0.04, 1.9);
      const squish  = 1 / stretch;
      const angle   = Math.atan2(vy, vx) * (180 / Math.PI);

      blob.style.left = bx + 'px';
      blob.style.top  = by + 'px';
      blob.style.transform = `translate(-50%,-50%) rotate(${angle}deg) scaleX(${stretch}) scaleY(${squish})`;

      const r = Math.round(244 - speed * 1.2);
      const g = Math.round(114 - speed * 0.8);
      blob.style.background = `rgb(${Math.max(r,180)}, ${Math.max(g,60)}, 182)`;

      af = requestAnimationFrame(tick);
    };

    af = requestAnimationFrame(tick);
    document.addEventListener('mousemove', mv);

    const onEnter = () => {
      blob.style.width  = '52px';
      blob.style.height = '52px';
      blob.style.background = '#e879f9';
      blob.style.borderRadius = '40% 60% 55% 45% / 50% 45% 55% 50%';
      blob.style.opacity = '0.75';
    };
    const onLeave = () => {
      blob.style.width  = '28px';
      blob.style.height = '28px';
      blob.style.borderRadius = '50%';
      blob.style.opacity = '1';
    };

    const els = document.querySelectorAll('button, a, [data-h]');
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', mv);
      cancelAnimationFrame(af);
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}
