import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const START = new Date("2026-03-13T19:20:00");

function diff(now: Date) {
  const ms = Math.max(0, now.getTime() - START.getTime());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Cell({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* Card backing */}
      <div style={{
        position: "relative", overflow: "hidden", padding: "1.5rem 1rem",
        borderRadius: "1rem",
        background: "oklch(0.08 0.03 285 / 0.5)",
        border: `1px solid oklch(${accent ? "0.72 0.28 340" : "1 0 0"} / 0.12)`,
        minWidth: "100px",
        boxShadow: accent ? "0 0 30px oklch(0.72 0.28 340 / 0.15), inset 0 0 20px oklch(0.72 0.28 340 / 0.05)" : "none",
      }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: -30, opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ y: 30, opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
              textAlign: "center",
              textShadow: "0 0 20px oklch(0.72 0.28 340 / 0.5)",
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ marginTop: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--muted-foreground)" }}>
        {label}
      </div>
    </div>
  );
}

export function LoveCounter() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setT(diff(new Date()));
    const id = setInterval(() => {
      setT(diff(new Date()));
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: "relative", padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>V — Eternity</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontStyle: "italic" }}>
            Days Together
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "4rem", position: "relative" }}
        >
          {/* Glow pulse with heartbeat */}
          <motion.div
            animate={{ opacity: pulse ? 0.5 : 0.15, scale: pulse ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", inset: "-2rem", borderRadius: "2rem",
              background: "radial-gradient(ellipse, oklch(0.72 0.28 340 / 0.25), transparent 70%)",
              filter: "blur(20px)", pointerEvents: "none",
            }}
          />

          <div
            className="glass-strong"
            style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem",
              borderRadius: "2rem", padding: "3rem 2rem",
              boxShadow: "var(--shadow-cinematic)",
              position: "relative",
            }}
          >
            <style>{`@media(min-width:640px){.cc{grid-template-columns:repeat(4,1fr);padding:4rem}}`}</style>
            <div className="cc" style={{ display: "contents" }}>
              <Cell value={t.days} label="days" />
              <Cell value={t.hours} label="hours" />
              <Cell value={t.minutes} label="minutes" />
              <Cell value={t.seconds} label="seconds" accent />
            </div>

            {/* Corner hearts */}
            {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
              <motion.div
                key={i}
                style={{ position: "absolute", top: i < 2 ? "1rem" : "auto", bottom: i >= 2 ? "1rem" : "auto", left: i % 2 === 0 ? "1rem" : "auto", right: i % 2 === 1 ? "1rem" : "auto", color: "oklch(0.72 0.28 340 / 0.3)", fontSize: "0.75rem" }}
                animate={pulse ? { scale: 1.3, color: "oklch(0.72 0.28 340 / 0.7)" } : { scale: 1, color: "oklch(0.72 0.28 340 / 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                ♥
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4 }}
          style={{ marginTop: "2.5rem", fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--muted-foreground)", fontSize: "1rem" }}
        >
          and counting, infinitely.{" "}
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>♥</motion.span>
        </motion.p>
      </div>
    </section>
  );
}
