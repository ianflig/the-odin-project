import { Link, NavLink } from "react-router";

export function Header({ sections, cart }) {
  const itemsInCart = cart.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <header className="border-line bg-paper/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          to="/home"
          className="font-display text-ink text-2xl font-semibold tracking-tight"
        >
          Shopping Cart
        </Link>

        <nav className="flex items-center gap-1">
          {sections
            ? sections.map((e) => (
                <NavLink
                  key={e.linkTo}
                  to={e.linkTo}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand-soft text-brand"
                        : "text-body hover:text-brand hover:bg-brand-soft/60",
                    ].join(" ")
                  }
                >
                  {e.name}
                  {e.linkTo === "cart" && itemsInCart > 0 ? (
                    <span className="bg-brand inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.7rem] font-bold text-white">
                      {itemsInCart}
                    </span>
                  ) : null}
                </NavLink>
              ))
            : "Error"}
        </nav>
      </div>
    </header>
  );
}
