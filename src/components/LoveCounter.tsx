import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const START = new Date("2026-03-13T19:20:00");

function diff(now: Date) {
  const ms = Math.max(0, now.getTime() - START.getTime());
  const s  = Math.floor(ms / 1000);
  return { days: Math.floor(s/86400), hours: Math.floor((s%86400)/3600), minutes: Math.floor((s%3600)/60), seconds: s%60 };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.75rem" }}>
      <div style={{
        background:"#fff", borderRadius:"1rem",
        padding:"1.25rem 1rem", minWidth:90,
        boxShadow:"var(--shadow-card)",
        position:"relative", overflow:"hidden",
      }}>
        {/* Fold line */}
        <div style={{ position:"absolute", left:0, right:0, top:"50%", height:1, background:"var(--parchment)", zIndex:1 }} />

        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y:-28, opacity:0, scale:0.85 }}
            animate={{ y:0,  opacity:1, scale:1 }}
            exit={{   y: 28, opacity:0, scale:0.85 }}
            transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
            style={{
              fontFamily:"var(--ff-display)",
              fontSize:"clamp(2.8rem,7vw,5rem)",
              fontVariantNumeric:"tabular-nums",
              color:"var(--brown)",
              lineHeight:1,
              textAlign:"center",
              position:"relative", zIndex:2,
            }}
          >
            {String(value).padStart(2,"0")}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="label">{label}</div>
    </div>
  );
}

export function LoveCounter() {
  const [t, setT]       = useState({ days:0, hours:0, minutes:0, seconds:0 });
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setT(diff(new Date()));
    const id = setInterval(() => {
      setT(diff(new Date()));
      setPulse(true);
      setTimeout(() => setPulse(false), 250);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" style={{ background:"var(--parchment)" }}>
      <div className="wc-blob" style={{ width:400,height:400,background:"var(--blush)",top:"5%",left:"-8%",zIndex:0 }} />

      <div className="section-inner" style={{ position:"relative", textAlign:"center", maxWidth:"60rem" }}>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-20%" }}
          transition={{ duration:1 }}
        >
          <div className="label" style={{ marginBottom:"1rem" }}>уже вместе</div>
          <h2 style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"clamp(2.5rem,7vw,5rem)", color:"var(--brown)" }}>
            Столько времени с тобой
          </h2>
        </motion.div>
        <div className="divider"><div className="divider-icon">♥</div></div>

        <motion.div
          initial={{ opacity:0, scale:0.95 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true, margin:"-15%" }}
          transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
        >
          {/* Beating heart with glow */}
          <motion.div
            animate={{ scale: pulse ? 1.2 : 1 }}
            transition={{ duration:0.25 }}
            style={{ fontSize:"3.5rem", marginBottom:"2.5rem", lineHeight:1 }}
          >
            ♥
          </motion.div>

          <div style={{
            display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem",
            justifyItems:"center",
          }}>
            <style>{`@media(min-width:560px){.cnt-grid{grid-template-columns:repeat(4,1fr)!important}}`}</style>
            <div className="cnt-grid" style={{ display:"contents" }}>
              <Digit value={t.days}    label="дней"    />
              <Digit value={t.hours}   label="часов"   />
              <Digit value={t.minutes} label="минут"   />
              <Digit value={t.seconds} label="секунд"  />
            </div>
          </div>

          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ duration:2, delay:0.5 }}
            style={{ marginTop:"2.5rem", fontFamily:"var(--ff-body)", fontStyle:"italic", color:"var(--brown-lt)", fontSize:"1.05rem" }}
          >
            и каждую секунду — я счастлив рядом с тобой{" "}
            <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:1.4, repeat:Infinity }}>♥</motion.span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
