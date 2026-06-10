import { CustomCursor }  from "./components/CustomCursor";
import { Petals }        from "./components/Petals";
import { Nav }           from "./components/Nav";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero }          from "./components/Hero";
import { Timeline }      from "./components/Timeline";
import { Gallery }       from "./components/Gallery";
import { MusicPlayer }   from "./components/MusicPlayer";
import { LoveCounter }   from "./components/LoveCounter";
import { Dreams }        from "./components/Dreams";
import { Reasons }       from "./components/Reasons";
import { Letters }       from "./components/Letters";
import { Forever }       from "./components/Forever";

function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div style={{ lineHeight: 0, overflow: "hidden", transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          fill="var(--parchment)"
        />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--cream)" }}>
      <LoadingScreen />
      <CustomCursor />
      <Petals />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <div id="hero"><Hero /></div>
        <SectionDivider />
        <div id="timeline"><Timeline /></div>
        <SectionDivider flip />
        <div id="gallery"><Gallery /></div>
        <SectionDivider />
        <div id="music"><MusicPlayer /></div>
        <SectionDivider flip />
        <div id="counter"><LoveCounter /></div>
        <SectionDivider />
        <div id="dreams"><Dreams /></div>
        <SectionDivider flip />
        <div id="reasons"><Reasons /></div>
        <SectionDivider />
        <div id="letters"><Letters /></div>
        <SectionDivider flip />
        <div id="forever"><Forever /></div>
      </main>
    </div>
  );
}
