import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import mem1 from "../assets/memory-1.jpg";
import mem2 from "../assets/memory-2.jpg";
import mem4 from "../assets/memory-4.jpg";
import mem6 from "../assets/memory-6.jpg";

const events = [
  { date: "первый взгляд",  title: "Ты улыбнулась",     text:"В переполненном месте, в обычный день — ты улыбнулась, и всё перестало быть обычным.", img: mem1, emoji:"🌸", color:"var(--blush)" },
  { date: "первый вечер",   title: "Мы гуляли",          text:"Мы гуляли так долго, что успели поговорить обо всём — и при этом не сказали главного.",   img: mem2, emoji:"🌙", color:"var(--mint)" },
  { date: "тот самый день", title: "Ты стала моей",      text:"Я не знал, что так бывает. Оказывается — бывает.",                                        img: mem4, emoji:"♥", color:"var(--blush)" },
  { date: "и навсегда",     title: "Мы — это мы",        text:"Каждый день с тобой — это целая жизнь, которую я бы выбрал снова.",                        img: mem6, emoji:"✿", color:"var(--mint)" },
];

function Card({ ev, i }: { ev: typeof events[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin:"-20% 0px", once:false });
  const left = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:50 }}
      animate={inView ? { opacity:1, y:0 } : { opacity:0.15, y:30 }}
      transition={{ duration:1.1, ease:[0.16,1,0.3,1] }}
      style={{
        display:"grid",
        gridTemplateColumns: "1fr",
        gap:"2rem",
        padding:"3.5rem 0",
        alignItems:"center",
      }}
    >
      <style>{`@media(min-width:768px){.tl-row-${i}{grid-template-columns:1fr 1fr!important;gap:4rem!important}}`}</style>
      <div className={`tl-row-${i}`} style={{ display:"contents" }}>

        {/* Text card — paper style */}
        <motion.div
          style={{ order: left ? 1 : 2 }}
          whileHover={{ rotate: left ? 0.5 : -0.5 }}
        >
          <div style={{
            background:"#fff",
            borderRadius:"1.25rem",
            padding:"2.25rem 2rem",
            boxShadow:"var(--shadow-card)",
            position:"relative",
            borderTop:`4px solid ${ev.color === "var(--blush)" ? "var(--rose)" : "var(--sage)"}`,
          }}>
            {/* Stamp decoration */}
            <div style={{
              position:"absolute", top:"1rem", right:"1rem",
              width:40, height:40, borderRadius:"50%",
              border:"1.5px dashed var(--rose)", opacity:0.3,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1.1rem",
            }}>
              {ev.emoji}
            </div>

            <div className="label" style={{ marginBottom:"0.75rem" }}>{ev.date}</div>
            <h3 style={{
              fontFamily:"var(--ff-display)", fontStyle:"italic",
              fontSize:"clamp(1.8rem,4vw,2.6rem)", color:"var(--brown)",
              lineHeight:1.1, marginBottom:"1rem",
            }}>{ev.title}</h3>

            {/* Wavy separator */}
            <svg viewBox="0 0 120 8" style={{ width:80, marginBottom:"1rem", display:"block" }}>
              <path d="M0 4 Q15 0 30 4 Q45 8 60 4 Q75 0 90 4 Q105 8 120 4"
                    stroke="var(--rose)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>

            <p style={{ fontFamily:"var(--ff-body)", fontStyle:"italic", lineHeight:1.75, color:"var(--brown-lt)", fontSize:"0.95rem" }}>
              {ev.text}
            </p>
          </div>
        </motion.div>

        {/* Photo — polaroid style */}
        <motion.div
          style={{ order: left ? 2 : 1 }}
          whileHover={{ rotate: left ? -1.5 : 1.5, scale:1.03 }}
          transition={{ duration:0.4 }}
        >
          <div style={{
            background:"#fff",
            padding:"0.875rem 0.875rem 3.5rem",
            borderRadius:"4px",
            boxShadow:"var(--shadow-lift)",
            transform:`rotate(${left ? -2 : 2}deg)`,
            transition:"transform 0.4s",
          }}>
            <div style={{ overflow:"hidden", aspectRatio:"4/3", borderRadius:"2px" }}>
              <motion.img
                src={ev.img} alt={ev.title} loading="lazy"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                whileHover={{ scale:1.07 }}
                transition={{ duration:0.8 }}
              />
            </div>
            <div style={{
              textAlign:"center", marginTop:"0.5rem",
              fontFamily:"var(--ff-display)", fontStyle:"italic",
              fontSize:"0.95rem", color:"var(--brown-lt)",
            }}>{ev.title} {ev.emoji}</div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

export function Timeline() {
  const hRef = useRef<HTMLDivElement>(null);
  const hInView = useInView(hRef, { once:true, margin:"-20%" });

  return (
    <section id="timeline" className="section" style={{ background:"var(--cream)" }}>
      {/* Blob decors */}
      <div className="wc-blob" style={{ width:600,height:600,background:"var(--blush)",top:"10%",right:"-15%",zIndex:0 }} />

      <div className="section-inner" style={{ position:"relative" }}>
        <motion.div
          ref={hRef}
          initial={{ opacity:0, y:30 }}
          animate={hInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1 }}
          style={{ textAlign:"center", marginBottom:"1rem" }}
        >
          <div className="label" style={{ marginBottom:"1rem" }}>наша история</div>
          <h2 style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"clamp(2.5rem,7vw,5.5rem)", color:"var(--brown)" }}>
            С самого начала
          </h2>
        </motion.div>

        <div className="divider" style={{ marginTop:"2rem" }}>
          <div className="divider-icon">♥</div>
        </div>

        {events.map((ev,i) => <Card key={i} ev={ev} i={i} />)}
      </div>
    </section>
  );
}
