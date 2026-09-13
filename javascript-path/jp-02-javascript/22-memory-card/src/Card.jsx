export function Card({ id, imgURL, clicked }) {
  return (
    <div className="group pointer-events-none relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-[12%] rounded-full bg-yellow-300/0 blur-2xl transition-colors duration-150 group-hover:bg-yellow-300/60" />
      <img
        id={id}
        src={imgURL}
        alt="pokemon-image"
        className={`pointer-events-auto relative h-full w-full cursor-pointer object-contain ${
          clicked ? "drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]" : ""
        }`}
      />
    </div>
  );
}
