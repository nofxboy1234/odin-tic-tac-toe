const gameBoard = (() => {
  // const squares = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];
  const squares = [null, null, null, null, null, null, null, null, null];

  const addMark = (index, mark) => {
    squares[index] = mark;
    displayController.render();
  };

  return {
    squares,
    addMark,
  };
})();

const gameController = (() => {
  let turn = 0;

  const incrementTurn = () => {
    turn += 1;
  };

  const setupGame = () => {
    turn = 0;
    setupListeners();
  };

  const setupListeners = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((element) => {
      element.addEventListener('click', (event) => {
        console.log(event.target);
        incrementTurn();
        const mark = turn % 2 === 0 ? 'O' : 'X';
        const index = Array.from(squares).indexOf(element);
        gameBoard.addMark(index, mark);
      });
    });
  };

  return {
    setupGame,
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

gameController.setupGame();
displayController.render();

// gameBoard.addMark(0, 'O');
