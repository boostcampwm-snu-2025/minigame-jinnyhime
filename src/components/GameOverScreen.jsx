import DinoCharacter from "./DinoCharacter";

function GameOverScreen({ score, bestScore, onRetry, onChangeFace, faceImageUrl,  }) {
  return (
    <div className="screen screen--dark">
      <header className="screen-header">
        <h2 className="logo-title">💔 Game Over 💔</h2>
      </header>

      <div className="screen-main">
        <DinoCharacter faceImageUrl={faceImageUrl} />

        <p className="gameover-score">
          당신의 점수: <span>⭐ {String(score).padStart(3, "0")}</span>
        </p>
        <p className="gameover-best">최고 점수: ⭐ {String(bestScore).padStart(3, "0")}</p>

        <div className="button-row">
          <button className="btn btn-primary" onClick={onRetry}>
            🔁 다시하기
          </button>
          <button className="btn btn-secondary" onClick={onChangeFace}>
            😆 얼굴 다시 바꾸기
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;
