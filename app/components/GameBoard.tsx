import React, { useState } from 'react';

interface SquareState {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

const GameBoard: React.FC = () => {
  const [squareState, setSquareState] = useState<SquareState>({
    top: false,
    right: false,
    bottom: false,
    left: false
  });

  const toggleSide = (side: keyof SquareState) => {
    setSquareState(prev => ({
      ...prev,
      [side]: !prev[side]
    }));
  };

  const isSquareComplete = Object.values(squareState).every(side => side);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-4">Dots and Boxes</h1>
          <p className="text-gray-600 dark:text-gray-300">Click on the sides to select them</p>
        </header>
        
        <div className="relative">
          {/* The square container */}
          <div className="relative w-32 h-32 border-4 border-transparent">
            {/* Dots at corners */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-gray-800 dark:bg-gray-200 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-800 dark:bg-gray-200 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gray-800 dark:bg-gray-200 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gray-800 dark:bg-gray-200 rounded-full"></div>

            {/* Top side */}
            <button
              onClick={() => toggleSide('top')}
              className={`absolute -top-1 left-2 right-2 h-2 rounded transition-colors ${
                squareState.top 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            />

            {/* Right side */}
            <button
              onClick={() => toggleSide('right')}
              className={`absolute -right-1 top-2 bottom-2 w-2 rounded transition-colors ${
                squareState.right 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            />

            {/* Bottom side */}
            <button
              onClick={() => toggleSide('bottom')}
              className={`absolute -bottom-1 left-2 right-2 h-2 rounded transition-colors ${
                squareState.bottom 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            />

            {/* Left side */}
            <button
              onClick={() => toggleSide('left')}
              className={`absolute -left-1 top-2 bottom-2 w-2 rounded transition-colors ${
                squareState.left 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            />

            {/* Square fill when complete */}
            {isSquareComplete && (
              <div className="absolute inset-2 bg-green-200 dark:bg-green-800 rounded opacity-75 flex items-center justify-center">
                <span className="text-green-800 dark:text-green-200 font-bold">✓</span>
              </div>
            )}
          </div>

          {/* Debug info */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h3 className="font-bold mb-2">Square State:</h3>
            <ul className="text-sm">
              <li>Top: {squareState.top ? '✅' : '❌'}</li>
              <li>Right: {squareState.right ? '✅' : '❌'}</li>
              <li>Bottom: {squareState.bottom ? '✅' : '❌'}</li>
              <li>Left: {squareState.left ? '✅' : '❌'}</li>
              <li className="mt-2 font-bold">Complete: {isSquareComplete ? '🎉 YES' : '🔄 NO'}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GameBoard;