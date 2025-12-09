import { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import UploadScreen from "./components/UploadScreen.jsx";
import GameScreen from "./components/GameScreen.jsx";
import GameOverScreen from "./components/GameOverScreen.jsx";

function App() {
  const [screen, setScreen] = useState("start"); // start | upload | game | over
  const [faceImageUrl, setFaceImageUrl] = useState(null);
  const [lastScore, setLastScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleStartClick = () => {
    setScreen("game");
  };

  const handleUploadClick = () => {
    setScreen("upload");
  };

  const handleFaceSelected = (url) => {
    setFaceImageUrl(url);
    setScreen("game");
  };

  const handleGameOver = (score) => {
    setLastScore(score);
    setBestScore((prev) => (score > prev ? score : prev));
    setScreen("over");
  };

  const handleRetry = () => {
    setScreen("game");
  };

  const handleChangeFace = () => {
    setScreen("upload");
  };

  return (
    <div className="app-root">
      {screen === "start" && (
        <StartScreen
          onUploadClick={handleUploadClick}
          onStartClick={handleStartClick}
        />
      )}

      {screen === "upload" && (
        <UploadScreen
          currentFace={faceImageUrl}
          onFaceSelected={handleFaceSelected}
          onBack={() => setScreen("start")}
        />
      )}

      {screen === "game" && (
        <GameScreen faceImageUrl={faceImageUrl} onGameOver={handleGameOver} />
      )}

      {screen === "over" && (
        <GameOverScreen
          score={lastScore}
          bestScore={bestScore}
          onRetry={handleRetry}
          onChangeFace={handleChangeFace}
          faceImageUrl={faceImageUrl}  
        />
      )}
    </div>
  );
}

export default App;
