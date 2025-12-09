import dinoBody from "../assets/dino-body.png";

function DinoCharacter({ faceImageUrl, small = false }) {
  return (
    <div className={`dino-wrapper ${small ? "dino-wrapper--small" : ""}`}>
      <div className="dino">
        {/* 1) 얼굴 먼저 */}
        {faceImageUrl && (
          <div className="dino-face-mask">
            <img src={faceImageUrl} alt="플레이어 얼굴" />
          </div>
        )}

        {/* 2) 그 위에 공룡 바디 */}
        <img src={dinoBody} alt="공룡 바디" className="dino-body" />
      </div>
    </div>
  );
}


export default DinoCharacter;
