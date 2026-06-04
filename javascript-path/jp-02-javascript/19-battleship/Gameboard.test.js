import { Gameboard } from "./script.js";
let game = new Gameboard(4);

game.placeShip(1, [0, 0]);
test("Place ship at 0,0. Ship length of [0, 0] should be 1", () => {
  expect(game.getGameboard()[0][0].length).toBe(1);
});

game.placeShip(3, [1, 0], [1, 1], [1, 2]);
test("Place ship of length 3 at 1,0 - 1,1 - 1,2. Ship length of [1, 0] should be 3", () => {
  expect(game.getGameboard()[1][0].length).toBe(3);
});
test("Place ship of length 3 at 1,0 - 1,1 - 1,2. Ship length of [1, 1] should be 3", () => {
  expect(game.getGameboard()[1][1].length).toBe(3);
});

game.receiveAttack([0, 0]);
test("Attack to [0, 0] ship. Ship hits should be 1", () => {
  expect(game.getGameboard()[0][0].hits).toBe(1);
});

game.receiveAttack([2, 3]);
test("Attack to non existent [2, 3] ship. Gameboard coordinates should be null", () => {
  expect(game.getGameboard()[2][3]).toBe(null);
});
test("Attack to non existent [2, 3] ship. Missed shots '2,3' record should be true", () => {
  expect(game.getMissedShots()["2,3"]).toBe(true);
});

test("allShipsSunk() should return false", () => {
  expect(game.allShipsSunk()).toBe(false);
});

let allShipSunkTest = new Gameboard(1);
allShipSunkTest.placeShip(1, [0, 0]);
allShipSunkTest.receiveAttack([0, 0]);
test("allShipsSunk() should return true", () => {
  expect(allShipSunkTest.allShipsSunk()).toBe(true);
});
