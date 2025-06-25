import type { PropsWithChildren } from "react";
import "./App.css";
import { Dashboard } from "./screens";

export function App() {
  return (
    <Main>
      <Header />
      <Dashboard />
    </Main>
  );
}

type MainProps = PropsWithChildren;
function Main({ children }: MainProps) {
  return <main className="bg-white h-screen">{children}</main>;
}
function Header() {
  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-2xl">Admin panel</h1>
    </header>
  );
}
