function knightMoves(from, to) {
  let queue = [];
  let visited = {};
  let found = false;
  let validLeaps = [];
  let temp;
  queue.push(from);

  let startKey = `${from[0]},${from[1]}`;
  visited[startKey] = null;

  while (queue.length > 0 && found === false) {
    let currentPosition = queue.shift();

    let positions = [
      [currentPosition[0] + 2, currentPosition[1] + 1],
      [currentPosition[0] + 1, currentPosition[1] + 2],
      [currentPosition[0] - 1, currentPosition[1] + 2],
      [currentPosition[0] - 2, currentPosition[1] + 1],
      [currentPosition[0] + 2, currentPosition[1] - 1],
      [currentPosition[0] + 1, currentPosition[1] - 2],
      [currentPosition[0] - 1, currentPosition[1] - 2],
      [currentPosition[0] - 2, currentPosition[1] - 1],
    ];

    // console.log(currentPosition);

    for (let i = 0; i < positions.length; i++) {
      let currentMove = positions[i];
      if (
        currentMove[0] >= 0 &&
        currentMove[0] <= 7 &&
        currentMove[1] >= 0 &&
        currentMove[1] <= 7
      ) {
        let key = `${currentMove[0]},${currentMove[1]}`;
        let searchedPosition = `${to[0]},${to[1]}`;

        if (key === searchedPosition) {
          // console.log(currentMove);
          visited[key] = currentPosition;
          found = true;
          break;
        } else if (!visited[key]) {
          visited[key] = currentPosition;
          queue.push(currentMove);
        }
      }
    }
  }

  temp = `${to[0]},${to[1]}`;

  while (temp !== startKey) {
    validLeaps.push(temp);
    temp = `${visited[temp][0]},${visited[temp][1]}`;
  }

  validLeaps.push(startKey);

  // console.log(visited);
  return validLeaps.reverse();
}

knightMoves([0, 0], [7, 7]);
console.log(knightMoves([0, 0], [7, 7]));
