import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#hero",     label: "начало",  emoji: "🌸" },
  { href: "#timeline", label: "история", emoji: "✦"  },
  { href: "#gallery",  label: "моменты", emoji: "✿"  },
  { href: "#music",    label: "музыка",  emoji: "♪"  },
  { href: "#reasons",  label: "причины", emoji: "♥"  },
  { href: "#letters",  label: "письма",  emoji: "✉"  },
  { href: "#forever",  label: "навсегда",emoji: "❀"  },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [active, setActive]   = useState("hero");

  useEffect(() => {
    const unsub = scrollY.on("change", v => setVisible(v > 80));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: "1.25rem", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 500, pointerEvents: visible ? "all" : "none",
      }}
    >
      <div style={{
        background: "rgba(253,246,236,0.88)",
        backdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(196,132,90,0.2)",
        borderRadius: "9999px",
        padding: "0.5rem 0.75rem",
        display: "flex", gap: "0.25rem", alignItems: "center",
        boxShadow: "0 4px 24px rgba(61,35,20,0.12), 0 1px 2px rgba(61,35,20,0.06)",
      }}>
        {LINKS.map(l => {
          const id  = l.href.replace("#", "");
          const isA = active === id;
          return (
            <motion.a
              key={l.href}
              href={l.href}
              data-hover
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              style={{
                position: "relative",
                display: "flex", alignItems: "center", gap: "0.3rem",
                padding: "0.35rem 0.7rem",
                borderRadius: "9999px",
                textDecoration: "none",
                fontFamily: "var(--ff-mono)",
                fontSize: "10px", letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: isA ? "#fff" : "var(--brown-lt)",
                transition: "color 0.3s",
                cursor: "none",
                zIndex: 1,
              }}
            >
              {isA && (
                <motion.div
                  layoutId="nav-pill"
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, var(--rose), var(--caramel))",
                    borderRadius: "9999px", zIndex: -1,
                    boxShadow: "0 2px 12px rgba(232,165,152,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span style={{ fontSize: "0.7rem" }}>{l.emoji}</span>
              <span style={{ display: "none" }}
                className="nav-label-sm"
              >{l.label}</span>
            </motion.a>
          );
        })}
      </div>

      <style>{`
        @media(min-width: 560px) { .nav-label-sm { display: inline !important; } }
      `}</style>
    </motion.nav>
  );
}
