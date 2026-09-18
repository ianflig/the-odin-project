import { Outlet } from "react-router";
import { Header } from "./Header";
import { SECTIONS } from "./constants.js";

export function AppLayout() {
  return (
    <>
      <Header sections={SECTIONS} />
      <Outlet />
    </>
  );
}
