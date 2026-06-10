import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const DREAMS = [
  { emoji: "✈️", title: "Путешествие вдвоём",   text: "Куда угодно. Главное — ты рядом.", color: "var(--rose)",     delay: 0    },
  { emoji: "🌅", title: "Рассвет на берегу",     text: "Встретить рассвет вместе и ни о чём не говорить.", color: "var(--caramel)", delay: 0.08 },
  { emoji: "🏡", title: "Наш уголок",            text: "Место, которое будет пахнуть кофе и звучать тихой музыкой.", color: "var(--sage-deep)", delay: 0.16 },
  { emoji: "📸", title: "Сотни фотографий",      text: "Снимать всё — смешное, тихое, обычное. Особенно обычное.", color: "var(--rose-deep)", delay: 0.24 },
  { emoji: "🌿", title: "Медленные утра",        text: "Кофе, пледы, ты — и никуда не торопиться.", color: "var(--sage-deep)", delay: 0.32 },
  { emoji: "🎭", title: "Новые впечатления",     text: "Концерты, выставки, случайные улицы — всё интересно рядом с тобой.", color: "var(--caramel)", delay: 0.40 },
];

function DreamCard({ d, i }: { d: typeof DREAMS[number]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: d.delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-hover
      style={{
        background: "#fff",
        borderRadius: "1.5rem",
        padding: "2rem",
        boxShadow: hovered ? "var(--shadow-lift)" : "var(--shadow-card)",
        transition: "box-shadow 0.4s, transform 0.4s",
        transform: hovered ? `translateY(-8px) rotate(${i%2===0?0.5:-0.5}deg)` : "none",
        position: "relative", overflow: "hidden",
        cursor: "default",
        borderBottom: `3px solid ${d.color}`,
      }}
    >
      {/* Background bloom on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at top left, ${d.color}18, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 10 : 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "inline-block" }}
      >
        {d.emoji}
      </motion.div>

      <h3 style={{
        fontFamily: "var(--ff-display)", fontStyle: "italic",
        fontSize: "1.35rem", color: "var(--brown)", marginBottom: "0.6rem",
      }}>
        {d.title}
      </h3>

      <p style={{
        fontFamily: "var(--ff-body)", fontStyle: "italic",
        fontSize: "0.9rem", color: "var(--brown-lt)", lineHeight: 1.7,
      }}>
        {d.text}
      </p>

      {/* Corner heart */}
      <motion.div
        animate={{ opacity: hovered ? 0.6 : 0.15, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", bottom: "0.875rem", right: "1rem",
          fontFamily: "var(--ff-mono)", fontSize: "1.1rem", color: d.color,
        }}
      >
        ♥
      </motion.div>
    </motion.div>
  );
}

export function Dreams() {
  const hRef = useRef<HTMLDivElement>(null);
  const hInView = useInView(hRef, { once: true, margin: "-15%" });

  return (
    <section id="dreams" className="section" style={{ background: "var(--parchment)" }}>
      <div className="wc-blob" style={{ width: 500, height: 500, background: "var(--mint)", top: "5%", right: "-10%", zIndex: 0 }} />
      <div className="wc-blob" style={{ width: 400, height: 400, background: "var(--blush)", bottom: "0", left: "-8%", zIndex: 0 }} />

      <div className="section-inner" style={{ position: "relative", maxWidth: "72rem" }}>
        <motion.div
          ref={hRef}
          initial={{ opacity: 0, y: 30 }}
          animate={hInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          <div className="label" style={{ marginBottom: "1rem" }}>мечты</div>
          <h2 style={{
            fontFamily: "var(--ff-display)", fontStyle: "italic",
            fontSize: "clamp(2.5rem,7vw,5.5rem)", color: "var(--brown)",
          }}>
            То, что нас ждёт
          </h2>
          <p style={{
            fontFamily: "var(--ff-body)", fontStyle: "italic",
            color: "var(--brown-lt)", marginTop: "0.75rem", fontSize: "0.95rem",
          }}>
            всё это — я хочу пережить вместе с тобой ♥
          </p>
        </motion.div>

        <div className="divider"><div className="divider-icon">✈</div></div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "1.25rem" }}>
          <style>{`
            @media(min-width:560px){.dg{grid-template-columns:repeat(2,1fr)!important}}
            @media(min-width:900px){.dg{grid-template-columns:repeat(3,1fr)!important}}
          `}</style>
          <div className="dg" style={{ display: "contents" }}>
            {DREAMS.map((d, i) => <DreamCard key={i} d={d} i={i} />)}
          </div>
        </div>

        {/* Footer poem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
          style={{
            marginTop: "4rem", textAlign: "center",
            fontFamily: "var(--ff-display)", fontStyle: "italic",
            fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
            color: "var(--brown-lt)", lineHeight: 1.7,
            maxWidth: "36rem", margin: "4rem auto 0",
          }}
        >
          "У нас ещё столько всего впереди —
          <br />
          и я не могу дождаться."
        </motion.div>
      </div>
    </section>
  );
}
