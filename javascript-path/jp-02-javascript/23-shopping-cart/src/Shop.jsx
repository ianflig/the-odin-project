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
    <section className="py-16">
      <h1 className="font-display text-ink text-5xl font-semibold sm:text-6xl">
        Shop
      </h1>
      <p className="text-body mt-3 text-lg">
        Choose a quantity, then add your favorites to your cart.
      </p>

      {products ? (
        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {products.map((e) => (
            <article
              className="border-line bg-surface flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
              key={e.id}
            >
              <div className="bg-paper border-line flex aspect-[4/3] items-center justify-center border-b p-6">
                <img
                  src={e.thumbnail}
                  alt={e.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-accent text-[0.7rem] font-bold tracking-[0.14em] uppercase">
                  {e.category}
                </p>
                <h2 className="font-display text-ink mt-2 text-xl leading-snug font-semibold">
                  {e.title}
                </h2>
                <p className="text-body mt-2 line-clamp-3 text-sm leading-relaxed">
                  {e.description}
                </p>

                <p className="text-brand mt-auto pt-4 text-xl font-bold">
                  ${e.price}
                </p>

                <label
                  htmlFor={e.id}
                  className="text-ink mt-5 text-xs font-semibold tracking-wide uppercase"
                >
                  Quantity
                </label>

                <div className="border-line mt-2 flex w-fit items-center overflow-hidden rounded-lg border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="text-body hover:bg-brand-soft hover:text-brand flex h-10 w-10 cursor-pointer items-center justify-center text-lg transition-colors"
                    onClick={() => handleClick("minus", e.id)}
                  >
                    &#8722;
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={getAmount(amount, e.id)}
                    onChange={handleChange}
                    id={e.id}
                    className="border-line text-ink h-10 w-14 border-x bg-transparent text-center text-sm font-semibold focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="text-body hover:bg-brand-soft hover:text-brand flex h-10 w-10 cursor-pointer items-center justify-center text-lg transition-colors"
                    onClick={() => handleClick("plus", e.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="bg-brand hover:bg-brand-dark mt-5 w-full cursor-pointer rounded-xl py-3.5 text-sm font-semibold text-white transition-colors"
                  onClick={() =>
                    addToCart(getAmount(amount, e.id), e.title, e.price, e.id)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-muted mt-12">Loading...</p>
      )}
    </section>
  );
}
