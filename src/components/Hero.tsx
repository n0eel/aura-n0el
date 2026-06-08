import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import heroImg from "../assets/hero-couple.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // 3D tilt on hero text
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

  const [btnHover, setBtnHover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax image */}
      <motion.div style={{ scale, y, position: "absolute", inset: 0 }}>
        <img
          src={heroImg}
          alt="Two souls beneath a violet sky"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, oklch(0.04 0.015 280 / 0.3) 0%, oklch(0.04 0.015 280 / 0.55) 55%, var(--background) 100%)",
        }} />
      </motion.div>

      {/* Animated gradient orbs */}
      {[
        { color: "oklch(0.45 0.3 340 / 0.3)", size: 600, x: "10%", y: "20%", dur: 12 },
        { color: "oklch(0.35 0.25 295 / 0.25)", size: 500, x: "70%", y: "60%", dur: 16 },
        { color: "oklch(0.4 0.28 310 / 0.2)", size: 400, x: "50%", y: "10%", dur: 10 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", borderRadius: "50%", pointerEvents: "none",
            width: orb.size, height: orb.size,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.2, 0.9, 1], x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating orbs / dots */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", pointerEvents: "none",
            width: i % 3 === 0 ? 10 : 6, height: i % 3 === 0 ? 10 : 6,
            borderRadius: "50%",
            left: `${(i * 53 + 7) % 100}%`,
            top: `${(i * 37 + 13) % 100}%`,
            background: i % 3 === 0 ? "oklch(0.75 0.3 345)" : "oklch(0.95 0.05 320)",
            boxShadow: "0 0 20px currentColor",
            color: i % 3 === 0 ? "oklch(0.75 0.3 345)" : "oklch(0.95 0.05 320)",
          }}
          animate={{ y: [0, -40, -10, 0], opacity: [0.25, 0.95, 0.6, 0.25], scale: [1, 1.5, 1.1, 1] }}
          transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
        />
      ))}

      {/* Main content with 3D tilt */}
      <motion.div
        style={{ opacity, y: textY, rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", color: "var(--primary)", letterSpacing: "0.4em" }}
        >
          Chapter One — A Love Story
        </motion.div>

        {/* Animated SVG heart above title */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginTop: "1.5rem", fontSize: "2.5rem", lineHeight: 1 }}
          className="animate-heartbeat"
        >
          ♥
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 80, filter: "blur(30px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
          className="text-glow-soft"
        >
          <span className="gradient-text" style={{ fontStyle: "italic" }}>In every universe,</span>
          <br />
          <motion.span
            style={{ color: "var(--foreground)", display: "inline-block" }}
            animate={{ textShadow: ["0 0 0px transparent", "0 0 40px oklch(0.72 0.28 340 / 0.5)", "0 0 0px transparent"] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            I'd find you.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.3 }}
          style={{ marginTop: "2rem", maxWidth: "38rem", fontSize: "clamp(0.875rem, 2vw, 1.05rem)", lineHeight: 1.75, color: "var(--muted-foreground)" }}
        >
          A love letter written in starlight — every memory, every moment, every quiet
          evening folded into something we'll carry forever.
        </motion.p>

        {/* Magnetic CTA button */}
        <motion.a
          href="#timeline"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setBtnHover(true)}
          onHoverEnd={() => setBtnHover(false)}
          data-hover
          style={{
            marginTop: "3.5rem",
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            padding: "1.1rem 2.5rem", borderRadius: "9999px",
            border: "1px solid oklch(0.72 0.28 340 / 0.4)",
            background: "oklch(0.04 0.015 280 / 0.4)",
            backdropFilter: "blur(20px)",
            fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic",
            color: "var(--foreground)", textDecoration: "none",
            position: "relative", overflow: "hidden",
          }}
          className="animate-pulse-glow"
        >
          <motion.div
            style={{
              position: "absolute", inset: 0, borderRadius: "9999px",
              background: "var(--gradient-neon)", opacity: 0,
            }}
            animate={{ opacity: btnHover ? 0.15 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <span style={{ position: "relative" }}>Our Story</span>
          <motion.span
            animate={{ x: btnHover ? 4 : 0, rotate: btnHover ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: "absolute", bottom: "2rem", left: "50%", translateX: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.4em", color: "var(--muted-foreground)" }}>scroll</div>
        <div style={{ width: "1px", height: "3rem", background: "linear-gradient(180deg, transparent, var(--primary), oklch(0.55 0.25 305 / 0.3), transparent)" }} />
      </motion.div>
    </section>
  );
}
