import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Sparkle { id: number; x: number; y: number; char: string; hue: number }
const CHARS = ["♥", "✿", "✦", "˚", "·", "♡"];

export function CustomCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(mx, { stiffness: 350, damping: 30 });
  const ry = useSpring(my, { stiffness: 350, damping: 30 });
  const dx = useSpring(mx, { stiffness: 900, damping: 40 });
  const dy = useSpring(my, { stiffness: 900, damping: 40 });

  const [hover, setHover] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX); my.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-hover]"));

      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (Math.random() > 0.55) return;
        idRef.current++;
        const id = idRef.current;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const jx = e.clientX + (Math.random() - 0.5) * 24;
        const jy = e.clientY + (Math.random() - 0.5) * 24;
        setSparkles(s => [...s.slice(-12), { id, x: jx, y: jy, char, hue: 0 }]);
        setTimeout(() => setSparkles(s => s.filter(p => p.id !== id)), 700);
      });
    };

    document.documentElement.style.cursor = "none";
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, [mx, my]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches) return null;

  return (
    <>
      {sparkles.map(s => (
        <motion.span
          key={s.id}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 0, y: -22 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: "fixed", left: s.x, top: s.y,
            pointerEvents: "none", zIndex: 9997,
            transform: "translate(-50%,-50%)",
            fontSize: "0.85rem", color: "var(--rose)",
            userSelect: "none",
          }}
        >{s.char}</motion.span>
      ))}

      {/* Ring */}
      <motion.div style={{
        position: "fixed", left: 0, top: 0, zIndex: 9998, pointerEvents: "none",
        x: rx, y: ry, translateX: "-50%", translateY: "-50%",
        width: hover ? 52 : 36, height: hover ? 52 : 36,
        borderRadius: "50%",
        border: `1.5px solid ${hover ? "var(--rose)" : "var(--caramel)"}`,
        opacity: 0.7,
        transition: "width 0.3s, height 0.3s, border-color 0.3s",
      }} />

      {/* Dot */}
      <motion.div style={{
        position: "fixed", left: 0, top: 0, zIndex: 9999, pointerEvents: "none",
        x: dx, y: dy, translateX: "-50%", translateY: "-50%",
        width: hover ? 8 : 6, height: hover ? 8 : 6,
        borderRadius: "50%",
        background: hover ? "var(--rose)" : "var(--brown)",
        transition: "width 0.2s, height 0.2s, background 0.2s",
      }} />
    </>
  );
}
