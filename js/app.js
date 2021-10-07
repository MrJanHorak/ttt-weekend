/*-------------------------------- Constants --------------------------------*/



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



/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  // initialize beginning game status
  // initialize the default game variables
  turn = 1
  winner = null
  squaresOnBoard = [1,null,-1,1,-1,null,1,null,-1]

  //initialize the beginning messages to start the game
  statusMessage.innerHTML = `${render(turn)} you may begin the game!<br /> Make the first move!`

  //render the state variables to the page calling render() function
  

}

function render(whatToRender, statusToRender){
  // render function loops over squaresOnBoard array
  // the index of the array corresponds with a specific square

//Consider using ternary inside template literal for this following if statement
  if (whatToRender === winner){
    if (winner === null){
      return "Game still in Progress"
    } else if (winner === 1) {
      return "Player X wins!"
    } else {
      return "Player O wins!"
    }  
  }

  if (whatToRender === turn){
    if (turn === 1) {
      return "Player X it is your turn"
    } else {
      return "Player O it is your turn"
    }
  }

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



}