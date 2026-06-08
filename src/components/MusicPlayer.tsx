import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import track from "../assets/by the sea.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(56).fill(0.15));
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBars((b) =>
        b.map((v) =>
          playing
            ? 0.12 + Math.random() * 0.88
            : Math.max(0.08, v * 0.93 + (Math.random() - 0.5) * 0.02)
        )
      );
    }, 80);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const tick = () => setTime(a.currentTime);
    const loaded = () => setDuration(a.duration);
    a.addEventListener("timeupdate", tick);
    a.addEventListener("loadedmetadata", loaded);
    return () => { a.removeEventListener("timeupdate", tick); a.removeEventListener("loadedmetadata", loaded); };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <section style={{ position: "relative", padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>IV — Sound</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontStyle: "italic" }}>
            Our Song
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong"
          style={{ borderRadius: "2rem", padding: "2.5rem", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-cinematic)" }}
        >
          {/* Background glow */}
          <div style={{ position: "absolute", inset: 0, zIndex: -1, opacity: 0.5, background: "radial-gradient(ellipse at top right, oklch(0.55 0.25 305 / 0.4), transparent 60%), radial-gradient(ellipse at bottom left, oklch(0.72 0.28 340 / 0.2), transparent 60%)" }} />

          {/* Animated bg rings when playing */}
          <AnimatePresence>
            {playing && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0.3 }}
                    animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
                    style={{
                      position: "absolute", left: "14%", top: "50%",
                      width: "200px", height: "200px",
                      borderRadius: "50%",
                      border: "1px solid oklch(0.72 0.28 340 / 0.3)",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "center" }}>
            <style>{`@media(min-width:640px){.mp-grid{grid-template-columns:auto 1fr}}`}</style>
            <div className="mp-grid" style={{ display: "contents" }}>

              {/* Vinyl */}
              <div style={{ position: "relative", width: "220px", height: "220px", margin: "0 auto" }}>
                <motion.div
                  style={{
                    width: "100%", height: "100%", borderRadius: "50%",
                    background: "radial-gradient(circle, oklch(0.15 0.04 285) 0%, oklch(0.05 0 0) 60%, oklch(0.1 0.03 285) 100%)",
                    boxShadow: "0 0 60px oklch(0.72 0.28 340 / 0.4), inset 0 0 40px oklch(0 0 0 / 0.8)",
                    position: "relative",
                  }}
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ duration: 5, ease: "linear", repeat: playing ? Infinity : 0 }}
                >
                  {[...Array(10)].map((_, i) => (
                    <div key={i} style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      border: "1px solid oklch(1 0 0 / 0.04)",
                      transform: `scale(${1 - i * 0.07})`,
                    }} />
                  ))}
                  <div style={{
                    position: "absolute", left: "50%", top: "50%",
                    width: "5rem", height: "5rem", transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    background: "var(--gradient-neon)",
                    boxShadow: "0 0 30px oklch(0.72 0.28 340 / 0.7)",
                  }}>
                    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "8px", height: "8px", background: "var(--background)", borderRadius: "50%" }} />
                  </div>
                </motion.div>

                {/* Tonearm */}
                <motion.div
                  style={{
                    position: "absolute", top: "10%", right: "-10%",
                    width: "4px", height: "80px",
                    background: "linear-gradient(180deg, oklch(0.5 0.1 300), oklch(0.3 0.05 290))",
                    borderRadius: "2px", transformOrigin: "top center",
                    boxShadow: "0 0 8px oklch(0.55 0.25 305 / 0.3)",
                  }}
                  animate={{ rotate: playing ? 30 : 20 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Info + controls */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.4em", color: "var(--muted-foreground)" }}>now playing</div>
                  <div style={{ marginTop: "0.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontStyle: "italic" }}>La leçon particulière</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Francis Lai · 1:44</div>
                </div>

                {/* Waveform EQ */}
                <div style={{ display: "flex", height: "4.5rem", alignItems: "center", gap: "2px" }}>
                  {bars.map((v, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${v * 100}%` }}
                      transition={{ duration: 0.08 }}
                      style={{
                        flex: 1, borderRadius: "9999px",
                        background: `linear-gradient(180deg, oklch(0.75 0.3 ${345 - i * 2}), oklch(0.45 0.22 ${295 - i}))`,
                        opacity: 0.35 + v * 0.65,
                        boxShadow: playing && v > 0.7 ? `0 0 8px oklch(0.72 0.28 340 / 0.6)` : "none",
                        minHeight: "4px",
                      }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div style={{ position: "relative", height: "2px", background: "oklch(1 0 0 / 0.08)", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: "0 auto 0 0", width: `${pct}%`, background: "var(--gradient-neon)", borderRadius: "9999px", boxShadow: "0 0 10px oklch(0.72 0.28 340 / 0.6)", transition: "width 0.5s linear" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted-foreground)" }}>
                  <span>{fmt(time)}</span><span>{fmt(duration)}</span>
                </div>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <motion.button
                    onClick={toggle}
                    data-hover
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="animate-pulse-glow"
                    style={{
                      width: "3.5rem", height: "3.5rem", borderRadius: "50%",
                      border: "1px solid oklch(0.72 0.28 340 / 0.4)",
                      background: "oklch(0.1 0.03 285 / 0.6)",
                      backdropFilter: "blur(20px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "none",
                    }}
                  >
                    {playing ? (
                      <span style={{ display: "flex", gap: "4px" }}>
                        <span style={{ width: "4px", height: "16px", background: "var(--foreground)", borderRadius: "2px" }} />
                        <span style={{ width: "4px", height: "16px", background: "var(--foreground)", borderRadius: "2px" }} />
                      </span>
                    ) : (
                      <span style={{ marginLeft: "3px", borderStyle: "solid", borderWidth: "8px 0 8px 14px", borderColor: "transparent transparent transparent var(--foreground)" }} />
                    )}
                  </motion.button>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--muted-foreground)" }}>
                    {playing ? "♪ drifting away..." : "press to drift away"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <audio ref={audioRef} loop>
            <source src={track} type="audio/mpeg" />
          </audio>
        </motion.div>
      </div>
    </section>
  );
}
