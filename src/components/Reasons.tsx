import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const REASONS = [
  "твоя улыбка меняет любой день",
  "ты смеёшься над моими глупыми шутками",
  "ты честная, даже когда это сложно",
  "твои глаза, когда ты думаешь о чём-то своём",
  "ты умеешь молчать вместе — и это не неловко",
  "ты заботишься о людях по-настоящему",
  "как ты рассказываешь о себе",
  "ты не боишься быть собой",
  "твой голос — мой любимый звук",
  "ты помнишь маленькие важные вещи",
  "ты делаешь меня лучше",
  "рядом с тобой я не боюсь быть уязвимым",
  "ты красивая — и даже не знаешь насколько",
  "твоё любопытство ко всему",
  "ты умеешь прощать",
  "как ты жестикулируешь, когда рассказываешь что-то",
  "ты пахнешь теплом",
  "ты веришь в меня",
  "рядом с тобой всегда тихо и хорошо",
  "ты — мой дом",
];

export function Reasons() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [last, setLast] = useState<{ i: number; text: string } | null>(null);

  const reveal = (i: number) => {
    if (revealed.includes(i)) return;
    setRevealed(r => [...r, i]);
    setLast({ i, text: REASONS[i % REASONS.length] });
    setTimeout(() => setLast(null), 3500);
  };

  return (
    <section id="reasons" className="section" style={{ background:"var(--cream)" }}>
      <div className="wc-blob" style={{ width:500,height:500,background:"var(--mint)",top:"10%",right:"-10%",zIndex:0 }} />

      <div className="section-inner" style={{ position:"relative", maxWidth:"60rem" }}>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-20%" }}
          transition={{ duration:1 }}
          style={{ textAlign:"center", marginBottom:"1rem" }}
        >
          <div className="label" style={{ marginBottom:"1rem" }}>причины</div>
          <h2 style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"clamp(2.5rem,7vw,5rem)", color:"var(--brown)" }}>
            Почему я тебя люблю
          </h2>
          <p style={{ fontFamily:"var(--ff-body)", fontStyle:"italic", color:"var(--brown-lt)", marginTop:"0.75rem", fontSize:"0.95rem" }}>
            нажимай на карточки — внутри каждой причина ♥
          </p>
        </motion.div>
        <div className="divider"><div className="divider-icon">❀</div></div>

        {/* Toast popup */}
        <AnimatePresence>
          {last && (
            <motion.div
              key={last.i}
              initial={{ opacity:0, y:20, scale:0.9 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:-20, scale:0.9 }}
              transition={{ duration:0.5, ease:[0.34,1.56,0.64,1] }}
              style={{
                position:"fixed", bottom:"2rem", left:"50%", transform:"translateX(-50%)",
                zIndex:100, background:"#fff",
                borderLeft:"3px solid var(--rose)",
                borderRadius:"0.75rem",
                padding:"1rem 1.5rem",
                boxShadow:"var(--shadow-lift)",
                maxWidth:"min(360px,90vw)",
                pointerEvents:"none",
              }}
            >
              <div className="label" style={{ marginBottom:"0.4rem", color:"var(--rose)" }}>причина {last.i + 1}</div>
              <div style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"1.05rem", color:"var(--brown)", lineHeight:1.5 }}>
                {last.text}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid of flippable cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.75rem" }}>
          <style>{`@media(min-width:480px){.rg{grid-template-columns:repeat(5,1fr)!important}} @media(min-width:720px){.rg{grid-template-columns:repeat(7,1fr)!important}}`}</style>
          <div className="rg" style={{ display:"contents" }}>
            {REASONS.map((_, i) => {
              const done = revealed.includes(i);
              return (
                <motion.button
                  key={i}
                  data-hover
                  onClick={() => reveal(i)}
                  initial={{ opacity:0, scale:0.7 }}
                  whileInView={{ opacity:1, scale:1, transition:{ delay: i*0.03, duration:0.5, ease:[0.34,1.56,0.64,1] } }}
                  viewport={{ once:true }}
                  whileHover={{ scale: done ? 1 : 1.12, rotate: done ? 0 : (i%2===0?3:-3) }}
                  whileTap={{ scale:0.9 }}
                  style={{
                    aspectRatio:"1",
                    borderRadius:"0.75rem",
                    border:"none",
                    background: done
                      ? "linear-gradient(135deg,var(--rose),var(--caramel))"
                      : "var(--parchment)",
                    boxShadow: done ? "0 4px 16px rgba(232,165,152,0.45)" : "var(--shadow-soft)",
                    cursor:"none",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize: done ? "1.1rem" : "0.85rem",
                    color: done ? "#fff" : "var(--brown-lt)",
                    fontFamily:"var(--ff-mono)",
                    transition:"background 0.4s, box-shadow 0.4s",
                    position:"relative",
                  }}
                >
                  <motion.span
                    key={`${i}-${done}`}
                    initial={{ scale:0, rotate:-15 }}
                    animate={{ scale:1, rotate:0 }}
                    transition={{ duration:0.4, ease:[0.34,1.56,0.64,1] }}
                  >
                    {done ? "♥" : String(i+1).padStart(2,"0")}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {revealed.length > 0 && (
          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            style={{ textAlign:"center", marginTop:"1.5rem", fontFamily:"var(--ff-body)", fontStyle:"italic", color:"var(--brown-lt)", fontSize:"0.9rem" }}
          >
            открыто {revealed.length} из {REASONS.length} причин
          </motion.p>
        )}
      </div>
    </section>
  );
}
