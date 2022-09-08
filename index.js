'use strict';

const gameBoard = (() => {
  let squareMarks = Array(9).fill(null);

  const getSquareMarks = () => squareMarks;

  const isSquareTaken = (index) => {
    return squareMarks[index] !== null;
  };

  const reset = () => {
    squareMarks = Array(9).fill(null);
  };

  const toggleWinningSquares = () => {
    if (gameController.getWinningLineElements().length === 0) {
      return;
    }
    gameController.getWinningLineElements().forEach((element) => {
      element.classList.toggle('marked');
    });
  };

  const addMark = (index) => {
    if (isSquareTaken(index)) {
      return;
    }
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
    toggleWinningSquares,
  };
})();

const gameController = (() => {
  let turn = 0;
  const squareElements = Array.from(document.querySelectorAll('.square'));
  const restartButton = document.querySelector('#restart-game');
  const winnerElement = document.querySelector('#winner');
  const playerOneElement = document.querySelector('#player-one');
  const playerTwoElement = document.querySelector('#player-two');
  let winningLineElements = ['a1'];

  const getWinningLineElements = () => winningLineElements;

  const getTurn = () => turn;

  const incrementTurn = () => {
    turn += 1;
  };

  const resetTurn = () => {
    turn = 0;
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winningLineElements = [
          squareElements[a],
          squareElements[b],
          squareElements[c],
        ];
        gameBoard.toggleWinningSquares();
        return true;
      }
    }
    return false;
  };

  const isTie = () => {
    if (turn === 9) {
      return true;
    }
    return false;
  };

  const isWinner = () => {
    return calculateWinner(gameBoard.getSquareMarks());
  };

  const endGame = () => {
    removeListeners();
  };

  const restartGame = () => {
    gameBoard.reset();
    resetTurn();
    displayController.render();
    addListeners();
    gameBoard.toggleWinningSquares();
    winningLineElements = [];
    winnerElement.textContent = '';
  };

  const removeListeners = () => {
    squareElements.forEach((element) => {
      element.removeEventListener('click', playTurn);
    });
  };

  const addListeners = () => {
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
      endGame();
      showWinner(mark);
    } else if (isTie()) {
      endGame();
      winnerElement.textContent = 'Game is tied!';
    }
  };

  return {
    getTurn,
    addListeners,
    incrementTurn,
    getWinningLineElements,
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
