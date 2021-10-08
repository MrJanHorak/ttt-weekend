/*-------------------------------- Constants --------------------------------*/
// An array of arrays containing all 8 possible win combinations
// A win is when 3 indexes add up to 3 when the sum is calculated.
// since one player is identified by -1 that will need to be considered when
// comparing the actual board status with this array og arrays.

// const winningArrays = [
//     [1,1,1,0,0,0,0,0,0],
//     [0,0,0,1,1,1,0,0,0],
//     [0,0,0,0,0,0,1,1,1],
//     [1,0,0,1,0,0,1,0,0],
//     [0,1,0,0,1,0,0,1,0],
//     [0,0,1,0,0,1,0,0,1],
//     [1,0,0,0,1,0,0,0,1],
//     [0,0,1,0,1,0,1,0,0]]

// Alternative thought the array of arrays could be only the index of the winning squares
// these indexes should have a sum of 3 when compared to the status of the squaresOnBoard
// here the sum would have to be == 3 (to account for negative 3 if player O wins)
// the winner would the determined by the value in the first index of the winning combo 
// (-1 || 1)
const winningArrays = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]


/*---------------------------- Variables (state) ----------------------------*/
//let squaresOnBoard = []
// initialize variables needed for game state tracking
// will not be initialized until init()
let turn, winner, squaresOnBoard


/*------------------------ Cached Element References ------------------------*/
// cached element references that are accessed through out the code
// these are the nine squares used to create the board and play the game
// each square has its own id to match the index in the boardArray
// game status elements are also recorded here as they are always on display
// and refered to.
const board     = document.querySelector(".board")
const topLeft   = document.querySelector("#sq0")
const topCenter = document.querySelector("#sq1")
const topRight  = document.querySelector("#sq2")
const midLeft   = document.querySelector("#sq3")
const midCenter = document.querySelector("#sq4")
const midRigbt  = document.querySelector("#sq5")
const botLeft   = document.querySelector("#sq6")
const botCenter = document.querySelector("#sq7")
const botRight  = document.querySelector("#sq8")
const statusMessage= document.querySelector('#message')

/*----------------------------- Event Listeners -----------------------------*/
// event listeners for the actions a user can do on the board in HTML
// One listener for each square or just for the board as a whole?
board.addEventListener("click", handleClick)

/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  // initialize beginning game status
  // initialize the default game variables
  turn = 1
  winner = null
  squaresOnBoard = [null,null,null,null,null,null,null,null,null]

  //initialize the beginning messages to start the game
  statusMessage.innerHTML = `${render(turn)}`

  //render the state variables to the page calling render() function
  

}

function render(whatToRender){
  // render function loops over squaresOnBoard array
  // the index of the array corresponds with a specific square

  //render the status of a squareOnTheBoard based upon the value at the corresponding index
  if (whatToRender === squaresOnBoard){
    for (let i=0; i<squaresOnBoard.length; i++){
      if (i === null) {
        return
      } else if ( i === 1) {
        return "X"
      } else {
        return "O"
      }
    }
  }
  //render whose turn it is on the screen based upong the turn variables value
    if (whatToRender === turn){
      if (turn === 1) {
        return "Player X it is your turn"
      } else {
        return "Player O it is your turn"
      }
    }
  //Consider using ternary inside template literal for this following if statement
  if (whatToRender === winner){
    if (winner === null){
      return 
    } else if (winner === 1) {
      return "Player X wins!"
    } else if (winner === -1) {
      return "Player O wins!"
    } else if (winner === "t") {
      return "It is a tie!"
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
  
  index = event.target.id[2]
  if (squaresOnBoard[index]!==null){return} 
  if (winner !== null){return}
  squaresOnBoard[index] = turn
  turn=turn*-1
  winner = getWinner(squaresOnBoard)
  render(squaresOnBoard, event.id)
  render(winner)
  render(turn)

  console.log(index)
  console.log(turn)
  console.log(squaresOnBoard)
  if (turn===1){
  
  squaresOnBoard[1].push(1)
  event.target.innerHTML = whatToRender(squaresOnBoard)
} else {
  event.target.style.backgroundColor = "blue"
}
  console.dir(event.target)

}

function getWinner(){


}