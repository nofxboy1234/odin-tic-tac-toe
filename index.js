const gameBoard = (() => {
  const squares = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

  const addMark = (index, mark) => {
    squares[index] = mark;
    console.log(squares);
    displayController.render();
  };

  return {
    squares,
    addMark,
  };
})();

const gameController = (() => {
  const turns = 0;
})();

const displayController = (() => {
  let render = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((element) => {
      element.textContent =
        gameBoard.squares[Array.from(squares).indexOf(element)];
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

displayController.render();

gameBoard.addMark(0, 'O');
