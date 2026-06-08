import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦❋✿⁕";

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let iter = 0;
    const id = setInterval(() => {
      setDisplay(
        text.split("").map((c, i) =>
          i < iter ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join("")
      );
      iter += 0.5;
      if (iter >= text.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [text]);
  return <>{display}</>;
}

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = ["initializing", "loading memories", "rendering love", "almost there"];

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 8 + 3;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setDone(true), 800); }
      setProgress(Math.min(100, p));
      setPhase(Math.floor(Math.min(100, p) / 25));
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--background)", overflow: "hidden",
          }}
          exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Aurora bg */}
          <div style={{ position: "absolute", inset: 0, background: "var(--gradient-aurora)" }} />

          {/* Animated rings */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute", borderRadius: "50%",
                border: `1px solid oklch(0.72 0.28 340 / ${0.15 - i * 0.03})`,
                width: `${200 + i * 120}px`, height: `${200 + i * 120}px`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
              transition={{ rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            />
          ))}

          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", padding: "1.5rem" }}>
            {/* Heart */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "3rem", lineHeight: 1 }}
            >
              ♥
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                letterSpacing: "0.3em",
                textShadow: "0 0 20px oklch(0.72 0.28 340 / 0.6), 0 0 40px oklch(0.55 0.25 305 / 0.4)",
                background: "linear-gradient(135deg, oklch(0.98 0.005 320) 0%, oklch(0.85 0.18 340) 50%, oklch(0.75 0.25 305) 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              <GlitchText text="LUMIÈRE" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--muted-foreground)" }}
            >
              a love letter from the future
            </motion.div>

            {/* Progress bar */}
            <div style={{ width: "16rem", position: "relative" }}>
              <div style={{ height: "1px", background: "oklch(1 0 0 / 0.08)", position: "relative", overflow: "hidden" }}>
                <motion.div
                  style={{
                    position: "absolute", inset: "0 auto 0 0",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, oklch(0.72 0.28 340), oklch(0.55 0.25 305), oklch(0.72 0.28 340))",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s linear infinite",
                    boxShadow: "0 0 20px oklch(0.72 0.28 340 / 0.8), 0 0 40px oklch(0.72 0.28 340 / 0.4)",
                    transition: "width 0.1s",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  {phases[Math.min(phase, phases.length - 1)]}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "oklch(0.72 0.28 340)" }}>
                  {String(Math.round(progress)).padStart(3, "0")}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
