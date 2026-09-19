import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

export function Shop() {
  const [products, setProducts] = useOutletContext();
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (products) return;
    const fetchURL = "https://dummyjson.com/products";
    async function fetchProducts() {
      const res = await fetch(fetchURL).then((res) => res.json());
      res ? setProducts(res.products) : undefined;
      console.log(res.products);
    }

    fetchProducts();
  }, []);

  function handleChange(e) {
    const { value, id } = e.target;
    // todo: setAmount with indexed key {...prev, [id]: value,} and parse to Number on set
  }

  function handleClick(e) {
    const { name } = e.target;
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
                    onClick={handleClick}
                    name="less"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    // value={amount?.[e.id] || 1}
                    onChange={handleChange}
                    id={e.id}
                  />
                  <button
                    className="cursor-pointer"
                    onClick={handleClick}
                    name="more"
                  >
                    +
                  </button>
                </div>
                {/* onClick={addToCart} -> useOutletContext() */}
                <button className="cursor-pointer">Add to Cart</button>
              </div>
            ))
          : "Loading..."}
      </div>
    </>
  );
}
