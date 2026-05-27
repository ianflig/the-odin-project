function knightMoves(from, to) {
  let queue = [];
  let found = false;
  queue.push(from);

  while (queue.length > 0 && found === false) {
    // let availableLeaps = [];
    let currentPosition = queue[0];
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
        if (currentMove[0] === to[0] && currentMove[1] === to[1]) {
          console.log(currentMove);
          return (found = true);
        } else {
          queue.push(currentMove);
        }
      }
    }

    queue.shift();
  }

  // return availableLeaps;
}

// console.log(knightMoves([0, 0]));
knightMoves([0, 0], [4, 3]);

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
