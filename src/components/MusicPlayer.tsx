import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import track from "../assets/by the sea.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [bars, setBars]       = useState<number[]>(Array(40).fill(0.15));
  const [time, setTime]       = useState(0);
  const [dur, setDur]         = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setBars(b => b.map(v =>
        playing ? 0.1 + Math.random() * 0.9 : Math.max(0.08, v * 0.92)
      ));
    }, 90);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const tick = () => setTime(a.currentTime);
    const load = () => setDur(a.duration);
    a.addEventListener("timeupdate", tick);
    a.addEventListener("loadedmetadata", load);
    return () => { a.removeEventListener("timeupdate", tick); a.removeEventListener("loadedmetadata", load); };
  }, []);

  const toggle = () => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else a.play().then(() => setPlaying(true)).catch(() => {});
  };

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
  const pct = dur ? (time/dur)*100 : 0;

  return (
    <section id="music" className="section" style={{ background:"var(--cream)" }}>
      <div className="wc-blob" style={{ width:450,height:450,background:"var(--blush)",bottom:0,right:"5%",zIndex:0 }} />

      <div className="section-inner" style={{ position:"relative", maxWidth:"56rem" }}>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-20%" }}
          transition={{ duration:1 }}
          style={{ textAlign:"center", marginBottom:"1rem" }}
        >
          <div className="label" style={{ marginBottom:"1rem" }}>наша песня</div>
          <h2 style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"clamp(2.5rem,7vw,5rem)", color:"var(--brown)" }}>
            Играет для тебя
          </h2>
        </motion.div>
        <div className="divider"><div className="divider-icon">♪</div></div>

        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-15%" }}
          transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
          style={{
            background:"#fff",
            borderRadius:"2rem",
            padding:"2.5rem",
            boxShadow:"var(--shadow-lift)",
            display:"grid", gridTemplateColumns:"1fr", gap:"2rem",
            alignItems:"center",
          }}
        >
          <style>{`@media(min-width:560px){.mp-inner{grid-template-columns:auto 1fr!important}}`}</style>
          <div className="mp-inner" style={{ display:"contents" }}>

            {/* Vinyl record */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ position:"relative", width:200, height:200 }}>
                {/* Pulsing glow when playing */}
                <AnimatePresence>
                  {playing && (
                    <motion.div
                      initial={{ scale:0.9, opacity:0.6 }}
                      animate={{ scale:1.5, opacity:0 }}
                      exit={{}}
                      transition={{ duration:1.8, repeat:Infinity }}
                      style={{ position:"absolute", inset:0, borderRadius:"50%", background:"radial-gradient(circle,var(--rose) 0%,transparent 70%)" }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ duration:4, ease:"linear", repeat: playing ? Infinity : 0 }}
                  style={{
                    width:"100%", height:"100%", borderRadius:"50%",
                    background:"radial-gradient(circle, #2a1a0e 0%, #1a0f07 50%, #2d1a0a 100%)",
                    boxShadow:"0 8px 40px rgba(61,35,20,0.4)",
                    position:"relative", overflow:"hidden",
                  }}
                >
                  {/* Grooves */}
                  {[0.82,0.70,0.58,0.46].map((s,i) => (
                    <div key={i} style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.06)", transform:`scale(${s})` }} />
                  ))}
                  {/* Label */}
                  <div style={{
                    position:"absolute", left:"50%", top:"50%",
                    transform:"translate(-50%,-50%)",
                    width:70, height:70, borderRadius:"50%",
                    background:"linear-gradient(135deg,var(--rose),var(--caramel))",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 0 20px rgba(232,165,152,0.6)",
                  }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#1a0f07" }} />
                  </div>
                </motion.div>

                {/* Needle arm */}
                <motion.div
                  animate={{ rotate: playing ? 28 : 18 }}
                  transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
                  style={{
                    position:"absolute", top:"-4px", right:"-8px",
                    width:3, height:70,
                    background:"linear-gradient(180deg,var(--caramel),var(--brown-lt))",
                    borderRadius:2, transformOrigin:"top center",
                    boxShadow:"0 2px 8px rgba(61,35,20,0.3)",
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div>
              <div className="label" style={{ marginBottom:"0.5rem" }}>сейчас играет</div>
              <div style={{ fontFamily:"var(--ff-display)", fontStyle:"italic", fontSize:"1.7rem", color:"var(--brown)", lineHeight:1.2 }}>
                La leçon particulière
              </div>
              <div style={{ fontFamily:"var(--ff-mono)", fontSize:"11px", color:"var(--brown-lt)", marginTop:"0.3rem", opacity:0.7 }}>
                Francis Lai · 1:44
              </div>

              {/* Waveform */}
              <div style={{ display:"flex", height:"3.5rem", alignItems:"center", gap:"2px", margin:"1.25rem 0" }}>
                {bars.map((v,i) => (
                  <motion.div
                    key={i}
                    animate={{ height:`${v*100}%` }}
                    transition={{ duration:0.09 }}
                    style={{
                      flex:1, borderRadius:9999, minHeight:3,
                      background:`linear-gradient(180deg,var(--rose),var(--caramel))`,
                      opacity: 0.4 + v * 0.6,
                    }}
                  />
                ))}
              </div>

              {/* Progress */}
              <div style={{ height:2, background:"var(--parchment)", borderRadius:9999, overflow:"hidden", marginBottom:"0.4rem" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:"var(--rose)", borderRadius:9999, transition:"width 0.5s linear" }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--ff-mono)", fontSize:"10px", color:"var(--brown-lt)", opacity:0.6, marginBottom:"1.25rem" }}>
                <span>{fmt(time)}</span><span>{fmt(dur)}</span>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                <motion.button
                  onClick={toggle}
                  data-hover
                  whileHover={{ scale:1.1 }}
                  whileTap={{ scale:0.9 }}
                  style={{
                    width:52, height:52, borderRadius:"50%",
                    background:playing ? "var(--rose)" : "var(--brown)",
                    border:"none", cursor:"none",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:`0 4px 20px ${playing ? "rgba(232,165,152,0.5)" : "rgba(61,35,20,0.3)"}`,
                    transition:"background 0.3s, box-shadow 0.3s",
                  }}
                >
                  {playing
                    ? <span style={{ display:"flex",gap:4 }}>
                        <span style={{ width:3,height:16,background:"#fff",borderRadius:2 }}/>
                        <span style={{ width:3,height:16,background:"#fff",borderRadius:2 }}/>
                      </span>
                    : <span style={{ marginLeft:3, borderStyle:"solid", borderWidth:"8px 0 8px 13px", borderColor:"transparent transparent transparent #fff" }}/>
                  }
                </motion.button>
                <span style={{ fontFamily:"var(--ff-body)", fontStyle:"italic", color:"var(--brown-lt)", fontSize:"0.9rem" }}>
                  {playing ? "♪ только для тебя…" : "нажми — и улыбнись"}
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
      <audio ref={audioRef} loop><source src={track} type="audio/mpeg" /></audio>
    </section>
  );
}
