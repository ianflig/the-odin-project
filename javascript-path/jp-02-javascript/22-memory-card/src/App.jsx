import { useState, useEffect } from "react";

export function App() {
  const [cards, setCards] = useState("");

  useEffect(() => {}, []);

  return (
    <>
      <section className="min-h-screen bg-black">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {/* {cards map} */}
        </div>
      </section>
    </>
  );
}
