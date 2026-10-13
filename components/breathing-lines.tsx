"use client";

import * as React from "react";

/**
 * Ruhige Wellenlinien, die im Rhythmus eines langsamen Atemzugs
 * (zehn Sekunden) an- und abschwellen. Links, wo der Text steht, bleiben
 * sie still. Bei „Bewegung reduzieren“ wird ein Standbild gezeichnet.
 */
export function BreathingLines({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINES = 28;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const draw = (ms: number) => {
      const t = ms / 1000;
      const breath = 0.5 - 0.5 * Math.cos((t / 10) * Math.PI * 2);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);
        const bell = Math.sin(p * Math.PI);
        const baseY = height * (0.14 + p * 0.8);
        const amp = (10 + 52 * bell) * (0.62 + 0.5 * breath) * Math.min(1.25, height / 780);

        ctx.beginPath();
        for (let x = 0; x <= width + 8; x += 8) {
          const u = x / width;
          const envelope = Math.pow(u, 1.5);
          const y =
            baseY +
            Math.sin(u * 3.1 + t * 0.17 + i * 0.31) * amp * envelope +
            Math.sin(u * 6.7 - t * 0.12 + i * 0.67) * amp * 0.26 * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const strong = i % 4 === 0;
        const alpha = (strong ? 0.2 : 0.16) + 0.3 * bell * (0.7 + 0.3 * breath);
        ctx.strokeStyle = strong ? `rgba(68, 86, 74, ${alpha})` : `rgba(147, 163, 140, ${alpha + 0.1})`;
        ctx.lineWidth = strong ? 1.2 : 1;
        ctx.stroke();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(2500);
    };

    const loop = (ms: number) => {
      if (visible) draw(ms);
      frame = requestAnimationFrame(loop);
    };

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    resize();

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    viewObserver.observe(canvas);

    if (reduce) draw(2500);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
