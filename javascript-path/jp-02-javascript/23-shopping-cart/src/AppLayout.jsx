import { Outlet } from "react-router";
import { Header } from "./Header";
import { SECTIONS } from "./constants.js";

export function AppLayout() {
  return (
    <section className="flex flex-col">
      <Header sections={SECTIONS} />
      <Outlet />
    </section>
  );
}
