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

  const addMark = (index, mark) => {
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
  };
})();

const gameController = (() => {
  let turn = 1;
  const marks = ['X', 'O'];
  const squareElements = Array.from(document.querySelectorAll('.square'));

  const getTurn = () => turn;

  const incrementTurn = () => {
    turn += 1;
    // console.log(`turn: ${turn}`);
  };

  const resetTurn = () => {
    turn = 1;
  };

  const isWinningRow = () => {
    const wins = [
      ['X', 'X', 'X'],
      ['O', 'O', 'O'],
    ];

    for (let index = 0; index < wins.length; index++) {
      // console.log(`top row: ${gameBoard.getSquares().slice(0, 3)}`);
      // console.log(`current check: ${wins[index]}`);

      if (
        gameBoard.getSquares().slice(0, 3).toString() === wins[index].toString()
      ) {
        // console.log('win top row');
        return true;
      }
      if (
        gameBoard.getSquares().slice(3, 6).toString() === wins[index].toString()
      ) {
        return true;
      }
      if (
        gameBoard.getSquares().slice(6, 9).toString() === wins[index].toString()
      ) {
        return true;
      }
    }
    return false;
  };

  const isWinningColumn = () => {
    let win = false;
    marks.forEach((element) => {
      if (
        gameBoard.getSquares().at(0) === element &&
        gameBoard.getSquares().at(3) === element &&
        gameBoard.getSquares().at(6) === element
      ) {
        win = true;
      }
      if (
        gameBoard.getSquares().at(1) === element &&
        gameBoard.getSquares().at(4) === element &&
        gameBoard.getSquares().at(7) === element
      ) {
        win = true;
      }
      if (
        gameBoard.getSquares().at(2) === element &&
        gameBoard.getSquares().at(5) === element &&
        gameBoard.getSquares().at(8) === element
      ) {
        win = true;
      }
    });
    return win;
  };

  const isWinningDiagonal = () => {
    let win = false;
    marks.forEach((element) => {
      if (
        gameBoard.getSquares().at(0) === element &&
        gameBoard.getSquares().at(4) === element &&
        gameBoard.getSquares().at(8) === element
      ) {
        win = true;
      }
      if (
        gameBoard.getSquares().at(2) === element &&
        gameBoard.getSquares().at(4) === element &&
        gameBoard.getSquares().at(6) === element
      ) {
        win = true;
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
    gameBoard.addMark(index, mark);

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
