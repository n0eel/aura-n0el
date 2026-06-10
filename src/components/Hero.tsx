import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "../assets/hero-couple.jpg";

const SVG_HEART = (
  <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%",height:"100%" }}>
    <motion.path
      d="M50 80 C50 80 5 52 5 28 C5 12 17 4 30 4 C39 4 46 9 50 15 C54 9 61 4 70 4 C83 4 95 12 95 28 C95 52 50 80 50 80Z"
      stroke="var(--rose)" strokeWidth="2.5" fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.2, ease: "easeInOut", delay: 1.2 }}
    />
  </svg>
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const imgY   = useTransform(scrollYProgress, [0,1], [0, 160]);
  const textY  = useTransform(scrollYProgress, [0,1], [0, -80]);
  const opac   = useTransform(scrollYProgress, [0,0.7], [1, 0]);

  return (
    <section id="hero" ref={ref} style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", alignItems:"center" }}>

      {/* Blobs */}
      <div className="wc-blob" style={{ width:700,height:700,background:"var(--blush)",top:"-20%",right:"-10%",zIndex:0 }} />
      <div className="wc-blob" style={{ width:500,height:500,background:"var(--mint)",bottom:"-10%",left:"-5%",zIndex:0 }} />

      {/* Photo — right side, parallax */}
      <motion.div
        style={{ y: imgY, position:"absolute", right:0, top:0, bottom:0, width:"55%", zIndex:1 }}
      >
        <img
          src={heroImg}
          alt=""
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
        />
        {/* Fade left edge into cream */}
        <div style={{
          position:"absolute",inset:0,
          background:"linear-gradient(90deg, var(--cream) 0%, transparent 35%, transparent 80%, var(--cream) 100%)",
        }} />
        <div style={{
          position:"absolute",inset:0,
          background:"linear-gradient(180deg, var(--cream) 0%, transparent 12%, transparent 85%, var(--cream) 100%)",
        }} />
      </motion.div>

      {/* Text — left side */}
      <motion.div
        style={{ y: textY, opacity: opac, position:"relative", zIndex:3, padding:"2rem 1.5rem", maxWidth:"54rem", margin:"0 auto", width:"100%" }}
      >
        <motion.div
          initial={{ opacity:0, x:-30 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:1, delay:0.2 }}
          className="label"
          style={{ marginBottom:"1.5rem" }}
        >
          ✦ &nbsp; моё всё
        </motion.div>

        <motion.h1
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.4, delay:0.4, ease:[0.16,1,0.3,1] }}
          style={{
            fontFamily:"var(--ff-display)", fontStyle:"italic",
            fontSize:"clamp(3.2rem,8vw,7.5rem)", lineHeight:1.05,
            color:"var(--brown)", letterSpacing:"-0.03em",
            maxWidth:"12ch",
          }}
        >
          ты —&nbsp;моё
          <br/>
          <span style={{ color:"var(--rose-deep)" }}>любимое</span>
          <br/>
          место
        </motion.h1>

        {/* Animated heart outline */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.9 }}
          style={{ width:72, height:65, margin:"1.5rem 0" }}
        >
          {SVG_HEART}
        </motion.div>

        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, delay:1.4 }}
          style={{
            fontFamily:"var(--ff-body)", fontStyle:"italic",
            fontSize:"clamp(1rem,2vw,1.2rem)", lineHeight:1.8,
            color:"var(--brown-lt)", maxWidth:"28rem",
            marginBottom:"2.5rem",
          }}
        >
          Этот сайт — для тебя. Собран из воспоминаний,&nbsp;тепла
          и&nbsp;всего, что я хочу тебе сказать.
        </motion.p>

        <motion.a
          href="#timeline"
          data-hover
          initial={{ opacity:0, scale:0.85 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:1, delay:1.8, ease:[0.34,1.56,0.64,1] }}
          className="btn-cute"
          style={{ textDecoration:"none" }}
        >
          <span>наша история</span>
          <span>↓</span>
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ position:"absolute", bottom:"2rem", left:"50%", translateX:"-50%", zIndex:5 }}
        animate={{ y:[0,10,0] }}
        transition={{ duration:2, repeat:Infinity }}
      >
        <div style={{
          width:26, height:42, borderRadius:13,
          border:"1.5px solid var(--caramel)",
          display:"flex", alignItems:"flex-start", justifyContent:"center",
          paddingTop:6,
        }}>
          <motion.div
            style={{ width:4, height:8, borderRadius:9999, background:"var(--caramel)" }}
            animate={{ y:[0,12,0], opacity:[1,0.2,1] }}
            transition={{ duration:1.8, repeat:Infinity }}
          />
        </div>
      </motion.div>

      {/* Corner decorations */}
      {["top:1.5rem;left:1.5rem","top:1.5rem;right:1.5rem","bottom:1.5rem;left:1.5rem","bottom:1.5rem;right:1.5rem"].map((pos,i) => (
        <div key={i} style={{ position:"absolute", ...(Object.fromEntries(pos.split(";").map(s=>s.split(":")))), zIndex:4, color:"var(--sage)", fontSize:"1.4rem", opacity:0.5, pointerEvents:"none" }}>
          ❀
        </div>
      ))}
    </section>
  );
}
