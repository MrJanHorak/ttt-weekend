/*-------------------------------- Constants --------------------------------*/
// An array of arrays containing all 8 possible win combinations
// A win is when 3 indexes add up to 3 when the sum is calculated.
// since one player is identified by -1 that will need to be considered when
// comparing the actual board status with this array og arrays.

// Alternative thought the array of arrays could be only the index of the winning squares
// these indexes should have a sum of 3 when compared to the status of the squaresOnBoard
// here the sum would have to be == 3 (to account for negative 3 if player O wins)
// the winner would the determined by the value in the first index of the winning combo 
// (-1 || 1)
const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const tic = new Audio('../audio/clock.wav')
const toc = new Audio('../audio/button6.wav')

/*---------------------------- Variables (state) ----------------------------*/
//let squaresOnBoard = []
// initialize variables needed for game state tracking
// will not be initialized until init()
let turn, winner, squaresOnBoard, arrayId, sumOfClicks, squareId

/*------------------------ Cached Element References ------------------------*/
// cached element references that are accessed through out the code
// these are the nine squares used to create the board and play the game
// each square has its own id to match the index in the boardArray
// game status elements are also recorded here as they are always on display
// and refered to.

const board         = document.querySelector(".board")
const statusMessage = document.querySelector('#message')
const allSquares    = document.querySelectorAll('.square')
const replayButton  = document.querySelector("#reset")

/*----------------------------- Event Listeners -----------------------------*/
// event listeners for the actions a user can do on the board in HTML
// One listener for each square or just for the board as a whole?
board.addEventListener("click", handleClick)
replayButton.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  // initialize beginning game status
  // initialize the default game variables
  // initialize the beginning messages to start the game
  // render the state variables to the page calling render() function
  
  turn = 1
  winner = null
  squaresOnBoard = [null,null,null,null,null,null,null,null,null]
  statusMessage.innerText = render()
  render()
  
}

function render(){
  // render function loops over squaresOnBoard array
  // the index of the array corresponds with a specific square
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
  
  
  
  // render the status of a squareOnTheBoard based upon the value at the corresponding index
  
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
  // handleClick function to obtain index of square clicked by user
  // by extracting it from the target id 
  // if a square has already been selected (has a value) it will return instantly
  // if the game is over it will intantly return
  // if those are not the case it will update the squaresOnTheBoard array
  // it will change the player turn value by multiplying with -1
    
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
  // loop through winnimgCombos to determing the winner
  // if a match in the squaresOnBoard totals Math.abs() to 3 then there is a winner
  // the winner is determined by the value in any (we will choose the 1st) index of the array
  // loop through each possible winning combo
  // for each of the possible combos loop through the squaresOnBoard to see if they
  // provide a winnor or not and set winner variable accordingly
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