import GameBoard from "../components/GameBoard";

export function meta() {
  return [
    { title: "Dots and Boxes - Play Game" },
    { name: "description", content: "Play the Dots and Boxes Game!" },
  ];
}

export default function Game() {
  return <GameBoard />;
}