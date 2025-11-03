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

  const checkBoxComplete = useCallback((s: GameState, r: number, c: number) => {
    return (
      s.horizontalLines[r][c] &&
      s.horizontalLines[r + 1][c] &&
      s.verticalLines[r][c] &&
      s.verticalLines[r][c + 1]
    );
  }, []);

  const handleLineClick = useCallback(
    (type: 'horizontal' | 'vertical', row: number, col: number) => {
      setGameState((prev) => {
        const next = { ...prev };

        if (type === 'horizontal') {
          if (next.horizontalLines[row][col]) return prev; // already set
          next.horizontalLines = next.horizontalLines.map((r) => r.slice());
          next.horizontalLines[row][col] = true;
        } else {
          if (next.verticalLines[row][col]) return prev;
          next.verticalLines = next.verticalLines.map((r) => r.slice());
          next.verticalLines[row][col] = true;
        }

        // after setting the line:
        let completed = 0;
        next.boxes = next.boxes.map((row) => row.slice());
        for (let rr = 0; rr < next.height; rr++) {
          for (let cc = 0; cc < next.width; cc++) {
            if (!next.boxes[rr][cc] && checkBoxComplete(next, rr, cc)) {
              next.boxes[rr][cc] = next.currentPlayer;
              completed++;
            }
          }
        }

        if (completed > 0) {
          next.scores = {
            ...next.scores,
            [next.currentPlayer]: next.scores[next.currentPlayer] + completed,
          };
        } else {
          next.currentPlayer =
            next.currentPlayer === 'player1' ? 'player2' : 'player1';
        }

        return next;
      });
    },
    []
  );

  const pad = 10,
    cell = 60;
  const svgW = width * cell + pad * 2;
  const svgH = height * cell + pad * 2;
  return (
    <div className="game-board">
      <div className="game-info mb-4">
        <div className="scores flex gap-4 mb-2">
          <span
            className={gameState.currentPlayer === 'player1' ? 'font-bold' : ''}
          >
            Player 1: {gameState.scores.player1}
          </span>
          <span
            className={gameState.currentPlayer === 'player2' ? 'font-bold' : ''}
          >
            Player 2: {gameState.scores.player2}
          </span>
        </div>
        <div className="current-turn">
          Current Turn:{' '}
          {gameState.currentPlayer === 'player1' ? 'Player 1' : 'Player 2'}
        </div>
      </div>

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
              stroke={_isSet ? '#333' : 'transparent'}
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
              stroke={_isSet ? '#333' : 'transparent'}
              strokeWidth={3}
              className="cursor-pointer hover:stroke-blue-500"
              onClick={() => handleLineClick('vertical', r, c)}
            />
          ))
        )}

        {gameState.boxes.map((row, r) =>
          row.map((owner, c) => (
            <rect
              key={`box-${r}-${c}`}
              x={16 + c * 60}
              y={16 + r * 60}
              width={48}
              height={48}
              fill={
                owner === 'player1'
                  ? '#ff6b6b'
                  : owner === 'player2'
                    ? '#4ecdc4'
                    : 'transparent'
              }
              fillOpacity={owner ? 0.7 : 0}
            />
          ))
        )}
      </svg>
    </div>
  );
}
