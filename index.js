const gameBoard = (() => {
  const squares = [];
})();

const gameController = (() => {
  const turns = 0;
})();

const player = (name) => {
  return {
    name,
  };
};

const player1 = player('Player 1');
const player2 = player('Player 2');
console.log(player1.name);
console.log(player2.name);
