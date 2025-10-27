import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dots and Boxes Game" },
    { name: "description", content: "Welcome to the Dots and Boxes Game!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
