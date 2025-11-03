import React from "react";

export function GameBoard({ width = 4, height = 4 }: { width?: number; height?: number }) {
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