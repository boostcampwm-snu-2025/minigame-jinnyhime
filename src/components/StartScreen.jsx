import DinoCharacter from "./DinoCharacter";

function StartScreen({ onUploadClick, onStartClick }) {
  return (
    <div className="screen screen--dark">
      <header className="screen-header">
        <h1 className="logo-title">🦖 Personal Dino Game 🦖</h1>
      </header>

      <div className="screen-main">
        <DinoCharacter />

        <div className="button-row">
          <button className="btn btn-secondary" onClick={onUploadClick}>
            📷 얼굴 사진 업로드하기
          </button>
          <button className="btn btn-primary" onClick={onStartClick}>
            🎮 게임 시작
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
