import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export function Forever() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.12]);
  const [burst, setBurst] = useState(false);
  const [burstParticles, setBurstParticles] = useState<{ id: number; x: number; y: number; angle: number; size: number; hue: number }[]>([]);
  const idRef = useRef(0);

  const handleForever = () => {
    setBurst(true);
    const particles = Array.from({ length: 40 }, (_, i) => {
      idRef.current++;
      return {
        id: idRef.current,
        x: 50,
        y: 50,
        angle: (i / 40) * 360,
        size: 8 + Math.random() * 16,
        hue: 320 + Math.random() * 60,
      };
    });
    setBurstParticles(particles);
    setTimeout(() => setBurstParticles([]), 3000);
    setTimeout(() => setBurst(false), 400);
  };

  return (
    <section
      ref={ref}
      id="forever"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", padding: "8rem 1.5rem" }}
    >
      {/* Falling stars */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 17 + 3) % 100}%`,
              top: "-5%",
              width: i % 5 === 0 ? "3px" : "2px",
              height: i % 5 === 0 ? "3px" : "2px",
              borderRadius: "50%",
              background: i % 3 === 0 ? "oklch(0.75 0.3 345)" : "oklch(0.95 0.05 320)",
              boxShadow: "0 0 10px currentColor",
              color: i % 3 === 0 ? "oklch(0.75 0.3 345)" : "oklch(0.95 0.05 320)",
            }}
            animate={{ y: ["0vh", "115vh"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5 + (i % 6), repeat: Infinity, delay: i * 0.35, ease: "linear" }}
          />
        ))}
      </div>

      {/* Heart burst particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <AnimatePresence>
          {burstParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0.5, x: "50vw", y: "50vh" }}
              animate={{
                opacity: 0, scale: 0,
                x: `calc(50vw + ${Math.cos(p.angle * Math.PI / 180) * (80 + Math.random() * 120)}px)`,
                y: `calc(50vh + ${Math.sin(p.angle * Math.PI / 180) * (80 + Math.random() * 120)}px)`,
              }}
              exit={{}}
              transition={{ duration: 1.5 + Math.random() * 1, ease: "easeOut" }}
              style={{ position: "absolute", left: 0, top: 0, fontSize: `${p.size}px`, color: `oklch(0.75 0.3 ${p.hue})` }}
            >
              ♥
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Radial gradient that pulses */}
      <motion.div
        animate={{ opacity: burst ? 0.6 : 0.15, scale: burst ? 1.3 : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, oklch(0.72 0.28 340 / 0.4), transparent 60%)",
        }}
      />

      <motion.div
        style={{ y, scale, position: "relative", zIndex: 10, maxWidth: "64rem", margin: "0 auto", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 1.5rem" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}
        >
          VIII — The End is Just a Door
        </motion.div>

        {/* Big heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ fontSize: "5rem", marginTop: "2rem", lineHeight: 1 }}
          className="animate-heartbeat"
        >
          ♥
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80, filter: "blur(30px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "2.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 9vw, 9rem)", fontStyle: "italic", lineHeight: 1 }}
        >
          <span className="gradient-text">If the stars went out</span>
          <br />
          <motion.span
            className="text-glow-soft"
            style={{ color: "var(--foreground)", display: "inline-block" }}
            animate={{ textShadow: ["0 0 20px oklch(0.95 0.05 320 / 0.2)", "0 0 60px oklch(0.95 0.05 320 / 0.6)", "0 0 20px oklch(0.95 0.05 320 / 0.2)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            I'd still find you.
          </motion.span>
        </motion.h2>

        {/* The Forever button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          onClick={handleForever}
          data-hover
          className="animate-pulse-glow"
          style={{
            marginTop: "4rem",
            padding: "2rem 4rem", borderRadius: "9999px",
            background: "var(--gradient-neon)",
            boxShadow: "0 0 60px oklch(0.72 0.28 340 / 0.6), 0 0 120px oklch(0.55 0.25 305 / 0.4)",
            border: "none", cursor: "none",
            color: "var(--foreground)",
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4rem)",
            fontStyle: "italic", letterSpacing: "0.05em",
            position: "relative", overflow: "hidden",
          }}
        >
          <motion.span
            animate={burst ? { scale: [1, 0.9, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            Forever
          </motion.span>
          <motion.div
            style={{ position: "absolute", inset: 0, background: "oklch(1 0 0 / 0)", borderRadius: "9999px" }}
            animate={burst ? { background: ["oklch(1 0 0 / 0)", "oklch(1 0 0 / 0.15)", "oklch(1 0 0 / 0)"] } : {}}
            transition={{ duration: 0.4 }}
          />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 1.4 }}
          style={{ marginTop: "4rem", maxWidth: "28rem", fontFamily: "var(--font-display)", fontSize: "1.125rem", fontStyle: "italic", color: "var(--muted-foreground)", textAlign: "center", lineHeight: 1.7 }}
        >
          — Yours, in every timeline.<br />
          In every universe that ever was.
        </motion.p>

        {/* Orbiting hearts */}
        <div style={{ position: "relative", width: "300px", height: "100px", marginTop: "3rem" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{ position: "absolute", left: "50%", top: "50%", color: `oklch(0.72 0.28 340 / ${0.3 + i * 0.1})`, fontSize: `${0.7 + i * 0.1}rem` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ transform: `translateX(${50 + i * 20}px)` }}>♥</div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5em", color: "oklch(0.72 0.04 300 / 0.4)" }}>
          made with love · 2026 · ♥
        </div>
      </motion.div>
    </section>
  );
}
