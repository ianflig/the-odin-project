import { Outlet } from "react-router";
import { useState } from "react";
import { Header } from "./Header";
import { SECTIONS } from "./constants.js";

export function AppLayout() {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);

  function addToCart(amount, title, price, id) {
    setCart((prev) =>
      prev.some((e) => e.id === id)
        ? prev.map((e) =>
            e.id === id
              ? {
                  ...e,
                  amount: e.amount + amount,
                  // total to refactor, derivated value in cart.jsx
                  total: (e.amount + amount) * e.price,
                }
              : e,
          )
        : [
            ...prev,
            {
              id: id,
              title: title,
              price: price,
              amount: amount,
              total: price,
            },
          ],
    );
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <section className="flex flex-col">
      <Header sections={SECTIONS} />
      <Outlet
        context={{ products, setProducts, cart, addToCart, handleRemove }}
      />
    </section>
  );
}
