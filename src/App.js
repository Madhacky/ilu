import { useState } from "react";
import "@/App.css";
import { FloatingHearts } from "./components/FloatingHearts";
import { MusicPlayer } from "./components/MusicPlayer";
import { AskingStage } from "./components/AskingStage";
import { CelebrationStage } from "./components/CelebrationStage";

function App() {
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleYesClick = () => {
    setHasAnswered(true);
  };

  return (
    <div className="App">
      <div className="grain-overlay" />
      <FloatingHearts />
      <MusicPlayer />
      
      {!hasAnswered ? (
        <AskingStage onYesClick={handleYesClick} />
      ) : (
        <CelebrationStage />
      )}
    </div>
  );
}

export default App;