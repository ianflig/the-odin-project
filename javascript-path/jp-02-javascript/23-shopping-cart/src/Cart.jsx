import { useOutletContext } from "react-router";

export function Cart() {
  const { cart, removeFromCart, handleItemQuantity } = useOutletContext();

  return (
    <section className="py-16">
      <h1 className="font-display text-ink text-5xl font-semibold sm:text-6xl">
        Your cart
      </h1>

      <div className="mt-10 flex flex-col gap-4">
        {cart?.map((e) => (
          <article
            key={e.id}
            className="border-line bg-surface flex flex-col gap-5 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-ink text-lg font-semibold">
                {e.title}
              </h2>
              <p className="text-muted mt-1 text-sm">${e.price} each</p>
            </div>

            <div className="border-line flex w-fit items-center overflow-hidden rounded-lg border">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="text-body hover:bg-brand-soft hover:text-brand flex h-9 w-9 cursor-pointer items-center justify-center text-lg transition-colors"
                onClick={() => handleItemQuantity(-1, e.id)}
              >
                &#8722;
              </button>
              <span className="border-line text-ink flex h-9 w-12 items-center justify-center border-x text-sm font-semibold">
                {e.amount}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="text-body hover:bg-brand-soft hover:text-brand flex h-9 w-9 cursor-pointer items-center justify-center text-lg transition-colors"
                onClick={() => handleItemQuantity(1, e.id)}
              >
                +
              </button>
            </div>

            <span className="text-brand w-28 text-lg font-bold sm:text-right">
              ${(e.price * e.amount).toFixed(2)}
            </span>

            <button
              type="button"
              className="text-accent hover:text-ink w-fit cursor-pointer text-sm font-medium underline underline-offset-4 transition-colors"
              onClick={() => removeFromCart(e.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="border-line mt-8 border-t pt-6 text-right">
        <span className="font-display text-ink text-2xl font-semibold">
          Total: $
          {cart
            .reduce((acc, curr) => acc + curr.amount * curr.price, 0)
            .toFixed(2)}
        </span>
      </div>
    </section>
  );
}
