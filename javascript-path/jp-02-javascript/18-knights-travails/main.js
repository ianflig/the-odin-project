function knightMoves(from, to) {
  let queue = [];
  let visited = {};
  let found = false;
  let path = [];
  let temp;

  queue.push(from);

  // formatted start (position)
  let startKey = `${from[0]},${from[1]}`;
  visited[startKey] = null;

  // BFS
  while (queue.length > 0 && found === false) {
    let currentPosition = queue.shift();

    // all possible leaps
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

    // filter invalid leaps (out of the 8x8 matrix)
    for (let i = 0; i < positions.length; i++) {
      let currentMove = positions[i];
      if (
        currentMove[0] >= 0 &&
        currentMove[0] <= 7 &&
        currentMove[1] >= 0 &&
        currentMove[1] <= 7
      ) {
        // format the valid move
        let key = `${currentMove[0]},${currentMove[1]}`;
        let searchedPosition = `${to[0]},${to[1]}`;
        // condition in case it founds the target
        if (key === searchedPosition) {
          visited[key] = currentPosition;
          found = true;
          break;
          // store the valid move & filter for next loop
        } else if (!visited[key]) {
          visited[key] = currentPosition;
          queue.push(currentMove);
        }
      }
    }
  }

  // print movements section
  temp = `${to[0]},${to[1]}`;

  while (temp !== startKey) {
    path.push(temp);
    temp = `${visited[temp][0]},${visited[temp][1]}`;
  }

  path.push(startKey);

  console.log(`You made it in ${path.length - 1} moves. Path:`);
  console.log(path.reverse());
}

knightMoves([3, 3], [4, 3]);
