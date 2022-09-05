const gameBoard = (() => {
  const squares = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

  const addMark = (index, mark) => {
    squares[index] = mark;
    gameController.incrementTurns();
    displayController.render();
  };

  return {
    squares,
    addMark,
  };
})();

const gameController = (() => {
  let turns = 0;

  const incrementTurns = () => {
    turns += 1;
  };

  const setupListeners = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((element) => {
      element.addEventListener('click', (event) => {
        console.log(event.target);
        // gameBoard.addMark();
      });
    });
  };

  return {
    incrementTurns,
    setupListeners,
  };
})();

const displayController = (() => {
  const render = () => {
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

gameController.setupListeners();
displayController.render();

gameBoard.addMark(0, 'O');
