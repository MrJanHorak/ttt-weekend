# tic-tac-toe starter code
The age old game of Tic Tac Toe

All graphics used in this game are made using Adobe Spark online.
Sound effects are royalty free and found at http://www.orangefreesounds.com 

Song: Arcade Town sound logo
Sound effect: Zonk

Licence: The song and this sound effect is permitted for non-commercial use under license “Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"

The game is written in JavaScript and will run in a users browser. 

This version is only laid out for Human vs Human.

Basic animation is created through CS effects were used from https://animate.style/ using a CDN.

JavaScript is the backbone of this version of Tic-Tac-Toe. Animations and CSS changes are made through JavaScript to make changes visible in the browser.

Each function is explained in more detail in the app.js file. 

I hope you enjoy this game!

The computer AI is a very basic attempt at creating a computer player. Using the same process as the getWinner function, setting up a 'filter' of if then statements based upon human decision making (mine) the computers next move is determined by the location and ammount of the opponents placement. 

In the first functioning attempt I realised the computer would always place its 'O' in the first possible option as the squares were run through the for loop repeatadly in the same order. To add a touch of variation and to make it harder to determine where the computer will place its next move I saw it needed a random aspect. I was looking for a way to randomise the array it as looking through without altering the original array and found a great little code snippet online at https://www.codegrepper.com/code-examples/javascript/how+to+shuffle+an+array+with+loop+in+javascript after adding that function to the AI function the computer almost seems human ...

Next variation will offer an option to select human vs human or human vs computer option.
