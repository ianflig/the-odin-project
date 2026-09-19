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
            },
          ],
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((e) => e.id !== id));
  }

  function handleItemQuantity(delta, id) {
    setCart((prev) =>
      prev
        .map((e) =>
          e.id === id
            ? {
                ...e,
                amount: e.amount + delta,
              }
            : e,
        )
        .filter((e) => e.amount > 0),
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <Header sections={SECTIONS} cart={cart} />
      <main className="mx-auto w-full max-w-6xl px-6 pt-18">
        <Outlet
          context={{
            products,
            setProducts,
            cart,
            addToCart,
            removeFromCart,
            handleItemQuantity,
          }}
        />
      </main>
    </div>
  );
}
