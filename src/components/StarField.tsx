import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; z: number; r: number; hue: number; tw: number; vx: number; vy: number;
}

export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let stars: Star[] = [];
    let shooters: { x: number; y: number; vx: number; vy: number; life: number; max: number }[] = [];
    let hearts: { x: number; y: number; vy: number; size: number; life: number; hue: number }[] = [];
    let mouseX = 0, mouseY = 0;
    let W = 0, H = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.width = innerWidth * dpr;
      H = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        z: Math.random() * 0.8 + 0.2, r: Math.random() * 1.8 + 0.3,
        hue: 280 + Math.random() * 80, tw: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.05, vy: (Math.random() - 0.5) * 0.05,
      }));
    };
    resize();
    addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / innerWidth - 0.5) * 35;
      mouseY = (e.clientY / innerHeight - 0.5) * 35;
      // occasionally spawn floating heart
      if (Math.random() < 0.04) {
        hearts.push({
          x: e.clientX * (W / innerWidth),
          y: e.clientY * (H / innerHeight),
          vy: -(0.8 + Math.random() * 1.2),
          size: 8 + Math.random() * 16,
          life: 0, hue: 340 + Math.random() * 20,
        });
      }
    };
    addEventListener("mousemove", onMove);

    let last = performance.now();
    let shootTimer = 0;

    const drawHeart = (cx: number, cy: number, size: number, alpha: number, hue: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `oklch(0.75 0.3 ${hue})`;
      ctx.shadowColor = `oklch(0.72 0.28 ${hue})`;
      ctx.shadowBlur = size * 2;
      ctx.beginPath();
      const s = size * 0.05;
      ctx.moveTo(cx, cy + s * 4);
      ctx.bezierCurveTo(cx - s * 8, cy - s * 4, cx - s * 18, cy + s * 2, cx, cy + s * 10);
      ctx.bezierCurveTo(cx + s * 18, cy + s * 2, cx + s * 8, cy - s * 4, cx, cy + s * 4);
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      ctx.clearRect(0, 0, W, H);

      // Nebula layers
      const nebulaGrad = ctx.createRadialGradient(W * 0.3, H * 0.3, 0, W * 0.3, H * 0.3, W * 0.5);
      nebulaGrad.addColorStop(0, `oklch(0.3 0.2 295 / 0.06)`);
      nebulaGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad; ctx.fillRect(0, 0, W, H);

      const n2 = ctx.createRadialGradient(W * 0.75, H * 0.65, 0, W * 0.75, H * 0.65, W * 0.4);
      n2.addColorStop(0, `oklch(0.45 0.25 340 / 0.05)`);
      n2.addColorStop(1, "transparent");
      ctx.fillStyle = n2; ctx.fillRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        s.tw += dt * 1.5;
        s.x += s.vx + mouseX * s.z * 0.01;
        s.y += s.vy + mouseY * s.z * 0.01;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;

        const op = 0.35 + Math.sin(s.tw) * 0.45;
        const px = s.x + mouseX * s.z;
        const py = s.y + mouseY * s.z;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, s.r * 7 * s.z);
        grad.addColorStop(0, `oklch(0.95 0.1 ${s.hue} / ${op})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(px, py, s.r * 7 * s.z, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `oklch(0.98 0.05 ${s.hue} / ${op})`;
        ctx.beginPath(); ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2); ctx.fill();
      }

      // Shooting stars
      shootTimer += dt;
      if (shootTimer > 3 + Math.random() * 5) {
        shootTimer = 0;
        shooters.push({
          x: Math.random() * W, y: Math.random() * H * 0.4,
          vx: -350 - Math.random() * 250, vy: 200 + Math.random() * 200,
          life: 0, max: 1.4,
        });
      }
      shooters = shooters.filter((sh) => {
        sh.life += dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
        const t = sh.life / sh.max;
        if (t >= 1) return false;
        const op = Math.sin(t * Math.PI);
        const tx = sh.x - sh.vx * 0.18, ty = sh.y - sh.vy * 0.18;
        const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grad.addColorStop(0, `oklch(0.95 0.25 340 / ${op})`);
        grad.addColorStop(0.5, `oklch(0.75 0.3 345 / ${op * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
        return true;
      });

      // Floating hearts
      hearts = hearts.filter((h) => {
        h.life += dt; h.y += h.vy;
        const t = h.life * 0.7;
        if (t >= 1) return false;
        const op = Math.sin(t * Math.PI) * 0.7;
        drawHeart(h.x, h.y, h.size, op, h.hue);
        return true;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden
    />
  );
}
