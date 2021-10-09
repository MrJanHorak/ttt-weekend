/*-------------------------------- Constants --------------------------------*/
// An array of arrays containing all 8 possible win combinations
// Audio clips for enhanced game playing experience

const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const tic = new Audio('../audio/clock.wav')
const toc = new Audio('../audio/button6.wav')

/*---------------------------- Variables (state) ----------------------------*/
// initialize variables needed for game state tracking
// will not be initialized until init()

let turn, winner, squaresOnBoard, sumOfClicks, 

/*------------------------ Cached Element References ------------------------*/
// cached element references that are accessed through out the code
// the playing field is found in both the board and allSquares arrays
// the board is used to access the target.id on the click event.
// the allSquares calls the class of the squares

const board         = document.querySelector(".board")
const statusMessage = document.querySelector('#message')
const allSquares    = document.querySelectorAll('.square')
const replayButton  = document.querySelector("#reset")

/*----------------------------- Event Listeners -----------------------------*/
// event listeners for the actions a user can do on the board in HTML
// one for the board to see which square is selected
// the other for the reset or play again button

board.addEventListener("click", handleClick)
replayButton.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  // initialize beginning game status
  // initialize the default game variables
  // initialize the beginning messages to start the game
  // re-initialize the game when play again is clicked
  
  turn = 1
  winner = null
  squaresOnBoard = [null,null,null,null,null,null,null,null,null]
  statusMessage.innerText = render()
  render()
  
}

function render(){
  // render function loops over squaresOnBoard array
  // render changes the output on the screen according to 
  // the values of the variables winner & turn and checks 
  // the value of the squaresOnBoard array to match the screen
  // to the values recorded in the array

  // Consider using ternary inside template literal for this following if statement
  if (winner === 1) {
    statusMessage.innerText = "Player X wins!" 
  } else if (winner === -1) {
    statusMessage.innerText = "Player O wins!" 
  } else if (winner === "t") {
    statusMessage.innerText = "It's a tie!"
  }else if (turn === 1) {
    statusMessage.innerText = `Player X it is your turn`
  } else if (turn === -1) {
    statusMessage.innerText = `Player O it is your turn`
}

  // render the status of a squareOnTheBoard based upon the value 
  // found at the corresponding index
  // sound effects, css and innerText of HTML elements are all set
  // or triggered here as well.
  
  for (let i=0; i<9; i++){

    if ( squaresOnBoard[i] === 1) {
      tic.play()
      allSquares[i].style.backgroundColor = "blue"
      allSquares[i].innerText = "X"
    } else if ( squaresOnBoard[i] === -1){
      toc.play()
      allSquares[i].style.backgroundColor = "red"
      allSquares[i].innerText = "O"
    }else if (squaresOnBoard[i] === null) { 
      allSquares[i].style.backgroundColor = "grey"
      allSquares[i].innerText = ""
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
    
  index = parseInt(event.target.id)
  
  if (winner === 1 || winner === -1 || winner === 't'){
    return
  }else{
    if (squaresOnBoard[index]!==null){return} 
  }
  squaresOnBoard[index] = turn
  
  turn = turn*-1
  winner=getWinner() 
  
  render()
}

function getWinner(){
  // loop through each possible winning combo recorded in the 
  // winningCombos array and then loop each of the possible combos 
  // through the squaresOnBoard to see if they provide a winner or 
  // not. A wuinner is found when the values contained at the index 
  // positions provided by the winningCombo array add up to an absolute
  // value of 3 (that means -3 or +3). Set winner value and return.

  winningCombos.forEach(function(array){
    sumOfClicks = 0
    array.forEach(function(indexLocation){
      sumOfClicks += squaresOnBoard[indexLocation]
      if (Math.abs(sumOfClicks)===3){
         winner=squaresOnBoard[indexLocation]
      } else if (squaresOnBoard.includes(null)===false && winner===null){
          winner='t'
      }
    })
  })
  return winner
}