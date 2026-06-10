import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export function Forever() {
  const [bloomed, setBloomed] = useState(false);
  const [flowers, setFlowers] = useState<{id:number;x:number;y:number;emoji:string;size:number}[]>([]);
  const idRef = useRef(0);

  const bloom = () => {
    setBloomed(true);
    const emojis = ["🌸","🌺","🌷","✿","❀","♥","🌼","💮"];
    const burst = Array.from({length:28}, (_,i) => {
      idRef.current++;
      return {
        id: idRef.current,
        x: 45 + (Math.random()-0.5)*80,
        y: 40 + (Math.random()-0.5)*60,
        emoji: emojis[i%emojis.length],
        size: 1.2 + Math.random()*1.8,
      };
    });
    setFlowers(burst);
    setTimeout(() => setFlowers([]), 3500);
  };

  return (
    <section className="section" style={{ background:"var(--cream)", minHeight:"90vh", display:"flex", alignItems:"center" }}>
      {/* Big blobs */}
      <div className="wc-blob" style={{ width:800,height:800,background:"var(--blush)",top:"-25%",left:"-15%",zIndex:0 }} />
      <div className="wc-blob" style={{ width:600,height:600,background:"var(--mint)",bottom:"-20%",right:"-10%",zIndex:0 }} />

      {/* Burst flowers */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:50, overflow:"hidden" }}>
        <AnimatePresence>
          {flowers.map(f => (
            <motion.div
              key={f.id}
              initial={{ opacity:1, scale:0, left:`${f.x}vw`, top:`${f.y}vh` }}
              animate={{ opacity:0, scale:f.size, y:-120 }}
              exit={{}}
              transition={{ duration:2+Math.random(), ease:"easeOut" }}
              style={{ position:"fixed", fontSize:`${f.size*1.4}rem`, pointerEvents:"none" }}
            >
              {f.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="section-inner" style={{ position:"relative", textAlign:"center", zIndex:1, maxWidth:"56rem" }}>
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:2 }}
        >
          <div className="label" style={{ marginBottom:"1.5rem" }}>и навсегда</div>
        </motion.div>

        {/* Animated flower crown */}
        <motion.div
          initial={{ opacity:0, scale:0, rotate:-20 }}
          whileInView={{ opacity:1, scale:1, rotate:0 }}
          viewport={{ once:true }}
          transition={{ duration:1.5, ease:[0.34,1.56,0.64,1], delay:0.2 }}
          style={{ fontSize:"4.5rem", lineHeight:1, marginBottom:"2rem" }}
          className="anim-heartbeat"
        >
          🌸
        </motion.div>

        <motion.h2
          initial={{ opacity:0, y:60 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-20%" }}
          transition={{ duration:1.8, ease:[0.16,1,0.3,1], delay:0.3 }}
          style={{
            fontFamily:"var(--ff-display)", fontStyle:"italic",
            fontSize:"clamp(3rem,9vw,8rem)", color:"var(--brown)",
            lineHeight:1.0, letterSpacing:"-0.03em",
          }}
        >
          Ты —{" "}
          <span style={{ color:"var(--rose-deep)" }}>лучшее,</span>
          <br />
          что со мной
          <br />
          случилось.
        </motion.h2>

        {/* Bloom button */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:1.2, delay:0.8, ease:[0.34,1.56,0.64,1] }}
          style={{ marginTop:"3.5rem" }}
        >
          <motion.button
            onClick={bloom}
            data-hover
            whileHover={{ scale:1.06 }}
            whileTap={{ scale:0.93 }}
            animate={bloomed ? { scale:[1,0.9,1.05,1] } : {}}
            transition={{ duration:0.4 }}
            className="btn-cute"
            style={{
              fontSize:"clamp(1.2rem,3vw,1.8rem)",
              padding:"1.25rem 3.5rem",
              background:`linear-gradient(135deg, var(--rose), var(--caramel))`,
              boxShadow:"0 8px 40px rgba(232,165,152,0.55)",
            }}
          >
            <span>♥</span>
            <span>навсегда</span>
            <span>♥</span>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:2, delay:1.4 }}
          style={{
            marginTop:"3rem",
            fontFamily:"var(--ff-body)", fontStyle:"italic",
            color:"var(--brown-lt)", fontSize:"1.05rem", lineHeight:1.8,
            maxWidth:"28rem", margin:"3rem auto 0",
          }}
        >
          — твой, полностью и навсегда.
          <br />
          В каждой версии этой жизни.
        </motion.p>

        {/* Decorative flowers row */}
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:1.5, delay:1 }}
          style={{ marginTop:"3.5rem", display:"flex", justifyContent:"center", gap:"1rem", fontSize:"1.8rem", opacity:0.55 }}
        >
          {["🌸","✿","♥","❀","🌷","♥","✿","🌸"].map((e,i) => (
            <motion.span
              key={i}
              animate={{ y:[0,-(4+i%3*3),0], rotate:[0,i%2===0?8:-8,0] }}
              transition={{ duration:2.5+i*0.3, repeat:Infinity, delay:i*0.2 }}
            >{e}</motion.span>
          ))}
        </motion.div>

        <div style={{ marginTop:"4rem", fontFamily:"var(--ff-mono)", fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.5em", color:"var(--brown-lt)", opacity:0.4 }}>
          сделано с любовью · 2026
        </div>
      </div>
    </section>
  );
}
