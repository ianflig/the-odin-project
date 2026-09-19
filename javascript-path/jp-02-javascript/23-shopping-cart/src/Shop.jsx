import { useEffect } from "react";
import { useOutletContext } from "react-router";

export function Shop() {
  const [products, setProducts] = useOutletContext();

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

  return (
    <>
      <div className="grid-cols[repeat(auto-fit, minmax(120px, 1fr))] grid">
        {products ? <span>{products[0].title}</span> : undefined}
      </div>
    </>
  );
}
