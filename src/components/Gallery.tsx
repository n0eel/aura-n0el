import { motion } from "framer-motion";
import { useRef } from "react";
import mem1 from "../assets/memory-1.jpg";
import mem2 from "../assets/memory-2.jpg";
import mem3 from "../assets/memory-3.jpg";
import mem4 from "../assets/memory-4.jpg";
import mem5 from "../assets/memory-5.jpg";
import mem6 from "../assets/memory-6.jpg";

const PINS = [
  { src:mem1, caption:"первый раз вместе", rot:-4, color:"var(--rose)" },
  { src:mem3, caption:"воскресное утро",   rot: 3, color:"var(--sage)" },
  { src:mem2, caption:"под дождём",        rot:-2, color:"var(--caramel)" },
  { src:mem5, caption:"поздно ночью",      rot: 5, color:"var(--rose)" },
  { src:mem4, caption:"наш день",          rot:-3, color:"var(--sage)" },
  { src:mem6, caption:"навсегда",          rot: 2, color:"var(--caramel)" },
];

export function Gallery() {
  const constrainRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="section" style={{ background:"var(--parchment)" }}>
      <div className="wc-blob" style={{ width:500,height:500,background:"var(--mint)",top:0,left:"-10%",zIndex:0 }} />

      <div className="section-inner" style={{ position:"relative" }}>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-20%" }}
          transition={{ duration:1 }}
          style={{ textAlign:"center", marginBottom:"1rem" }}
        >
          <div className="label" style={{ marginBottom:"1rem" }}>скрапбук</div>
          <h2 style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"clamp(2.5rem,7vw,5.5rem)", color:"var(--brown)" }}>
            Наши моменты
          </h2>
        </motion.div>
        <div className="divider"><div className="divider-icon">✿</div></div>

        {/* Cork board feel */}
        <div
          ref={constrainRef}
          style={{
            background:"linear-gradient(135deg,#c8a882,#b8956a)",
            borderRadius:"1.5rem",
            padding:"2.5rem 2rem 3rem",
            boxShadow:"inset 0 2px 10px rgba(0,0,0,0.25), 0 8px 40px rgba(61,35,20,0.2)",
            position:"relative",
            minHeight:"560px",
            overflow:"hidden",
          }}
        >
          {/* Cork texture grid */}
          <div style={{ position:"absolute",inset:0,opacity:0.15,backgroundImage:"radial-gradient(circle at 2px 2px,rgba(0,0,0,0.3) 1px,transparent 0)",backgroundSize:"18px 18px" }} />

          {/* Photos — draggable polaroids */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.5rem", position:"relative" }}>
            <style>{`@media(min-width:640px){.cork-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
            <div className="cork-grid" style={{ display:"contents" }}>
              {PINS.map((p,i) => (
                <motion.div
                  key={i}
                  drag
                  dragMomentum={false}
                  dragElastic={0.1}
                  dragConstraints={constrainRef}
                  initial={{ opacity:0, scale:0.8, rotate:p.rot * 2 }}
                  whileInView={{ opacity:1, scale:1, rotate:p.rot, transition:{ duration:0.8, delay:i*0.1, ease:[0.34,1.56,0.64,1] } }}
                  whileHover={{ scale:1.06, rotate:0, zIndex:20, cursor:"grabbing" }}
                  whileDrag={{ scale:1.1, rotate:0, zIndex:50 }}
                  viewport={{ once:true }}
                  data-hover
                  style={{
                    background:"#fff",
                    padding:"0.7rem 0.7rem 3rem",
                    cursor:"grab",
                    boxShadow:"0 4px 16px rgba(0,0,0,0.3)",
                    userSelect:"none",
                    touchAction:"none",
                    position:"relative",
                  }}
                >
                  {/* Push pin */}
                  <div style={{
                    position:"absolute", top:"-8px", left:"50%", transform:"translateX(-50%)",
                    width:14, height:14, borderRadius:"50%",
                    background:p.color, boxShadow:`0 2px 6px ${p.color}88`,
                    zIndex:2,
                  }} />

                  <div style={{ overflow:"hidden", aspectRatio:"1", background:"var(--parchment)" }}>
                    <img
                      src={p.src} alt={p.caption} loading="lazy" draggable={false}
                      style={{ width:"100%", height:"100%", objectFit:"cover", filter:"saturate(0.88) contrast(1.05)" }}
                    />
                  </div>
                  <div style={{ textAlign:"center", marginTop:"0.5rem", fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"0.85rem", color:"var(--brown-lt)" }}>
                    {p.caption}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign:"center", marginTop:"1.25rem", fontFamily:"var(--ff-body)", fontStyle:"italic", fontSize:"0.9rem", color:"var(--brown-lt)", opacity:0.7 }}>
          перетаскивай ✦ они твои
        </p>
      </div>
    </section>
  );
}
