import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import mem1 from "../assets/memory-1.jpg";
import mem2 from "../assets/memory-2.jpg";
import mem4 from "../assets/memory-4.jpg";
import mem6 from "../assets/memory-6.jpg";

const events = [
  { date: "X, 2026", title: "First Glance", text: "A crowded café, a borrowed pen, a smile that rearranged the room.", img: mem1, emoji: "✦" },
  { date: "X, 2026", title: "First Kiss", text: "Rain on neon glass. The city held its breath, and so did we.", img: mem2, emoji: "♥" },
  { date: "X, 2026", title: "Slow Dance", text: "Fairy lights, no music — just the rhythm of being known.", img: mem4, emoji: "✿" },
  { date: "X, 2026", title: "Forever", text: "Beneath a violet sky, a question, a yes, an entire universe.", img: mem6, emoji: "∞" },
];

function Item({ ev, i }: { ev: (typeof events)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px", once: false });
  const left = i % 2 === 0;
  const [open, setOpen] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  return (
    <div ref={ref} style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr", gap: "2rem", padding: "5rem 0" }}>
      <style>{`@media(min-width:768px){.tl-${i}{grid-template-columns:1fr 1fr;gap:4rem;padding:7rem 0}}`}</style>
      <div className={`tl-${i}`} style={{ display: "contents" }}>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: left ? -80 : 80, filter: "blur(20px)" }}
          animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0.2, filter: "blur(10px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", order: left ? 1 : 2 }}
        >
          {/* Chapter number */}
          <motion.div
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "oklch(0.72 0.28 340 / 0.5)", letterSpacing: "0.5em", textTransform: "uppercase" }}
          >
            {String(i + 1).padStart(2, "0")} /{" "}{ev.emoji}
          </motion.div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.4em", color: "var(--primary)", marginTop: "0.75rem" }}>
            {ev.date}
          </div>
          <h3
            className="gradient-text"
            style={{ marginTop: "1rem", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontStyle: "italic", lineHeight: 1 }}
          >
            {ev.title}
          </h3>
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "1px", background: "var(--gradient-neon)", marginTop: "1.5rem", borderRadius: "9999px", boxShadow: "0 0 10px oklch(0.72 0.28 340 / 0.5)" }}
          />
          <p style={{ marginTop: "1.5rem", maxWidth: "28rem", lineHeight: 1.8, color: "var(--muted-foreground)", fontSize: "0.95rem" }}>
            {ev.text}
          </p>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: "blur(20px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0.2, filter: "blur(10px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ position: "relative", order: left ? 2 : 1 }}
          onHoverStart={() => setImgHover(true)}
          onHoverEnd={() => setImgHover(false)}
        >
          {/* Glow behind image */}
          <motion.div
            animate={imgHover ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute", inset: "-20px", borderRadius: "2rem",
              background: "radial-gradient(ellipse at center, oklch(0.72 0.28 340 / 0.25), transparent 70%)",
              filter: "blur(20px)", pointerEvents: "none",
            }}
          />

          <button
            onClick={() => setOpen(true)}
            data-hover
            style={{
              position: "relative", display: "block", width: "100%",
              overflow: "hidden", borderRadius: "1.5rem",
              border: "1px solid oklch(1 0 0 / 0.08)",
              aspectRatio: "4/5", cursor: "none",
              boxShadow: "var(--shadow-cinematic)",
            }}
          >
            <motion.img
              src={ev.img} alt={ev.title} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              animate={{ scale: imgHover ? 1.12 : 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 30%, oklch(0.04 0.015 280 / 0.8))",
              opacity: imgHover ? 0.4 : 0.7, transition: "opacity 0.5s",
            }} />

            {/* Hover reveal */}
            <motion.div
              animate={imgHover ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--soft-glow)" }}>
                open memory ↗
              </span>
              <span style={{ fontSize: "1.5rem" }}>{ev.emoji}</span>
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.04 0.015 280 / 0.88)", backdropFilter: "blur(24px)", padding: "1.5rem", cursor: "none" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(30px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={ev.img} alt={ev.title} style={{ maxHeight: "85vh", maxWidth: "90vw", borderRadius: "1.5rem", objectFit: "contain", boxShadow: "0 0 80px oklch(0.72 0.28 340 / 0.35)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--muted-foreground)", fontSize: "1.1rem", whiteSpace: "nowrap" }}>
                {ev.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Timeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-20%" });

  return (
    <section id="timeline" style={{ position: "relative", padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          style={{ textAlign: "center", marginBottom: "6rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>II — Memory</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7rem)", fontStyle: "italic" }}>
            A Timeline of Us
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: "1px", transform: "translateX(-50%)", background: "linear-gradient(180deg, transparent, oklch(0.72 0.28 340 / 0.35), oklch(0.55 0.25 305 / 0.25), transparent)", pointerEvents: "none" }} />
          {events.map((ev, i) => <Item key={ev.title} ev={ev} i={i} />)}
        </div>
      </div>
    </section>
  );
}
