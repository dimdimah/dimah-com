"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas equivalent of easternboss hero visual: twinkling starfield +
 * rotating particle sphere (their build uses three.js r187; this is a
 * dependency-free 2D canvas implementation of the same look).
 */
export default function ParticleSphere() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    // Fibonacci-sphere points
    const N = 720;
    const points = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({ phi, theta });
    }

    const stars = [];
    const seedStars = () => {
      stars.length = 0;
      const count = Math.min(Math.floor(w / 5), 320);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.1 + 0.2,
          a: Math.random() * Math.PI * 2,
          s: Math.random() * 0.02 + 0.004,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = () => {
      t += reduce ? 0 : 0.0032;
      ctx.clearRect(0, 0, w, h);

      // Starfield
      for (const s of stars) {
        s.a += s.s;
        ctx.globalAlpha = 0.18 + Math.abs(Math.sin(s.a)) * 0.6;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particle sphere
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.34;
      for (const p of points) {
        const th = p.theta + t * 2.4;
        const x3 = Math.sin(p.phi) * Math.cos(th);
        const y3 = Math.cos(p.phi);
        const z3 = Math.sin(p.phi) * Math.sin(th);
        const depth = (z3 + 1) / 2;
        ctx.globalAlpha = 0.12 + depth * 0.85;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(cx + x3 * R, cy + y3 * R, 0.5 + depth * 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="block h-full w-full" />;
}
