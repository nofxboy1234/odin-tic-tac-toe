'use strict';

const gameBoard = (() => {
  let _squareMarks = Array(9).fill(null);

  const getSquareMarks = () => _squareMarks;

  const _isSquareTaken = (index) => {
    return _squareMarks[index] !== null;
  };

  const reset = () => {
    _squareMarks = Array(9).fill(null);
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
    if (_isSquareTaken(index)) {
      return;
    }
    gameController.incrementTurn();
    const mark = gameController.getTurn() % 2 === 0 ? 'O' : 'X';
    _squareMarks[index] = mark;
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
  let _turn = 0;
  const _squareElements = Array.from(document.querySelectorAll('.square'));
  const _restartButton = document.querySelector('#restart-game');
  const _winnerElement = document.querySelector('#winner');
  const _playerOneElement = document.querySelector('#player-one');
  const _playerTwoElement = document.querySelector('#player-two');
  let winningLineElements = ['a1'];

  const getWinningLineElements = () => winningLineElements;

  const getTurn = () => _turn;

  const incrementTurn = () => {
    _turn += 1;
  };

  const _resetTurn = () => {
    _turn = 0;
  };

  const _calculateWinner = (squares) => {
    /*
    Winner calculation algorithm: 
    https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
    */
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
          _squareElements[a],
          _squareElements[b],
          _squareElements[c],
        ];
        gameBoard.toggleWinningSquares();
        return true;
      }
    }
    return false;
  };

  const _isTie = () => {
    if (_turn === 9) {
      return true;
    }
    return false;
  };

  const _isWinner = () => {
    return _calculateWinner(gameBoard.getSquareMarks());
  };

  const _endGame = () => {
    _removeListeners();
  };

  const _restartGame = () => {
    gameBoard.reset();
    _resetTurn();
    displayController.render();
    addListeners();
    gameBoard.toggleWinningSquares();
    winningLineElements = [];
    _winnerElement.textContent = '';
  };

  const _removeListeners = () => {
    _squareElements.forEach((element) => {
      element.removeEventListener('click', _playTurn);
    });
  };

  const addListeners = () => {
    _squareElements.forEach((element) => {
      element.addEventListener('click', _playTurn);
    });

    _restartButton.addEventListener('click', _restartGame);
  };

  const _showWinner = (mark) => {
    _winnerElement.textContent =
      mark === 'X' ? _playerOneElement.value : _playerTwoElement.value;
    _winnerElement.textContent += ' wins!';
  };

  const _playTurn = (event) => {
    const index = Array.from(_squareElements).indexOf(event.target);
    const mark = gameBoard.addMark(index);

    if (_isWinner()) {
      _endGame();
      _showWinner(mark);
    } else if (_isTie()) {
      _endGame();
      _winnerElement.textContent = 'Game is tied!';
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
  const _squareElements = Array.from(document.querySelectorAll('.square'));

  const render = () => {
    _squareElements.forEach((element) => {
      element.textContent =
        gameBoard.getSquareMarks()[
          Array.from(_squareElements).indexOf(element)
        ];
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
