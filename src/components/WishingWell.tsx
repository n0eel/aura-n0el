import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface Wish { text: string; id: number; x: number }

const PROMPTS = [
  "Write them a wish for tomorrow...",
  "What do you want them to know?",
  "Your heart in one sentence...",
  "A dream for both of you...",
];

export function WishingWell() {
  const [input, setInput] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [sent, setSent] = useState(false);
  const [prompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const idRef = useRef(0);

  const send = () => {
    if (!input.trim()) return;
    idRef.current++;
    setWishes((w) => [...w, { text: input.trim(), id: idRef.current, x: Math.random() * 60 + 20 }]);
    setInput("");
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <section style={{ position: "relative", padding: "8rem 1.5rem", overflow: "hidden" }}>
      {/* Rising wishes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <AnimatePresence>
          {wishes.slice(-8).map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.9, 0.9, 0], y: "-100vh", scale: [0.8, 1, 0.8, 0.4] }}
              exit={{}}
              transition={{ duration: 8, ease: "easeOut" }}
              style={{
                position: "absolute", bottom: "20%", left: `${w.x}%`,
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(0.7rem, 2vw, 1rem)",
                color: "oklch(0.85 0.15 340 / 0.8)",
                whiteSpace: "nowrap", maxWidth: "200px",
                textShadow: "0 0 20px oklch(0.72 0.28 340 / 0.5)",
                transform: "translateX(-50%)",
              }}
            >
              ♥ {w.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ maxWidth: "44rem", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--primary)" }}>VII — Wishing Well</div>
          <h2 className="gradient-text" style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontStyle: "italic" }}>
            Send a Wish
          </h2>
          <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            Write something. Release it into the sky. Let it drift between stars.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong"
          style={{ borderRadius: "2rem", padding: "2.5rem", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-cinematic)" }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, oklch(0.72 0.28 340 / 0.07), transparent 70%)", pointerEvents: "none" }} />

          {/* Well circle decoration */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <div style={{ position: "relative", width: "80px", height: "80px" }}>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.3 + i * 0.2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
                  style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid oklch(0.72 0.28 340 / 0.4)" }}
                />
              ))}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(circle, oklch(0.15 0.08 285), oklch(0.08 0.03 280))",
                border: "1px solid oklch(0.72 0.28 340 / 0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem",
              }}>
                ✦
              </div>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
            placeholder={prompt}
            maxLength={120}
            rows={3}
            style={{
              width: "100%", background: "oklch(0.08 0.02 285 / 0.5)",
              border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: "1rem",
              padding: "1.25rem 1.5rem", color: "var(--foreground)",
              fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.1rem",
              resize: "none", outline: "none", lineHeight: 1.6,
              backdropFilter: "blur(10px)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "oklch(0.72 0.28 340 / 0.5)";
              e.target.style.boxShadow = "0 0 20px oklch(0.72 0.28 340 / 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "oklch(1 0 0 / 0.1)";
              e.target.style.boxShadow = "none";
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.2em" }}>
              {input.length}/120
            </span>

            <motion.button
              onClick={send}
              disabled={!input.trim()}
              data-hover
              whileHover={{ scale: input.trim() ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.875rem 2rem", borderRadius: "9999px",
                background: input.trim() ? "var(--gradient-neon)" : "oklch(0.2 0.04 285)",
                border: "none", cursor: input.trim() ? "none" : "not-allowed",
                color: "var(--foreground)", fontFamily: "var(--font-display)",
                fontStyle: "italic", fontSize: "1rem",
                transition: "background 0.3s",
                boxShadow: input.trim() ? "0 0 30px oklch(0.72 0.28 340 / 0.4)" : "none",
              }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    ✦ sent to the stars
                  </motion.span>
                ) : (
                  <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    release ↑
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {wishes.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginTop: "2rem", fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--muted-foreground)", fontSize: "0.9rem" }}
          >
            {wishes.length} {wishes.length === 1 ? "wish" : "wishes"} drifting through the universe ♥
          </motion.p>
        )}
      </div>
    </section>
  );
}
