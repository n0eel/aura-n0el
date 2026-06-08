import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 40 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-hover]"));

      // heart trail on move
      trailId.current++;
      const id = trailId.current;
      setTrail((prev) => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setTrail((prev) => prev.filter((p) => p.id !== id)), 600);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.classList.add("cursor-none-all");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Trail hearts */}
      {trail.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.8, scale: 0.6 }}
          animate={{ opacity: 0, scale: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: t.x,
            top: t.y,
            pointerEvents: "none",
            zIndex: 9997,
            transform: "translate(-50%, -50%)",
            fontSize: `${8 + i * 2}px`,
            color: `oklch(0.75 0.3 ${345 - i * 8})`,
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Ring */}
      <motion.div
        style={{
          position: "fixed", left: 0, top: 0, pointerEvents: "none", zIndex: 9998,
          x: sx, y: sy, translateX: "-50%", translateY: "-50%",
          width: hovering ? 70 : clicking ? 30 : 44,
          height: hovering ? 70 : clicking ? 30 : 44,
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.75 0.3 345 / 0.55), oklch(0.55 0.25 305 / 0.15) 60%, transparent 70%)",
          mixBlendMode: "screen",
          transition: "width 0.3s, height 0.3s",
        }}
      />

      {/* Dot */}
      <motion.div
        style={{
          position: "fixed", left: 0, top: 0, pointerEvents: "none", zIndex: 9999,
          x: dotX, y: dotY, translateX: "-50%", translateY: "-50%",
          width: clicking ? 3 : 6, height: clicking ? 3 : 6,
          borderRadius: "50%",
          background: "var(--soft-glow)",
          boxShadow: "0 0 12px oklch(0.95 0.05 320 / 0.9)",
          transition: "width 0.15s, height 0.15s",
        }}
      />
    </>
  );
}
