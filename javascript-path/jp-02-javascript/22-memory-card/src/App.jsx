import { useState, useEffect } from "react";
import { Card } from "./Card";

export function App() {
  const [cards, setCards] = useState();
  const [score, setScore] = useState({ score: 0, bestScore: 0 });

  useEffect(() => {
    const urls = [];
    for (let i = 1; i < 13; i++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${i * 9}`);
    }

    const promises = urls.map((url) => fetch(url));

    async function fetchPokemons() {
      const responses = await Promise.all(promises);
      const dataToJson = await Promise.all(responses.map((e) => e.json()));
      const data = dataToJson?.map((e) => ({
        id: String(e.id),
        name: e.name,
        imgURL: `/images/${e.name}.webp`,
        clicked: false,
      }));
      data ? setCards(data) : undefined;
    }

    fetchPokemons();
  }, []);

  function shuffleArray(arr) {
    const shuffledArr = arr;
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  }

  function resetGame() {
    setScore((prev) => ({
      score: 0,
      bestScore: prev.score > prev.bestScore ? prev.score : prev.bestScore,
    }));
    setCards((prev) => {
      const setted = prev.map((e) => ({ ...e, clicked: false }));
      return shuffleArray([...setted]);
    });

    console.log("game reset");
  }

  function handleClick(e) {
    const cardId =
      e.target.tagName === "IMG" ? e.target.closest("[id]").id : undefined;

    if (!cardId) return;

    // .some() is better
    const isClicked = cards.find((e) => (e.id === cardId ? e.clicked : null));

    if (isClicked) return resetGame();

    setScore((prev) => ({ ...prev, score: prev.score + 1 }));

    setCards((prev) => {
      const newCards = prev.map((e) =>
        e.id === cardId ? { ...e, clicked: true } : e,
      );
      return shuffleArray([...newCards]);
    });
  }

  return (
    <>
      <section className="flex h-dvh flex-col gap-3 bg-[url('/images/background.webp')] bg-cover bg-center p-3 sm:gap-4 sm:p-6">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="rounded-lg bg-black/50 px-3 py-1.5 text-xl font-bold tracking-tight text-white backdrop-blur-sm sm:text-2xl md:text-3xl">
            Pokémon Memory Game
          </h1>
          <div className="flex gap-4 rounded-lg border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm sm:gap-6 sm:text-base">
            <span>
              Score:{" "}
              <span className="font-semibold text-yellow-300">
                {score?.score}
              </span>
            </span>
            <span>
              Best:{" "}
              <span className="font-semibold text-yellow-300">
                {score?.bestScore}
              </span>
            </span>
          </div>
        </div>
        <h4 className="mx-auto rounded-lg bg-black/50 px-3 py-1 text-center text-xs text-white/90 backdrop-blur-sm sm:text-sm">
          Get points by clicking on an image but don't click on any more than
          once!
        </h4>
        <div
          className="grid min-h-0 flex-1 auto-rows-fr grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-2 overflow-y-auto pr-1 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:gap-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] lg:gap-4"
          onClick={handleClick}
        >
          {cards?.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                imgURL={e.imgURL}
                clicked={e.clicked}
              ></Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
