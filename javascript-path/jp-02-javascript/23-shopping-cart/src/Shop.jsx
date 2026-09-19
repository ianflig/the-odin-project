import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

export function Shop() {
  const { products, setProducts, addToCart } = useOutletContext();
  const [amount, setAmount] = useState({});

  useEffect(() => {
    if (products) return;
    const fetchURL = "https://dummyjson.com/products";
    async function fetchProducts() {
      const res = await fetch(fetchURL).then((res) => res.json());
      if (res) {
        setProducts(res.products);
      }
    }

    fetchProducts();
  }, []);

  function handleChange(e) {
    const { value, id } = e.target;

    const num = Number(value);

    if (num < 1) return;

    setAmount((prev) => ({ ...prev, [id]: num }));
  }

  function handleClick(type, id) {
    type === "minus"
      ? setAmount((prev) => ({
          ...prev,
          [id]: getAmount(prev, id) > 1 ? getAmount(prev, id) - 1 : 1,
        }))
      : setAmount((prev) => ({ ...prev, [id]: getAmount(prev, id) + 1 }));
  }

  function getAmount(obj, id) {
    return obj[id] ?? 1;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-10">
        {products
          ? products.map((e) => (
              <div className="flex flex-col" key={e.id}>
                <img
                  src={e.thumbnail}
                  alt={e.title}
                  width="100px"
                  height="100px"
                />
                <h3>{e.category}</h3>
                <h1>{e.title}</h1>
                <span>{e.description}</span>
                <h2>{e.price}</h2>
                <span>Quantity</span>
                <div className="flex">
                  <button
                    className="cursor-pointer"
                    onClick={() => handleClick("minus", e.id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={getAmount(amount, e.id)}
                    onChange={handleChange}
                    id={e.id}
                    className="w-16"
                  />
                  <button
                    className="cursor-pointer"
                    onClick={() => handleClick("plus", e.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    addToCart(getAmount(amount, e.id), e.title, e.price, e.id)
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))
          : "Loading..."}
      </div>
    </>
  );
}
