import { CustomCursor } from "./components/CustomCursor";
import { StarField } from "./components/StarField";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { Gallery } from "./components/Gallery";
import { MusicPlayer } from "./components/MusicPlayer";
import { LoveCounter } from "./components/LoveCounter";
import { SecretMessages } from "./components/SecretMessages";
import { LoveLanguages } from "./components/LoveLanguages";
import { WishingWell } from "./components/WishingWell";
import { Forever } from "./components/Forever";

export default function App() {
  return (
    <div
      className="grain"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <LoadingScreen />
      <CustomCursor />
      <StarField />
      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <Timeline />
        <Gallery />
        <MusicPlayer />
        <LoveCounter />
        <LoveLanguages />
        <SecretMessages />
        <WishingWell />
        <Forever />
      </main>
    </div>
  );
}
