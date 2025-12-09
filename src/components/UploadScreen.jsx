import { useRef, useState } from "react";
import DinoCharacter from "./DinoCharacter";

function UploadScreen({ currentFace, onFaceSelected, onBack }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(currentFace || null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUseThisFace = () => {
    if (!previewUrl) return;
    onFaceSelected(previewUrl);
  };

  return (
    <div className="screen screen--dark">
      <header className="screen-header">
        <h2 className="logo-title">(❁´◡`❁) 얼굴 꾸미기!</h2>
      </header>

      <div className="screen-main upload-layout">
        <div className="upload-box">
          <p className="upload-label">파일 선택</p>
          <button
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            📂 파일 선택
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className="preview-area">
            <DinoCharacter faceImageUrl={previewUrl} />
            <p className="preview-caption">얼굴사진을 추가하자!</p>
          </div>
        </div>

        <div className="button-column">
          <button
            className="btn btn-primary"
            disabled={!previewUrl}
            onClick={handleUseThisFace}
          >
            💚 이 얼굴로 플레이할래
          </button>
          <button className="btn btn-ghost" onClick={onBack}>
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadScreen;
