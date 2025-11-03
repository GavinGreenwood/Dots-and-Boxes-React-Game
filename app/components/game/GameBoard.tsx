import React, { useState } from "react";

type Player = "player1" | "player2";
interface GameState {
  width: number;
  height: number;
  horizontalLines: boolean[][]; // (height+1) × width
  verticalLines: boolean[][];   // height × (width+1)
  boxes: (Player | null)[][];   // height × width
  currentPlayer: Player;
  scores: { player1: number; player2: number };
}

export function GameBoard({ width = 4, height = 4 }: { width?: number; height?: number }) {
  const [gameState] = useState<GameState>(() => ({
    width, height,
    horizontalLines: Array.from({ length: height + 1 }, () => Array.from({ length: width }, () => false)),
    verticalLines:   Array.from({ length: height }, () => Array.from({ length: width + 1 }, () => false)),
    boxes:           Array.from({ length: height }, () => Array.from({ length: width }, () => null)),
    currentPlayer: "player1",
    scores: { player1: 0, player2: 0 },
  }));

  // Render dots exactly as before
  const pad = 10, cell = 60;
  const svgW = width * cell + pad * 2;
  const svgH = height * cell + pad * 2;
  return (
    <svg width={svgW} height={svgH} className="border border-gray-300">
      {Array.from({ length: height + 1 }, (_, r) =>
        Array.from({ length: width + 1 }, (_, c) => (
          <circle key={`dot-${r}-${c}`} cx={pad + c * cell} cy={pad + r * cell} r={3} fill="#333" />
        ))
      )}
    </svg>
  );
}
