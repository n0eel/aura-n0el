import { useEffect, useRef } from "react";

interface Petal {
  x: number; y: number; vx: number; vy: number;
  size: number; angle: number; va: number;
  opacity: number; hue: number; sway: number; swayT: number;
}

export function Petals() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0, H = 0;
    const petals: Petal[] = [];

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.width = innerWidth * dpr;
      H = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    };
    resize();
    addEventListener("resize", resize);

    const spawn = (): Petal => ({
      x: Math.random() * W,
      y: -20,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.6 + Math.random() * 1.2,
      size: (10 + Math.random() * 14) * (devicePixelRatio || 1),
      angle: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.03,
      opacity: 0.55 + Math.random() * 0.35,
      hue: 340 + Math.random() * 30,      // rosy pinks
      sway: 0.6 + Math.random() * 0.8,
      swayT: Math.random() * Math.PI * 2,
    });

    // seed initial petals spread across screen
    for (let i = 0; i < 28; i++) {
      const p = spawn();
      p.y = Math.random() * H;
      petals.push(p);
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;

      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grd.addColorStop(0, `hsl(${p.hue} 80% 88%)`);
      grd.addColorStop(0.5, `hsl(${p.hue} 75% 80%)`);
      grd.addColorStop(1, `hsl(${p.hue} 60% 72% / 0.1)`);

      ctx.fillStyle = grd;
      ctx.beginPath();
      // teardrop / petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.4, p.size * 0.7, p.size * 0.4, 0, p.size * 0.6);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.4, -p.size * 0.7, -p.size * 0.4, 0, -p.size);
      ctx.fill();
      ctx.restore();
    };

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16, 3);
      last = now;

      ctx.clearRect(0, 0, W, H);

      // Spawn new petals occasionally
      if (petals.length < 40 && Math.random() < 0.04 * dt) petals.push(spawn());

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.swayT += 0.018 * dt;
        p.x += (p.vx + Math.sin(p.swayT) * p.sway) * dt;
        p.y += p.vy * dt;
        p.angle += p.va * dt;
        drawPetal(p);
        if (p.y > H + 30) petals.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", inset: 0,
        zIndex: 2, pointerEvents: "none",
        mixBlendMode: "multiply",
      }}
      aria-hidden
    />
  );
}
