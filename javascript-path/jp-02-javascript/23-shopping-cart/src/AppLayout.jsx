import { Outlet } from "react-router";
import { useState } from "react";
import { Header } from "./Header";
import { SECTIONS } from "./constants.js";

export function AppLayout() {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState();

  return (
    <section className="flex flex-col">
      <Header sections={SECTIONS} />
      <Outlet context={[products, setProducts, cart, setCart]} />
    </section>
  );
}
