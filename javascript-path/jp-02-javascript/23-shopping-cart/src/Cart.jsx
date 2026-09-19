import { useOutletContext } from "react-router";

export function Cart() {
  const { cart, removeFromCart, handleItemQuantity } = useOutletContext();

  return (
    <div className="flex flex-col">
      Your cart
      <div>
        {cart?.map((e) => (
          <div key={e.id} className="flex gap-10">
            <div className="flex flex-col">
              <h1>{e.title}</h1>
              <h4>$ {e.price} each</h4>
            </div>
            <div className="flex">
              <button
                className="cursor-pointer"
                onClick={() => handleItemQuantity(-1, e.id)}
              >
                -
              </button>
              <span>{e.amount}</span>
              <button
                className="cursor-pointer"
                onClick={() => handleItemQuantity(1, e.id)}
              >
                +
              </button>
            </div>
            <span>{(e.price * e.amount).toFixed(2)}</span>
            <button onClick={() => removeFromCart(e.id)}>Remove</button>
          </div>
        ))}
      </div>
      <span>
        Total:{" "}
        {cart
          .reduce((acc, curr) => acc + curr.amount * curr.price, 0)
          .toFixed(2)}
      </span>
    </div>
  );
}
