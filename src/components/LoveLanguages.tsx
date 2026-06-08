import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const languages = [
  {
    icon: "💬",
    title: "Words of Affirmation",
    quote: "Every morning I find new words to describe how extraordinary you are, and still — I always fall short.",
    color: "oklch(0.72 0.28 340)",
    glow: "oklch(0.72 0.28 340 / 0.3)",
    delay: 0,
  },
  {
    icon: "⏳",
    title: "Quality Time",
    quote: "I want all the boring moments. The grocery runs, the traffic, the 3am silence. As long as it's with you.",
    color: "oklch(0.65 0.25 305)",
    glow: "oklch(0.65 0.25 305 / 0.3)",
    delay: 0.12,
  },
  {
    icon: "🎁",
    title: "Acts of Service",
    quote: "Let me carry all the heavy things. Let me be the one who makes the hard days softer.",
    color: "oklch(0.6 0.22 270)",
    glow: "oklch(0.6 0.22 270 / 0.3)",
    delay: 0.24,
  },
  {
    icon: "🤝",
    title: "Physical Touch",
    quote: "Your hand in mine rewrites the entire dictionary of safety. Nothing compares.",
    color: "oklch(0.75 0.3 0)",
    glow: "oklch(0.75 0.3 0 / 0.3)",
    delay: 0.36,
  },
];

function Card({ lang, i }: { lang: (typeof languages)[number]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay: lang.delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-hover
      style={{
        position: "relative", borderRadius: "1.5rem", padding: "2rem",
        background: "oklch(0.1 0.03 285 / 0.5)",
        border: `1px solid ${hovered ? lang.color + " / 0.4)" : "oklch(1 0 0 / 0.08)"}`,
        backdropFilter: "blur(20px)",
        overflow: "hidden", cursor: "none",
        transition: "border-color 0.4s",
      }}
    >
      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute", inset: 0, borderRadius: "1.5rem",
          background: `radial-gradient(ellipse at 50% 0%, ${lang.glow}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Orbiting mini hearts when hovered */}
      {hovered && [0, 1, 2].map((j) => (
        <motion.div
          key={j}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: Math.cos((j / 3) * Math.PI * 2) * 60, y: Math.sin((j / 3) * Math.PI * 2) * 60 - 60 }}
          transition={{ duration: 1.5, delay: j * 0.2 }}
          style={{ position: "absolute", top: "3rem", left: "50%", color: lang.color, fontSize: "1rem", pointerEvents: "none" }}
        >
          ♥
        </motion.div>
      ))}

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "2.5rem", lineHeight: 1, marginBottom: "1.25rem" }}
      >
        {lang.icon}
      </motion.div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: lang.color, marginBottom: "1rem" }}>
        {lang.title}
      </h3>

      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.7, color: "var(--muted-foreground)" }}>
        "{lang.quote}"
      </p>

      {/* Bottom accent line */}
      <motion.div
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${lang.color}, transparent)` }}
      />
    </motion.div>
  );
}

export function LoveLanguages() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section style={{ position: "relative", padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>V.V — Devotion</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontStyle: "italic" }}>
            Love Languages
          </h2>
          <p style={{ marginTop: "1.5rem", maxWidth: "30rem", margin: "1.5rem auto 0", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            All five. For you. Every day.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.25rem" }}>
          <style>{`@media(min-width:640px){.ll{grid-template-columns:repeat(2,1fr)}} @media(min-width:1024px){.ll{grid-template-columns:repeat(4,1fr)}}`}</style>
          <div className="ll" style={{ display: "contents" }}>
            {languages.map((lang, i) => <Card key={i} lang={lang} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
