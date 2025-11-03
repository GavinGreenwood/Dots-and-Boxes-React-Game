import type { Route } from "./+types/game";
import { GameBoard } from "../components/game/GameBoard";
import { useState } from "react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Play Dots and Boxes" },
    { name: "description", content: "Play the classic Dots and Boxes game" },
  ];
}

export default function Game() {
  const [gameKey, setGameKey] = useState(0);
  const [gameResult, setGameResult] = useState<string | null>(null);

  const handleGameEnd = (winner: 'player1' | 'player2' | 'tie') => {
    const resultText = winner === 'tie'
      ? "It's a tie!"
      : `${winner === 'player1' ? 'Player 1' : 'Player 2'} wins!`; // ✅ backticks
    setGameResult(resultText);
  };

  const resetGame = () => {
    setGameKey(prev => prev + 1);
    setGameResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Dots and Boxes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect the dots to form boxes. The player with the most boxes wins!
          </p>
        </header>

        <div className="flex flex-col items-center gap-6">
          {gameResult && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <span className="text-xl font-semibold">{gameResult}</span>
            </div>
          )}

          <GameBoard
            key={gameKey}
            width={2}
            height={2}
            onGameEnd={handleGameEnd}
          />

          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              New Game
            </button>
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
