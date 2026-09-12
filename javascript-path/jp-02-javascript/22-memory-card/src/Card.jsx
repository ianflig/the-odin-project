export function Card({ id, imgURL }) {
  return (
    <>
      <div className="h-full">
        <img
          id={id}
          src={imgURL}
          alt="pokemon-image"
          className="h-full object-contain"
        />
      </div>
    </>
  );
}
