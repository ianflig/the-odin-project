import { Link } from "react-router";

export function Header({ sections }) {
  return (
    <>
      {sections
        ? sections.map((e) => (
            <Link key={e.id} to={e.linkTo}>
              {e.name}
            </Link>
          ))
        : "Error"}
    </>
  );
}
