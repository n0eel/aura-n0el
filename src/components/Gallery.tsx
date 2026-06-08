import { motion } from "framer-motion";
import { useRef } from "react";
import mem1 from "../assets/memory-1.jpg";
import mem2 from "../assets/memory-2.jpg";
import mem3 from "../assets/memory-3.jpg";
import mem4 from "../assets/memory-4.jpg";
import mem5 from "../assets/memory-5.jpg";
import mem6 from "../assets/memory-6.jpg";

const photos = [
  { src: mem1, caption: "first night out", rot: -6, x: -40, y: 0 },
  { src: mem3, caption: "sunday morning", rot: 5, x: 30, y: 40 },
  { src: mem2, caption: "rain & neon", rot: -3, x: 60, y: -30 },
  { src: mem5, caption: "midnight drive", rot: 8, x: -50, y: 50 },
  { src: mem4, caption: "december, ours", rot: -7, x: 20, y: -20 },
  { src: mem6, caption: "the question", rot: 4, x: -30, y: 30 },
];

export function Gallery() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>III — Scrapbook</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7rem)", fontStyle: "italic" }}>
            Polaroids
          </h2>
          <p style={{ marginTop: "1.5rem", maxWidth: "28rem", margin: "1.5rem auto 0", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            Drag them around. They're yours to keep.
          </p>
        </motion.div>

        <div
          ref={constraintsRef}
          style={{ position: "relative", minHeight: "700px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
        >
          <style>{`@media(min-width:768px){.pg{grid-template-columns:repeat(3,1fr);gap:1.5rem}}`}</style>
          <div className="pg" style={{ display: "contents" }}>
            {photos.map((p, i) => (
              <motion.div
                key={i}
                drag
                dragMomentum={false}
                dragElastic={0.15}
                dragConstraints={constraintsRef}
                initial={{ opacity: 0, y: 80, rotate: p.rot * 2, scale: 0.9 }}
                whileInView={{
                  opacity: 1, y: 0, rotate: p.rot,
                  x: p.x * 0.3,
                  transition: { duration: 1.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
                }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 50, transition: { duration: 0.4 } }}
                whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100, cursor: "grabbing" }}
                viewport={{ once: true }}
                data-hover
                style={{
                  position: "relative", cursor: "grab",
                  background: "oklch(0.95 0.02 320)",
                  padding: "0.75rem", paddingBottom: "3.5rem",
                  borderRadius: "2px",
                  boxShadow: "0 25px 60px -15px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(1 0 0 / 0.05)",
                  touchAction: "none", userSelect: "none",
                }}
              >
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5", background: "var(--background)" }}>
                  <img
                    src={p.src} alt={p.caption} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.85) contrast(1.08)" }}
                    draggable={false}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, oklch(0 0 0 / 0.35))", pointerEvents: "none" }} />
                </div>
                <div style={{
                  position: "absolute", bottom: "0.9rem", left: 0, right: 0,
                  textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1rem",
                  fontStyle: "italic", color: "oklch(0.1 0.02 280 / 0.75)",
                }}>
                  {p.caption}
                </div>

                {/* Tape strip decoration */}
                <div style={{
                  position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)",
                  width: "60px", height: "18px", borderRadius: "2px",
                  background: "oklch(0.85 0.1 320 / 0.6)",
                  backdropFilter: "blur(4px)",
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
