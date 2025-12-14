import { useEffect, useRef, useState } from "react";
import DinoCharacter from "./DinoCharacter";
import cactusImg from "../assets/cactus.png";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 260;
const DINO_X = 320;
const OBSTACLE_WIDTH = 100;
const OBSTACLE_HEIGHT = 120;
const GRAVITY = -0.7;
const JUMP_VELOCITY = 15;
const GROUND_Y = 0;
const COLLISION_HEIGHT = 40;
const BASE_SPEED = 7;

function GameScreen({ faceImageUrl, onGameOver }) {
  // 화면에 그릴 값들
  const [dinoY, setDinoY] = useState(0);
  const [obstacles, setObstacles] = useState([{ id: 0, x: GAME_WIDTH + 200 }]);
  const [score, setScore] = useState(0);

  // 물리/게임 상태는 ref로 관리
  const dinoYRef = useRef(0);
  const dinoVyRef = useRef(0);
  const obstaclesRef = useRef([{ id: 0, x: GAME_WIDTH + 200 }]);
  const scoreRef = useRef(0);

  const frameReq = useRef(null);
  const lastTimeRef = useRef(null);
  const gameOverRef = useRef(false);
  const nextObstacleId = useRef(1);

  // 점프 입력
  const jump = () => {
    // 지면에 거의 붙어 있을 때만 점프 (원하면 여러 번 점프 허용 가능)
    if (dinoYRef.current <= GROUND_Y + 1) {
      dinoVyRef.current = JUMP_VELOCITY;
    }
  };

  // 키보드/마우스 이벤트 등록
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("touchstart", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, []);

  // 게임 루프
  useEffect(() => {
    // 초기화
    dinoYRef.current = 0;
    dinoVyRef.current = 0;
    obstaclesRef.current = [{ id: 0, x: GAME_WIDTH + 200, scale: 1 }];
    scoreRef.current = 0;
    setDinoY(0);
    setObstacles(obstaclesRef.current);
    setScore(0);

    gameOverRef.current = false;
    lastTimeRef.current = null;

    const loop = (timestamp) => {
      if (gameOverRef.current) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
        frameReq.current = requestAnimationFrame(loop);
        return;
      }

      const delta = timestamp - lastTimeRef.current; // ms
      lastTimeRef.current = timestamp;
      const deltaFactor = delta / 16.67; // 60fps 기준

      // 1) Dino 물리 업데이트
      dinoVyRef.current += GRAVITY * deltaFactor;
      dinoYRef.current += dinoVyRef.current * deltaFactor;
      if (dinoYRef.current < GROUND_Y) {
        dinoYRef.current = GROUND_Y;
        dinoVyRef.current = 0;
      }

      // 화면에 반영
      setDinoY(dinoYRef.current);

      // 2) 장애물 이동
      let newObs = obstaclesRef.current.map((o) => ({
        ...o,
        x: o.x - BASE_SPEED * deltaFactor,
      }));
      // 화면 밖 제거
      newObs = newObs.filter((o) => o.x + OBSTACLE_WIDTH > 0);

     // 새 장애물 추가 (간격을 더 랜덤하게)
    const maxX = newObs.reduce(
    (max, o) => (o.x > max ? o.x : max),
    -Infinity
    );
const minGap = 200;
const maxGap = 600;

if (maxX < GAME_WIDTH - 200) {
  const distance = minGap + Math.random() * (maxGap - minGap);

  // ✅ 장애물 크기 랜덤 (0.7 ~ 1.4배)
  const scale = 0.7 + Math.random() * 0.7;

  newObs.push({
    id: nextObstacleId.current++,
    x: GAME_WIDTH + distance,
    scale,
  });
}


      obstaclesRef.current = newObs;
      setObstacles(newObs);

      // 3) 점수
      scoreRef.current += delta * 0.02;
      setScore(scoreRef.current);

      // 4) 충돌 체크
      const currentY = dinoYRef.current;
      for (const o of obstaclesRef.current) {
        const dinoLeft = DINO_X;
        const dinoRight = DINO_X + 60;
        const obsLeft = o.x;
        const obsRight = o.x + OBSTACLE_WIDTH * o.scale;


        const horizontalOverlap = dinoRight > obsLeft && dinoLeft < obsRight;
        const tooLow = currentY < COLLISION_HEIGHT;

        if (horizontalOverlap && tooLow) {
          gameOverRef.current = true;
          cancelAnimationFrame(frameReq.current);
          onGameOver(Math.floor(scoreRef.current));
          return;
        }
      }

      frameReq.current = requestAnimationFrame(loop);
    };

    frameReq.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameReq.current);
    };
  }, [onGameOver]);

 return (
  <div className="screen screen--light screen--game">
    <header className="game-header">
      <div className="game-score">
        ⭐ 점수: {String(Math.floor(score)).padStart(3, "0")}
      </div>
      <div className="game-help">“스페이스바를 눌러 점프!”</div>
    </header>

    <div className="game-area game-area--full">
      {/* 공룡 */}
      <div
        className="game-dino"
        style={{
          left: DINO_X,
          bottom: 90 + dinoY,
        }}
      >
        <DinoCharacter faceImageUrl={faceImageUrl} small />
      </div>

      {/* 장애물 */}
      {obstacles.map((o) => {
  const w = OBSTACLE_WIDTH * o.scale;
  const h = OBSTACLE_HEIGHT * o.scale;

  return (
    <div
      key={o.id}
      className="game-obstacle"
      style={{
        left: o.x,
        bottom: 80,           // 너가 쓰는 바닥 높이에 맞춰
        width: w,
        height: h,
      }}
    >
      <img src={cactusImg} alt="장애물" />
    </div>
  );
})}

      {/* 바닥선 */}
      <div className="game-ground" />
    </div>
  </div>
);
}

export default GameScreen;
