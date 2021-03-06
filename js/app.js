/*-------------------------------- Constants --------------------------------*/
// An array of arrays containing all 8 possible win combinations
// Audio clips for enhanced game playing experience

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const tic = new Audio("../audio/clock.wav");
const toc = new Audio("../audio/button6.wav");
const tie = new Audio(`../audio/Zonk-sound.mp3`);
const win = new Audio("../audio/Arcade-town-8-bit-melody-sound-logo.mp3");

/*---------------------------- Variables (state) ----------------------------*/
// initialize variables needed for game state tracking
// will not be initialized until init()

let turn,
  winner,
  squaresOnBoard,
  sumOfClicks,
  winningCombo,
  moveCounter,
  emptySquare,
  nextMove,
  player,
  player1,
  player2;

/*------------------------ Cached Element References ------------------------*/
// cached element references that are accessed through out the code
// the playing field is found in both the board and allSquares arrays
// the board is used to access the target.id on the click event.
// the allSquares calls the class of the squares

const board = document.querySelector(".board");
const allSquares = document.querySelectorAll(".square");
const statusMessage = document.querySelector("#message");
const playersMessage = document.querySelector("#players");
const replayButton = document.querySelector("#reset");
const playerVsButton = document.querySelector("#selector");
const logo = document.querySelector("#logo");

/*----------------------------- Event Listeners -----------------------------*/
// event listeners for the actions a user can do on the board in HTML
// one for the board to see which square is selected
// the other for the reset or play again button

board.addEventListener("click", handleClick);
replayButton.addEventListener("click", init);
playerVsButton.addEventListener("click", switchPlayer);

/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  // initialize beginning game status
  // initialize the default game variables
  // initialize the beginning messages to start the game
  // re-initialize the game when play again is clicked

  //the following lines stop sound playback upon reset
  //and reset the sound t begin from the start upon next play

  for (let i = 0; i < 9; i++) {
    allSquares[i].style.backgroundColor = "";
    allSquares[i].className = "square";
  }
  logo.className = "";
  statusMessage.className = "";
  win.pause();
  win.currentTime = 0;
  tie.pause();
  tie.currentTime = 0;

  player = "computer";
  playerVsButton.style.backgroundColor = "rgb(183, 2, 15)";
  playerVsButton.innerText = "Human vs Comp";
  emptySquare = null;
  winningCombo = [];
  turn = 1;
  winner = null;
  squaresOnBoard = [null, null, null, null, null, null, null, null, null];
  nextMove = null;
  render();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function render() {
  if (playerVsButton.innerText === "Human vs Human") {
    player1 = "Player 1";
    player2 = "Player 2";
  } else {
    player1 = "Human player";
    player2 = "Computer player";
  }

  // Provides output of the current game state to the screen
  //displays who turn it is

  playersMessage.innerHTML = `<span class="color-blue"> ${player1} playing as X </span> vs. <span class="color-red"> ${player2} playing as O</span>`;
  statusMessage.innerText =
    turn === 1 ? `${player1} it is your turn!` : `${player2} it is your turn!`;
  statusMessage.className = "animate__animated animate__heartBeat";

  //checks if there is a winner or tie and displays accordingly
  if (winner !== null) {
    statusMessage.innerText =
      winner === 1
        ? `${player1} wins!`
        : winner === -1
        ? `${player2} wins!`
        : "It's a tie!";
  }
  statusMessage.className = "animate__animated animate__wobble";
  logo.className = "animate__animated animate__jello";
  winningCombo.forEach(function (windex) {
    allSquares[windex].style.backgroundColor = "rgba(248, 255, 0, .8)";
    allSquares[windex].style.borderRadius = "35px";
    allSquares[windex].className = "animate__animated animate__flip";
  });

  // render the status of a squareOnTheBoard based upon the value
  // found at the corresponding index
  // sound effects, css and innerText of HTML elements are all set
  // or triggered here as well.

  for (let i = 0; i < 9; i++) {
    let sqId = parseInt(allSquares[i].id.charAt(2));

    if (squaresOnBoard[i] === 1) {
      tic.play();
      allSquares[sqId].style.backgroundImage = "url(/images/x.png)";
    } else if (squaresOnBoard[i] === -1) {
      toc.play();
      allSquares[sqId].style.backgroundImage = "url(/images/o.png)";
    } else if (squaresOnBoard[i] === null) {
      allSquares[sqId].style.backgroundImage = "";
    }
  }
}

function handleClick(event) {
  // handleClick function obtains index of square clicked by user
  // by extracting it from the target id of the click event
  // if a square has already been selected (has a value in the array at
  // the corresponding index in the array) it will return instantly
  // if the game is over it will return instantly
  // it changes the player turn value by multiplying with -1
  // it calls render to update the board to match the user actions

  //index = parseInt(event.target.id)

  index = parseInt(event.target.id.charAt(2));
  winner = getWinner();
  if (winner !== null) {
    return;
  } else if (squaresOnBoard[index] !== null) {
    return;
  }

  squaresOnBoard[index] = turn;
  turn = turn * -1;

  winner = getWinner();
  render();

  if (turn === -1 && winner === null) {
    computerPlayer();
  }

  winner = getWinner();
  render();
}

