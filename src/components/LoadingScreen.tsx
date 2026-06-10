import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = ["собираю лепестки…", "пишу твоё имя…", "добавляю любовь…", "готово ♥"];

export function LoadingScreen() {
  const [done, setDone]       = useState(false);
  const [pct, setPct]         = useState(0);
  const [step, setStep]       = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setDone(true), 900); }
      setPct(Math.min(100, p));
      setStep(Math.floor(Math.min(100, p) / 25));
    }, 110);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)", transition: { duration: 1, ease: [0.16,1,0.3,1] } }}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "var(--cream)",
          }}
        >
          {/* Watercolour blobs */}
          <div style={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none" }}>
            <div className="wc-blob" style={{ width:500,height:500,background:"var(--blush)",top:"-10%",left:"-5%" }} />
            <div className="wc-blob" style={{ width:400,height:400,background:"var(--mint)",bottom:"-5%",right:"-5%" }} />
          </div>

          {/* Big animated heart */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.34,1.56,0.64,1] }}
            style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "1.5rem" }}
            className="anim-heartbeat"
          >
            🌸
          </motion.div>

          <motion.h1
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3, duration:1 }}
            style={{
              fontFamily: "var(--ff-display)", fontSize: "clamp(2rem,6vw,4rem)",
              fontStyle: "italic", color: "var(--brown)",
              letterSpacing: "-0.02em", textAlign: "center",
            }}
          >
            только для тебя
          </motion.h1>

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.6 }}
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--ff-mono)", fontSize: "10px",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: "var(--caramel)",
            }}
          >
            {STEPS[Math.min(step, STEPS.length - 1)]}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.7 }}
            style={{ marginTop:"2rem", width:"min(260px,80vw)" }}
          >
            <div style={{ height:"3px", background:"var(--parchment)", borderRadius:"9999px", overflow:"hidden" }}>
              <motion.div
                style={{
                  height:"100%", borderRadius:"9999px",
                  background:"linear-gradient(90deg,var(--rose),var(--caramel),var(--rose))",
                  backgroundSize:"200% 100%",
                  animation:"shimmer 1.5s linear infinite",
                  width:`${pct}%`, transition:"width 0.12s",
                }}
              />
            </div>
          </motion.div>

          {/* Tiny floating petals */}
          {[...Array(8)].map((_,i) => (
            <motion.div
              key={i}
              style={{
                position:"absolute",
                left:`${10+i*11}%`, top:`${20+((i*37)%60)}%`,
                fontSize:`${0.6+i*0.1}rem`,
                color:"var(--rose)", pointerEvents:"none",
              }}
              animate={{ y:[0,-12,0], rotate:[0,15,-15,0], opacity:[0.4,0.9,0.4] }}
              transition={{ duration:2.5+i*0.4, repeat:Infinity, delay:i*0.25 }}
            >
              {["🌸","✿","♡","·","˚","✦","❀","♥"][i]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
