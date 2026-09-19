import { Link, NavLink } from "react-router";

export function Header({ sections }) {
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
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand-soft text-brand"
                        : "text-body hover:text-brand hover:bg-brand-soft/60",
                    ].join(" ")
                  }
                >
                  {e.name}
                </NavLink>
              ))
            : "Error"}
        </nav>
      </div>
    </header>
  );
}
