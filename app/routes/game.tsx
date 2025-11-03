import type { Route } from "./+types/game";
import { GameBoard } from "../components/game/GameBoard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Play Dots and Boxes" }];
}

export default function Game() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dots & Boxes</h1>
      <GameBoard width={3} height={3} />
    </div>
  );
}