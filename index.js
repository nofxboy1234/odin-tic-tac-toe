const gameBoard = (() => {
  let squareMarks = [null, null, null, null, null, null, null, null, null];

  const getSquareMarks = () => squareMarks;

  const isSquareTaken = (index) => {
    return squareMarks[index] !== null;
  };

  const reset = () => {
    squareMarks = [null, null, null, null, null, null, null, null, null];
  };

  const toggleSquaresMarked = (elementArray) => {
    if (elementArray === []) {
      return;
    }
    elementArray.forEach((element) => {
      element.classList.toggle('marked');
    });
  };

  const addMark = (index) => {
    if (isSquareTaken(index)) {
      console.log('Square is taken, returning');
      return;
    }
    console.log('Marking square');
    gameController.incrementTurn();
    const mark = gameController.getTurn() % 2 === 0 ? 'O' : 'X';
    squareMarks[index] = mark;
    displayController.render();

    return mark;
  };

  return {
    getSquareMarks,
    addMark,
    reset,
    toggleSquaresMarked,
  };
})();

const gameController = (() => {
  let turn = 0;
  const markSymbols = ['X', 'O'];
  const squareElements = Array.from(document.querySelectorAll('.square'));
  const restartButton = document.querySelector('#restart-game');
  const winnerElement = document.querySelector('#winner');
  const playerOneElement = document.querySelector('#player-one');
  const playerTwoElement = document.querySelector('#player-two');

  let winningLineElements = [];

  const getTurn = () => turn;

  const incrementTurn = () => {
    turn += 1;
    console.log(`turn: ${getTurn()}`);
  };

  const resetTurn = () => {
    turn = 0;
  };

  const isWinningRow = () => {
    const wins = [
      ['X', 'X', 'X'],
      ['O', 'O', 'O'],
    ];

    for (let index = 0; index < wins.length; index++) {
      let marksRow = gameBoard.getSquareMarks().slice(0, 3);
      if (marksRow.toString() === wins[index].toString()) {
        winningLineElements = squareElements.slice(0, 3);
        gameBoard.toggleSquaresMarked(winningLineElements);
        return true;
      }

      marksRow = gameBoard.getSquareMarks().slice(3, 6);
      if (marksRow.toString() === wins[index].toString()) {
        winningLineElements = squareElements.slice(3, 6);
        gameBoard.toggleSquaresMarked(winningLineElements);
        return true;
      }

      marksRow = gameBoard.getSquareMarks().slice(6, 9);
      if (marksRow.toString() === wins[index].toString()) {
        winningLineElements = squareElements.slice(6, 9);
        gameBoard.toggleSquaresMarked(winningLineElements);
        return true;
      }
    }
    return false;
  };

  const isWinningColumn = () => {
    let win = false;
    markSymbols.forEach((markSymbol) => {
      if (
        gameBoard.getSquareMarks().at(0) === markSymbol &&
        gameBoard.getSquareMarks().at(3) === markSymbol &&
        gameBoard.getSquareMarks().at(6) === markSymbol
      ) {
        win = true;
        winningLineElements = [
          squareElements[0],
          squareElements[3],
          squareElements[6],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      } else if (
        gameBoard.getSquareMarks().at(1) === markSymbol &&
        gameBoard.getSquareMarks().at(4) === markSymbol &&
        gameBoard.getSquareMarks().at(7) === markSymbol
      ) {
        win = true;
        winningLineElements = [
          squareElements[1],
          squareElements[4],
          squareElements[7],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      } else if (
        gameBoard.getSquareMarks().at(2) === markSymbol &&
        gameBoard.getSquareMarks().at(5) === markSymbol &&
        gameBoard.getSquareMarks().at(8) === markSymbol
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
    markSymbols.forEach((mark) => {
      if (
        gameBoard.getSquareMarks().at(0) === mark &&
        gameBoard.getSquareMarks().at(4) === mark &&
        gameBoard.getSquareMarks().at(8) === mark
      ) {
        win = true;
        winningLineElements = [
          squareElements[0],
          squareElements[4],
          squareElements[8],
        ];
        gameBoard.toggleSquaresMarked(winningLineElements);
      } else if (
        gameBoard.getSquareMarks().at(2) === mark &&
        gameBoard.getSquareMarks().at(4) === mark &&
        gameBoard.getSquareMarks().at(6) === mark
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

  const isWinner = () => {
    return isWinningRow() || isWinningColumn() || isWinningDiagonal();
  };

  const endGame = () => {
    removeListeners();
  };

  const restartGame = () => {
    gameBoard.reset();
    resetTurn();
    displayController.render();
    addListeners();
    gameBoard.toggleSquaresMarked(winningLineElements);
    winningLineElements = [];
    winnerElement.textContent = '';
  };

  const removeListeners = () => {
    console.log('removeListeners');

    squareElements.forEach((element) => {
      element.removeEventListener('click', playTurn);
    });
  };

  const addListeners = () => {
    console.log('addListeners');

    squareElements.forEach((element) => {
      element.addEventListener('click', playTurn);
    });

    restartButton.addEventListener('click', restartGame);
  };

  const showWinner = (mark) => {
    winnerElement.textContent =
      mark === 'X' ? playerOneElement.value : playerTwoElement.value;
    winnerElement.textContent += ' wins!';
  };

  const playTurn = (event) => {
    const index = Array.from(squareElements).indexOf(event.target);
    const mark = gameBoard.addMark(index);

    if (isWinner()) {
      console.log(`${mark} wins!`);
      endGame();
      showWinner(mark);
    } else if (isTie()) {
      console.log('Game is tied');
      endGame();
      winnerElement.textContent = 'Game is tied!';
    }
  };

  return {
    getTurn,
    addListeners,
    incrementTurn,
  };
})();

const displayController = (() => {
  const squareElements = Array.from(document.querySelectorAll('.square'));

  const render = () => {
    const squares = document.querySelectorAll('.square');
    squareElements.forEach((element) => {
      element.textContent =
        gameBoard.getSquareMarks()[Array.from(squareElements).indexOf(element)];
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
