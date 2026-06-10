import { CustomCursor }  from "./components/CustomCursor";
import { Petals }        from "./components/Petals";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero }          from "./components/Hero";
import { Timeline }      from "./components/Timeline";
import { Gallery }       from "./components/Gallery";
import { MusicPlayer }   from "./components/MusicPlayer";
import { LoveCounter }   from "./components/LoveCounter";
import { Reasons }       from "./components/Reasons";
import { Letters }       from "./components/Letters";
import { Forever }       from "./components/Forever";

export default function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--cream)" }}>
      <LoadingScreen />
      <CustomCursor />
      <Petals />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Timeline />
        <Gallery />
        <MusicPlayer />
        <LoveCounter />
        <Reasons />
        <Letters />
        <Forever />
      </main>
    </div>
  );
}
