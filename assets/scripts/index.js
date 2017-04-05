'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const authEvents = require('./auth/events.js')

// On document ready
$(() => {
  authEvents.addHandlers()
})

let playerX = {
  id: 1,
  email: 'matt@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
  // ,   game_history: [] // push id, outcome
}
let playerO = {
  id: 2,
  email: 'fake@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
  // ,   game_history: [] // push id, outcome
}
let currentGame = {
  winner: '',
  loser: '',
  drawer: '',
  // only send below to API
  id: 1,
  cells: [], // should this be a 9 by 2 or 9 by 1 or 9 by 3
  over: false,
  player_x: {
    id: playerX.id,
    email: playerX.email
  },
  player_o: {
    id: playerO.id,
    email: playerO.email
  }
}

// below is what needs to be sent to API
let games = [
  {
      id: 1,
      cells: ['o','x','o','x','o','x','o','x','o'],
      over: true,
      player_x: {
        id: 1,
        email: 'and@and.com'
      },
      player_o: {
        id: 3,
        email: 'dna@dna.com'
      }
    }
]

// define number of plays and playerTurn to keep track of who should be playing
let play = 6
let playerTurn = 'playerX'

// define grid to store game state
let grid = [[0,0,3],[null,1,null],[0,null,1]]


// function to check to see if someone has won and change game states and winner loser, drawer, and counts
// combine all of the below functions into one function, reset total to 0 after each for loop
// let overCheck = function {

let winCheck = function (array) {
  // add 1 to set the current play
  play += 1
  // change the player to whose turn it is next
  if (playerTurn === 'playerX') {
    playerTurn = 'playerO'
  } else {
    playerTurn = 'playerX'
  }
  // if this is the 5th play or lower, then exit as no one could have won
  if (play < 6) {
    return
  }
  // run through the score checks
  let total = 0
  let sumForwardDiagonal = 0
  let sumBackwardDiagonal = 0
  let sumCol0 = 0
  let sumCol1 = 0
  let sumCol2 = 0
  let sumRow0 = 0
  let sumRow1 = 0
  let sumRow2 = 0
  for (let i = 0; i < array.length; i++) {
    // total starts at upper left corner and moves down and to right
    sumForwardDiagonal += array[i][i]
    sumBackwardDiagonal += array[i][array[i].length - i - 1]
    sumCol0 += array[i][0]
    sumCol1 += array[i][1]
    sumCol2 += array[i][2]
    sumRow0 += array[0][i]
    sumRow1 += array[1][i]
    sumRow2 += array[2][i]

  }

  total = sumCol0 + sumCol1 + sumCol2

  console.log(sumForwardDiagonal + ' ' +
  sumBackwardDiagonal + ' ' +
  sumCol0 + ' ' +
  sumCol1 + ' ' +
  sumCol2 + ' ' +
  sumRow0 + ' ' +
  sumRow1 + ' ' +
  sumRow2 + ' and col total = ' +
  total + ' and row total = ' +
  (sumRow0 + sumRow1 + sumRow2) + ' and total total = '
  )
  // if statement to set game over and winners if any of the row/col/diag combos are = 3 or 0
  return total
}
console.log(winCheck(grid))

// below is redundant now

// let sumRow0 = grid[0].reduce((a, b) => a + b, 0);
//   console.log(sum)
// let sumRow1 = grid[1].reduce((a, b) => a + b, 0);
//   console.log(sumRow2)
// let sumRow2 = grid[1].reduce((a, b) => a + b, 0);
//   console.log(sumRow2)

// let diagonalForwardSum = function (array) {
//     let total = 0
//     for (let i = 0; i < array.length; i++) {
//       // total starts at upper left corner and moves down and to right
//         total += array[i][i]
//     }
//     return total;
// }
// console.log(diagonalForwardSum(grid))
//
// let diagonalBackSum = function (array) {
//     let total = 0
//     for (let i = 0; i < array.length; i++) {
//       // total starts at upper right corner, moves down to left
//         total += array[i][array[i].length - i - 1]
//         // array[array.length] - row-1][array.length - row-1]
//     }
//     return total;
// }
// console.log(diagonalBackSum(grid))

let logic = function () {
  // when click happens add 1 to plays and change playerTurn
  // onClick - how to invoke???
  plays += 1
  if (playerTurn = 'playerX') {
    playerTurn = 'playerO'
  } else {
    continue
  }
  // when plays < 5, continue, when greater or equal to 5 check to see if someone has won
  if (plays < 5) {
    continue
  }
  if (plays > 4) {

  }
  // change game status to over when 9 plays
  if (plays = 9) {

     if
    currentGame.over = true
  }

  }

module.exports {
  winCheck
}
// Game play:
// 1. X starts
// 2. X clicks a box
//     1. If box has already been clicked, no change
//     2. 1 is logged into an array representing that position
//     3. Box changes color and displays X.
// 3. O clicks a box
//     1. If box has already been clicked, no change
//     2. 0 is logged into an array representing that position
//     3. Else box changes color and displays O
// 4. 2 and 3 repeat loop until 3 in a row
//     1. If count of row or column or diagonal values in array = 3
//     2. AND (SUM = 3 or 0)
//     3. THEN game over
//     4. If SUM = 3, X wins
//     5. If SUM = 0, O wins
