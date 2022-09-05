const gameBoard = (() => {
  // const squares = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];
  let squares = [null, null, null, null, null, null, null, null, null];

  const getSquares = () => squares;

  const isSquareTaken = (index) => {
    return squares[index] !== null;
  };

  const reset = () => {
    // console.log('reset');
    squares = [null, null, null, null, null, null, null, null, null];
    // console.log(`squares: ${squares}`);
  };

  const toggleSquaresMarked = (elementArray) => {
    elementArray.forEach((element) => {
      element.classList.toggle('marked');
    });
  };

  const addMark = (index, mark, element) => {
    if (isSquareTaken(index)) {
      console.log('Square is taken, returning');
      return;
    }
    console.log('Marking square');
    squares[index] = mark;
    gameController.incrementTurn();
    displayController.render();

    // console.log(squares);
  };

  return {
    getSquares,
    addMark,
    reset,
    toggleSquaresMarked,
  };
})();

const gameController = (() => {
  let turn = 1;
  const marks = ['X', 'O'];
  const squareElements = Array.from(document.querySelectorAll('.square'));
  let winningLineElements = [];

  const getTurn = () => turn;

  const incrementTurn = () => {
    turn += 1;
    // console.log(`turn: ${turn}`);
  };

  const resetTurn = () => {
    turn = 1;
    // winningLineElements = [];
  };

  const isWinningRow = () => {
    const wins = [
      ['X', 'X', 'X'],
      ['O', 'O', 'O'],
    ];

    for (let index = 0; index < wins.length; index++) {
      let row = gameBoard.getSquares().slice(0, 3);
      if (row.toString() === wins[index].toString()) {
        winningLineElements = squareElements.slice(0, 3);
        gameBoard.toggleSquaresMarked(winningLineElements);
        return true;
      }

      row = gameBoard.getSquares().slice(3, 6);
      if (row.toString() === wins[index].toString()) {
        winningLineElements = squareElements.slice(3, 6);
        gameBoard.toggleSquaresMarked(winningLineElements);
        return true;
      }

      row = gameBoard.getSquares().slice(6, 9);
      if (row.toString() === wins[index].toString()) {
        winningLineElements = squareElements.slice(6, 9);
        gameBoard.toggleSquaresMarked(winningLineElements);
        return true;
      }
    }
    return false;
  };

  const isWinningColumn = () => {
    let win = false;
    marks.forEach((mark) => {
      if (
        gameBoard.getSquares().at(0) === mark &&
        gameBoard.getSquares().at(3) === mark &&
        gameBoard.getSquares().at(6) === mark
      ) {
        win = true;
        winningLineElements = [
          squareElements[0],
          squareElements[3],
          squareElements[6],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      } else if (
        gameBoard.getSquares().at(1) === mark &&
        gameBoard.getSquares().at(4) === mark &&
        gameBoard.getSquares().at(7) === mark
      ) {
        win = true;
        winningLineElements = [
          squareElements[1],
          squareElements[4],
          squareElements[7],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      } else if (
        gameBoard.getSquares().at(2) === mark &&
        gameBoard.getSquares().at(5) === mark &&
        gameBoard.getSquares().at(8) === mark
      ) {
        win = true;
        winningLineElements = [
          squareElements[2],
          squareElements[5],
          squareElements[8],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      }
    });
    return win;
  };

  const isWinningDiagonal = () => {
    let win = false;
    marks.forEach((mark) => {
      if (
        gameBoard.getSquares().at(0) === mark &&
        gameBoard.getSquares().at(4) === mark &&
        gameBoard.getSquares().at(8) === mark
      ) {
        win = true;
        winningLineElements = [
          squareElements[0],
          squareElements[4],
          squareElements[8],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      } else if (
        gameBoard.getSquares().at(2) === mark &&
        gameBoard.getSquares().at(4) === mark &&
        gameBoard.getSquares().at(6) === mark
      ) {
        win = true;
        winningLineElements = [
          squareElements[2],
          squareElements[4],
          squareElements[6],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      }
    });
    return win;
  };

  const isTie = () => {
    if (turn === 9) {
      return true;
    }
    return false;
  };

  const isGameOver = () => {
    // console.log('isGameOver');
    return (
      isWinningRow() || isWinningColumn() || isWinningDiagonal() || isTie()
    );
  };

  const endGame = () => {
    gameBoard.reset();
    resetTurn();
    removeListeners();
    setTimeout(() => {
      displayController.render();
      addListeners();
      gameBoard.toggleSquaresMarked(winningLineElements);
    }, 2000);
  };

  const removeListeners = () => {
    console.log('removeListeners');

    squareElements.forEach((element) => {
      // console.log(element);
      element.removeEventListener('click', playTurn);
    });
  };

  const addListeners = () => {
    console.log('addListeners');

    squareElements.forEach((element) => {
      // console.log(element);
      element.addEventListener('click', playTurn);
    });
  };

  const playTurn = (event) => {
    // incrementTurn();
    console.log(`turn: ${turn}`);
    const mark = turn % 2 === 0 ? 'O' : 'X';
    const index = Array.from(squareElements).indexOf(event.target);
    gameBoard.addMark(index, mark, event.target);

    if (isGameOver()) {
      console.log(`${mark} wins!`);
      endGame();
    } else if (isTie()) {
      console.log('Game is tied');
      endGame();
    }
  };

  return {
    getTurn,
    addListeners,
    incrementTurn,
  };
})();

const displayController = (() => {
  const render = () => {
    // console.log('displayController.render');
    const squares = document.querySelectorAll('.square');
    squares.forEach((element) => {
      // console.log(`gameBoard.getSquares(): ${gameBoard.getSquares()}`);
      element.textContent =
        gameBoard.getSquares()[Array.from(squares).indexOf(element)];
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

gameController.addListeners();
displayController.render();
