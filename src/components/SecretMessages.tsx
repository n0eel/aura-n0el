import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  { lock: "01 · ENCRYPTED", text: "I love the way you laugh in the middle of sentences. You don't even know you do it.", emoji: "🌙" },
  { lock: "02 · ENCRYPTED", text: "Every song on the radio is about you now. I don't think the radio knows. I haven't told it.", emoji: "🎵" },
  { lock: "03 · ENCRYPTED", text: "If the universe is infinite, then somewhere out there we're meeting again, for the first time, forever.", emoji: "✦" },
  { lock: "04 · ENCRYPTED", text: "I would build cathedrals out of ordinary mornings, just to spend them with you.", emoji: "🕊" },
  { lock: "05 · ENCRYPTED", text: "You are my favourite kind of chaos — the kind that rearranges everything into something more beautiful.", emoji: "♥" },
  { lock: "06 · ENCRYPTED", text: "In every version of my life, I choose this one. The one with you in it.", emoji: "∞" },
];

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontStyle: "italic", lineHeight: 1.6, color: "var(--foreground)" }}>
      {shown}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ display: "inline-block", width: "2px", height: "1.5em", background: "var(--primary)", marginLeft: "4px", verticalAlign: "middle", borderRadius: "1px" }}
      />
    </p>
  );
}

export function SecretMessages() {
  const [open, setOpen] = useState<number | null>(null);

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
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>VI — Whispers</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontStyle: "italic" }}>
            Secret Notes
          </h2>
          <p style={{ marginTop: "1.5rem", maxWidth: "28rem", margin: "1.5rem auto 0", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            Six sealed envelopes. For your eyes only.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1rem" }}>
          <style>{`@media(min-width:640px){.mg{grid-template-columns:repeat(2,1fr);gap:1.25rem}} @media(min-width:1024px){.mg{grid-template-columns:repeat(3,1fr)}}`}</style>
          <div className="mg" style={{ display: "contents" }}>
            {messages.map((m, i) => (
              <motion.button
                key={i}
                onClick={() => setOpen(i)}
                data-hover
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  position: "relative", overflow: "hidden", borderRadius: "1.25rem", padding: "2rem",
                  textAlign: "left", cursor: "none",
                  background: "oklch(0.09 0.03 285 / 0.6)",
                  border: "1px solid oklch(1 0 0 / 0.09)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Hover reveal glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, oklch(0.72 0.28 340 / 0.15), transparent 70%)", pointerEvents: "none" }}
                />

                {/* Envelope flap */}
                <motion.div
                  initial={{ scaleY: 1 }}
                  whileHover={{ scaleY: 0.6 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "3rem",
                    background: "linear-gradient(135deg, oklch(0.72 0.28 340 / 0.08), oklch(0.55 0.25 305 / 0.06))",
                    borderBottom: "1px solid oklch(0.72 0.28 340 / 0.1)",
                    transformOrigin: "top",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{m.emoji}</span>
                </motion.div>

                <div style={{ marginTop: "3rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.4em", color: "oklch(0.72 0.28 340 / 0.7)" }}>{m.lock}</div>
                  <div style={{ marginTop: "1.25rem", fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "oklch(0.72 0.04 300 / 0.5)" }}>
                    ✦ ✦ ✦ ✦ ✦
                  </div>
                  <div style={{ marginTop: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.3em", color: "oklch(0.72 0.04 300 / 0.5)" }}>
                    tap to decrypt →
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.04 0.015 280 / 0.88)", backdropFilter: "blur(24px)", padding: "1.5rem", cursor: "none" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)", y: 40 }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong"
              style={{ maxWidth: "44rem", width: "100%", borderRadius: "2rem", padding: "3rem", position: "relative", boxShadow: "0 0 80px oklch(0.72 0.28 340 / 0.3)" }}
            >
              {/* Floating hearts in modal */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{ position: "absolute", color: "oklch(0.72 0.28 340 / 0.3)", fontSize: "0.8rem", pointerEvents: "none", left: `${(i * 17 + 5) % 90}%`, top: `${(i * 31 + 5) % 80}%` }}
                  animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                >
                  ♥
                </motion.div>
              ))}

              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>
                {messages[open].lock} · DECRYPTED {messages[open].emoji}
              </div>

              <div style={{ marginTop: "2rem" }}>
                <Typewriter text={messages[open].text} />
              </div>

              <div style={{ marginTop: "2.5rem", height: "1px", background: "linear-gradient(90deg, transparent, oklch(0.72 0.28 340 / 0.3), transparent)" }} />

              <button
                onClick={() => setOpen(null)}
                style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.4em", color: "var(--muted-foreground)", background: "none", border: "none", cursor: "none" }}
              >
                ← seal the envelope
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
