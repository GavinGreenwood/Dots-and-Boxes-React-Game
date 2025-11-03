import React, { useCallback, useState } from 'react';

type Player = 'player1' | 'player2';
interface GameState {
  width: number;
  height: number;
  horizontalLines: boolean[][]; // (height+1) × width
  verticalLines: boolean[][]; // height × (width+1)
  boxes: (Player | null)[][]; // height × width
  currentPlayer: Player;
  scores: { player1: number; player2: number };
}

export function GameBoard({
  width = 4,
  height = 4,
}: {
  width?: number;
  height?: number;
}) {
  const [gameState, setGameState] = useState<GameState>(() => ({
    width,
    height,
    horizontalLines: Array.from({ length: height + 1 }, () =>
      Array.from({ length: width }, () => false)
    ),
    verticalLines: Array.from({ length: height }, () =>
      Array.from({ length: width + 1 }, () => false)
    ),
    boxes: Array.from({ length: height }, () =>
      Array.from({ length: width }, () => null)
    ),
    currentPlayer: 'player1',
    scores: { player1: 0, player2: 0 },
  }));

  const handleLineClick = useCallback((type: "horizontal" | "vertical", row: number, col: number) => {
  setGameState(prev => {
    const next = { ...prev };

    if (type === "horizontal") {
      if (next.horizontalLines[row][col]) return prev; // already set
      next.horizontalLines = next.horizontalLines.map(r => r.slice());
      next.horizontalLines[row][col] = true;
    } else {
      if (next.verticalLines[row][col]) return prev;
      next.verticalLines = next.verticalLines.map(r => r.slice());
      next.verticalLines[row][col] = true;
    }

    return next;
  });
}, []);

  const pad = 10,
    cell = 60;
  const svgW = width * cell + pad * 2;
  const svgH = height * cell + pad * 2;
  return (
    <svg width={svgW} height={svgH} className="border border-gray-300">
      {Array.from({ length: height + 1 }, (_, r) =>
        Array.from({ length: width + 1 }, (_, c) => (
          <circle
            key={`dot-${r}-${c}`}
            cx={pad + c * cell}
            cy={pad + r * cell}
            r={3}
            fill="#333"
          />
        ))
      )}

      {/* horizontal lines */}
      {gameState.horizontalLines.map((row, r) =>
        row.map((_isSet, c) => (
          <line
            key={`h-${r}-${c}`}
            x1={16 + c * 60}
            y1={10 + r * 60}
            x2={4 + (c + 1) * 60}
            y2={10 + r * 60}
            stroke={_isSet ? "#333" : "transparent"}
            strokeWidth={3}
            className="cursor-pointer hover:stroke-blue-500"
            onClick={() => handleLineClick('horizontal', r, c)}
          />
        ))
      )}

      {/* vertical lines */}
      {gameState.verticalLines.map((row, r) =>
        row.map((_isSet, c) => (
          <line
            key={`v-${r}-${c}`}
            x1={10 + c * 60}
            y1={16 + r * 60}
            x2={10 + c * 60}
            y2={4 + (r + 1) * 60}
            stroke={_isSet ? "#333" : "transparent"}
            strokeWidth={3}
            className="cursor-pointer hover:stroke-blue-500"
            onClick={() => handleLineClick('vertical', r, c)}
          />
        ))
      )}
    </svg>
  );
}
