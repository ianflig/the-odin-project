import { useOutletContext } from "react-router";

export function Cart() {
  const { cart } = useOutletContext();

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
                //   onClick={() => handleClick("minus", e.id)}
              >
                -
              </button>
              <span>{e.amount}</span>
              <button
              //   className="cursor-pointer"
              //   onClick={() => handleClick("plus", e.id)}
              >
                +
              </button>
            </div>
            <span>{e.total}</span>
            <button>Remove</button>
          </div>
        ))}
      </div>
      <span>Total: </span>
    </div>
  );
}
