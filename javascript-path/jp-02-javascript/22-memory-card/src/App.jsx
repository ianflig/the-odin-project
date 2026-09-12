import { useState, useEffect } from "react";

export function App() {
  const [cards, setCards] = useState("");

  useEffect(() => {
    const urls = [];
    //math random in the future
    for (let i = 1; i < 13; i++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    const promises = urls.map((url) => fetch(url));

    async function fetchPokemons() {
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map((e) => e.json()));
      return console.log(data);
    }

    fetchPokemons();
  }, []);

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
