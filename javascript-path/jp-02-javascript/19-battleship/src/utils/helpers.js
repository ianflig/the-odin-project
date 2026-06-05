export function formatCoords(coords) {
  let coordsFormatted = [];
  coords.split(",").forEach((ele) => {
    coordsFormatted.push(Number(ele));
  });

  return coordsFormatted;
}
