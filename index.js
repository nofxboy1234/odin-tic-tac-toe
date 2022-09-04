const gameBoard = (() => {
  const squares = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

  return {
    squares,
  };
})();

const gameController = (() => {
  const turns = 0;
})();

const displaycController = (() => {
  let render = () => {
    gameBoard.squares.forEach((element) => {
      console.log(element);
    });
  };

  return {
    render,
  };
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

displaycController.render();
