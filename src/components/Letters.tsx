import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = [
  {
    from: "утром",
    preview: "Когда ты только просыпаешься…",
    text: "Когда ты только просыпаешься, немного недовольная и тёплая — ты самая красивая. Именно в этот момент, когда ты ещё между сном и явью, я понимаю, что мне несказанно повезло.",
    color: "var(--rose)", bg: "#fff5f4",
  },
  {
    from: "в трудный день",
    preview: "Когда всё идёт не так…",
    text: "Когда всё идёт не так — знай, что я здесь. Не чтобы всё исправить. Просто чтобы быть рядом. Ты сильнее, чем думаешь. И я вижу это каждый день.",
    color: "var(--sage-deep)", bg: "#f4faf4",
  },
  {
    from: "когда скучаю",
    preview: "Даже когда ты рядом…",
    text: "Даже когда ты рядом — я иногда скучаю по тебе. По тому, как ты смеёшься до слёз. По тому, как ты думаешь вслух. По тому, как ты засыпаешь с книгой в руках.",
    color: "var(--caramel)", bg: "#fdf8f0",
  },
  {
    from: "навсегда",
    preview: "Я выбираю тебя…",
    text: "Я выбираю тебя. Не потому что должен. Не потому что так получилось. А потому что когда я думаю о будущем — в нём всегда ты. Всегда. Без исключений.",
    color: "var(--rose-deep)", bg: "#fff5f4",
  },
];

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown(""); let i = 0;
    const id = setInterval(() => { i++; setShown(text.slice(0,i)); if(i>=text.length) clearInterval(id); }, 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <>
      {shown}
      <motion.span
        animate={{ opacity:[1,0] }} transition={{ duration:0.5, repeat:Infinity }}
        style={{ display:"inline-block", width:2, height:"1.1em", background:"var(--rose)", marginLeft:2, verticalAlign:"middle", borderRadius:1 }}
      />
    </>
  );
}

export function Letters() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <section id="letters" className="section" style={{ background:"var(--parchment)" }}>
      <div className="wc-blob" style={{ width:450,height:450,background:"var(--blush)",bottom:0,left:"-5%",zIndex:0 }} />

      <div className="section-inner" style={{ position:"relative", maxWidth:"60rem" }}>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-20%" }}
          transition={{ duration:1 }}
          style={{ textAlign:"center", marginBottom:"1rem" }}
        >
          <div className="label" style={{ marginBottom:"1rem" }}>письма</div>
          <h2 style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"clamp(2.5rem,7vw,5rem)", color:"var(--brown)" }}>
            Только для тебя
          </h2>
          <p style={{ fontFamily:"var(--ff-body)", fontStyle:"italic", color:"var(--brown-lt)", marginTop:"0.75rem", fontSize:"0.95rem" }}>
            запечатанные конверты — открой каждый ♥
          </p>
        </motion.div>
        <div className="divider"><div className="divider-icon">✉</div></div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(1,1fr)", gap:"1rem" }}>
          <style>{`@media(min-width:560px){.lg{grid-template-columns:repeat(2,1fr)!important}}`}</style>
          <div className="lg" style={{ display:"contents" }}>
            {LETTERS.map((l,i) => (
              <motion.button
                key={i}
                data-hover
                onClick={() => setOpen(i)}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.1, duration:0.8, ease:[0.16,1,0.3,1] }}
                whileHover={{ y:-5, rotate: i%2===0 ? 0.8 : -0.8 }}
                style={{
                  background:"#fff",
                  borderRadius:"1rem",
                  padding:0, border:"none", cursor:"none",
                  boxShadow:"var(--shadow-card)",
                  overflow:"hidden",
                  textAlign:"left",
                }}
              >
                {/* Envelope flap */}
                <div style={{
                  background:`linear-gradient(135deg,${l.color}33,${l.color}18)`,
                  borderBottom:`1px solid ${l.color}33`,
                  padding:"1rem 1.25rem 0.875rem",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                }}>
                  <span className="label" style={{ color:l.color }}>{l.from}</span>
                  <span style={{ fontSize:"1.5rem" }}>✉</span>
                </div>

                <div style={{ padding:"1.25rem" }}>
                  <p style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"1.05rem", color:"var(--brown-lt)", lineHeight:1.5 }}>
                    {l.preview}
                  </p>
                  <div style={{ marginTop:"1rem", fontFamily:"var(--ff-mono)", fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:l.color, opacity:0.8 }}>
                    нажми чтобы открыть →
                  </div>
                </div>

                {/* Wax seal decoration */}
                <div style={{
                  position:"absolute", bottom:"0.75rem", right:"0.75rem",
                  width:32, height:32, borderRadius:"50%",
                  background:l.color, opacity:0.15,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.8rem", color:"#fff",
                }} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={() => setOpen(null)}
            style={{
              position:"fixed", inset:0, zIndex:200,
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(61,35,20,0.45)",
              backdropFilter:"blur(12px)",
              padding:"1.5rem", cursor:"none",
            }}
          >
            <motion.div
              initial={{ scale:0.85, opacity:0, y:40, rotate:-2 }}
              animate={{ scale:1,    opacity:1, y:0,  rotate:0  }}
              exit={{   scale:0.9,   opacity:0, y:20            }}
              transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: LETTERS[open].bg,
                borderRadius:"1.5rem",
                padding:"2.5rem",
                maxWidth:"min(480px,96vw)",
                width:"100%",
                boxShadow:"var(--shadow-lift)",
                position:"relative",
                borderTop:`4px solid ${LETTERS[open].color}`,
              }}
            >
              {/* Tiny hearts floating */}
              {[...Array(5)].map((_,i) => (
                <motion.span
                  key={i}
                  style={{ position:"absolute", color:LETTERS[open].color, fontSize:"0.8rem", pointerEvents:"none", left:`${15+i*17}%`, top:`${10+(i*23)%60}%`, opacity:0.3 }}
                  animate={{ y:[0,-15,0], opacity:[0.2,0.6,0.2] }}
                  transition={{ duration:2.5+i*0.4, repeat:Infinity, delay:i*0.3 }}
                >♥</motion.span>
              ))}

              <div className="label" style={{ color:LETTERS[open].color, marginBottom:"1.25rem" }}>
                письмо · {LETTERS[open].from}
              </div>

              <p style={{
                fontFamily:"var(--ff-display)", fontStyle:"italic",
                fontSize:"clamp(1.1rem,3vw,1.45rem)", lineHeight:1.7,
                color:"var(--brown)",
              }}>
                <Typewriter text={LETTERS[open].text} />
              </p>

              <div style={{ height:1, background:`linear-gradient(90deg,transparent,${LETTERS[open].color}55,transparent)`, margin:"2rem 0 1.25rem" }} />

              <button
                onClick={() => setOpen(null)}
                style={{ fontFamily:"var(--ff-mono)", fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.4em", color:"var(--brown-lt)", background:"none", border:"none", cursor:"none", opacity:0.6 }}
              >
                ← запечатать снова
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
