function checkVisited(visitedList, key) {
  return visitedList[key] === true;
}

function knightMoves(from, to) {
  let queue = [];
  let visited = {};
  let found = false;
  queue.push(from);

  while (queue.length > 0 && found === false) {
    let currentPosition = queue.shift();

    let currentKey = `${currentPosition[0]},${currentPosition[1]}`;
    visited[currentKey] = true;

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

    console.log(currentPosition);

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
          console.log(currentMove);
          found = true;
          break;
        } else if (!visited[key]) {
          visited[key] = true;
          queue.push(currentMove);
        }
      }
    }
  }

  console.log(visited);
}

// console.log(knightMoves([0, 0]));
knightMoves([0, 0], [4, 4]);

// let visited = {
//   "2,1": true,
//   "3,4": true,
//   "6,5": true,
// };

// let arr = [8, 4];

// let key = `${arr[0]},${arr[1]}`;
// visited[key] = true;

// let newKey = "8,5";
// visited[newKey] = false;

// if (!visited[newKey] || visited[newKey] !== true) console.log(true);

// console.log(visited);
// console.log(checkVisited(visited, key));

// let a = [1, 2];
// let b = [1, 2];

// console.log(a[0] === b[0] && a[1] === b[1]);

// < 0 || > 7  = invalid movement

// 1) y = number + 2
//    x = number + 1

// 2) y = number + 1
//    x = number + 2

// 3) y = number - 1
//    x = number + 2

// 4) y = number - 2
//    x = number + 1

// 5) y = number + 2
//    x = number - 1

// 6) y = number + 1
//    x = number - 2

// 7) y = number - 1
//    x = number - 2

// 8) y = number - 2
//    x = number - 1
