import { Link } from "react-router";

export function Home() {
  return (
    <section className="flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-20">
      <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
        A little shop for everyday things
      </p>

      <h1 className="font-display text-ink mt-7 max-w-3xl text-6xl leading-[1.02] font-semibold sm:text-7xl">
        Find your next
        <span className="text-accent block font-normal italic">
          favorite thing.
        </span>
      </h1>

      <p className="text-body mt-7 max-w-md text-lg leading-relaxed">
        Browse a small collection of useful goods, pick what you love, and add
        it to your cart.
      </p>

      <Link
        to="/shop"
        className="bg-brand hover:bg-brand-dark mt-10 inline-flex w-fit items-center gap-2.5 rounded-xl px-7 py-4 text-sm font-semibold text-white shadow-sm transition-colors"
      >
        Explore the shop
        <span aria-hidden="true">&#8599;</span>
      </Link>
    </section>
  );
}
