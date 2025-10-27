import { Link } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            {/* <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              What&apos;s next?
            </p> */}
            <ul>
              {resources.map(({ href, text, icon }) => (
                <li key={href}>
                  <Link
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                    to={href}
                  >
                    {icon}
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

const resources = [
  {
    href: "/game",
    text: "Start Playing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M6 12h4m4 0h4m-7-3v6m-5 4.5c-1.5 0-3-1.5-3-3v-7c0-1.5 1.5-3 3-3h14c1.5 0 3 1.5 3 3v7c0 1.5-1.5 3-3 3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="10" r="1" fill="currentColor" />
        <circle cx="18" cy="14" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
];