function getWinner() {
  // loop through each possible winning combo recorded in the
  // winningCombos array and then loop each of the possible combos
  // through the squaresOnBoard to see if they provide a winner or
  // not. A wuinner is found when the values contained at the index
  // positions provided by the winningCombo array add up to an absolute
  // value of 3 (that means -3 or +3). Set winner value and return.

  winningCombos.forEach(function (array) {
    sumOfClicks = 0;
    array.forEach(function (indexLocation) {
      sumOfClicks += squaresOnBoard[indexLocation];
      if (Math.abs(sumOfClicks) === 3) {
        winner = squaresOnBoard[indexLocation];
        tie.pause();
        win.play();
        winningCombo = array;
      } else if (squaresOnBoard.includes(null) === false && winner === null) {
        winner = "t";
        win.pause();
        tie.play();
      }
    });
  });
  return winner;
}

// an attempt at computerAI

// Here I sat down and though about my approach to the game and attempted
// to put it into code. First I would examine the state of the board. Then
// determined by the ammount of O's the oppenent has I would place an x to
// block the opponent. I have attempted this by using conditional
// if statememnts. It works. There is not strategy on the computers part, just pure
// conditionals it abides by.

shuffle(winningCombos);
function computerPlayer() {
  if (player === "human" || winner !== null) {
    return;
  }

  let comboSums = [];
  winningCombos.forEach(function (array) {
    moveCounter = 0;
    array.forEach(function (indexLocation) {
      moveCounter += squaresOnBoard[indexLocation];
    });
    comboSums.push(moveCounter);
  });

  if (comboSums.includes(-2)) {
    let arrayIndex = comboSums.indexOf(-2);
    winningCombos[arrayIndex].forEach(function (square) {
      if (squaresOnBoard[square] === null) {
        squaresOnBoard[square] = -1;
        turn = 1;
        return;
      }
      return;
    });
  } else if (comboSums.includes(2)) {
    let arrayIndex = comboSums.indexOf(2);
    winningCombos[arrayIndex].forEach(function (square) {
      if (squaresOnBoard[square] === null) {
        squaresOnBoard[square] = -1;
        turn = 1;
        return;
      }
      return;
    });
  } else if (comboSums.includes(-1)) {
    let arrayIndex = comboSums.indexOf(-1);
    selectedArray = winningCombos[arrayIndex];
    if (
      squaresOnBoard[selectedArray[0]] === null ||
      squaresOnBoard[selectedArray[1]] === null ||
      squaresOnBoard[selectedArray[2]] === null
    ) {
      if (squaresOnBoard[selectedArray[0]] === null) {
        squaresOnBoard[selectedArray[0]] = -1;
        turn = 1;
        return;
      } else if (squaresOnBoard[selectedArray[1]] === null) {
        squaresOnBoard[selectedArray[1]] = -1;
        turn = 1;
        return;
      } else if (squaresOnBoard[selectedArray[2]] === null) {
        squaresOnBoard[selectedArray[2]] = -1;
        turn = 1;
        return;
      }
    }
    return;
  } else if (comboSums.includes(1)) {
    let arrayIndex = comboSums.indexOf(1);
    selectedArray = winningCombos[arrayIndex];
    let compFirstMove = [0, 1, 2];

    shuffle(compFirstMove);

    if (
      squaresOnBoard[selectedArray[compFirstMove[0]]] === null ||
      squaresOnBoard[selectedArray[compFirstMove[1]]] === null ||
      squaresOnBoard[selectedArray[compFirstMove[2]]] === null
    ) {
      if (squaresOnBoard[selectedArray[compFirstMove[0]]] === null) {
        squaresOnBoard[selectedArray[compFirstMove[0]]] = -1;
        turn = 1;
        return;
      } else if (squaresOnBoard[selectedArray[compFirstMove[1]]] === null) {
        squaresOnBoard[selectedArray[compFirstMove[1]]] = -1;
        turn = 1;
        return;
      } else if (squaresOnBoard[selectedArray[compFirstMove[2]]] === null) {
        squaresOnBoard[selectedArray[compFirstMove[2]]] = -1;
        turn = 1;
        return;
      }
    }
  }
  winner = getWinner();
  return;
}

function switchPlayer() {
  if (player === "human") {
    player = "computer";
    playerVsButton.style.backgroundColor = "rgb(183, 2, 15)";
    playerVsButton.innerText = "Human vs Comp";
  } else {
    player = "human";
    playerVsButton.style.backgroundColor = "";
    playerVsButton.innerText = "Human vs Human";
  }
}
