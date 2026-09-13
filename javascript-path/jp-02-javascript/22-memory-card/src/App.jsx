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
        imgURL: `../public/images/${e.name}.webp`,
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
      <section className="flex h-dvh flex-col bg-black">
        <div className="flex justify-between">
          <h1>Pokemon Memory Game</h1>
          <div className="flex flex-col">
            <span>Score: {score?.score}</span>
            <span>Best Score: {score?.bestScore}</span>
          </div>
        </div>
        <h4>
          Get points by clicking on an image but don't click on any more than
          once!
        </h4>
        <div
          className="grid min-h-0 flex-1 auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 overflow-y-auto"
          onClick={handleClick}
        >
          {cards?.map((e) => {
            return <Card key={e.id} id={e.id} imgURL={e.imgURL}></Card>;
          })}
        </div>
      </section>
    </>
  );
}
