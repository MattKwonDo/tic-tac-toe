'use strict'

// links to other files
const gameApi = require('./api.js')
const gameUi = require('./ui.js')
// new game setup
const setup = require('../setup')
// game id data
const gameStore = require('../gameStore')

// test temporary grid
grid = [[0, 0, 1],
        [1, 1, 0],
        [0, 1, 1]]
// temp gameStore for test
// let  // this should be on setup for game reset functions
gameStoreTest = { // === gameStore.game
  id: 1,
  cells: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'], // should this be a 9 by 2 or 9 by 1 or 9 by 3
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

// let  // this should be on setup for game reset functions
currentGameTest = { // === setup.currentGame
  winner: '',
  loser: '',
  drawer: '',
  // only send below to API
  id: 1,
  cells: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'], // should this be a 9 by 2 or 9 by 1 or 9 by 3
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

// let  // this should be on setup for game reset functions
playerX = {
  id: 1,
  email: 'matt@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
}
// let // this should be on setup for game reset functions
playerO = {
  id: 2,
  email: 'fake@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
}
// let
play = 8

// game logic

// just for test purposes, delete this eventually
// console.log(winCheck(grid, valArray)) // just for test
// grid = [[0,0,1],[,1,],[0,,1]] // just for test purposese, delete this eventually

let winCheck = function (array, valArray) {
  // log the coordinates
  // need to figure this out - is this a pair like in boggle???
  // add 1 to set the current play
  // play += 1
  // if this is the 4th play or lower, then exit as no one could win yet
  // if (play < 5) {
  //   // change the player to whose turn it is next
  //   if (playerTurn === 'playerX') {
  //     playerTurn = 'playerO'
  //   } else {
  //     playerTurn = 'playerX'
  //   }
  //   return
  // }
  // reset values

  // update grid with new click
  // for (let i = 0; i < play; i++) {
  //   setup.grid.push()
  // }



  // *****updated these to setup.valx
  valx.sumForwardDiagonal = 0
  valx.sumBackwardDiagonal = 0
  valx.sumCol0 = 0
  valx.sumCol1 = 0
  valx.sumCol2 = 0
  valx.sumRow0 = 0
  valx.sumRow1 = 0
  valx.sumRow2 = 0

  playOrderArray[]
  // run through the rows/cols/diagonals and add up scores
  for (let i = 0; i < array.length; i++) {
    valx.sumForwardDiagonal += array[i][i] // starts at upper left corner and moves down and to right
    valx.sumBackwardDiagonal += array[i][array[i].length - i - 1] // starts at upper right corner and moves down and to left
    valx.sumCol0 += array[i][0]
    valx.sumCol1 += array[i][1]
    valx.sumCol2 += array[i][2]
    valx.sumRow0 += array[0][i]
    valx.sumRow1 += array[1][i]
    valx.sumRow2 += array[2][i]
  }
  for (let i = 0; i < array.length; i++) {
    valArray[0] = valx.sumForwardDiagonal // forward diagonal sum  // starts at upper left corner and moves down and to right
    valArray[1] = valx.sumBackwardDiagonal // backward diagonal sum // starts at upper right corner and moves down and to left
    valArray[2] = valx.sumCol0 // col 0 sum
    valArray[3] = valx.sumCol1// col 1 sum
    valArray[4] = valx.sumCol2 // col 2 sum
    valArray[5] = valx.sumRow0 // row 0 sum
    valArray[6] = valx.sumRow1 // row 1 sum
    valArray[7] = valx.sumRow2 // row 2 sum
  }
  // check values to see if any are = 3 or zero
  for (let i = 0; i < valArray.length; i++) {
    if (valArray[i] === 3) {
      // change local games status
      currentGameTest.winner = playerX
      currentGameTest.loser = playerO
      // change local over to true
      currentGameTest.over = true
      // change what's passed to server over to true
      gameStoreTest.over = true
      playerX.games_won += 1
      playerO.games_lost += 1
      console.log('game over, playerX won')

    } else if (valArray[i] === 0) {
      // change local games status
      currentGameTest.winner = playerO
      currentGameTest.loser = playerX
      playerO.games_won += 1
      playerX.games_lost += 1
      // change local over to true
      currentGameTest.over = true
      // change what's passed to server over to true
      gameStoreTest.over = true
      console.log('game over, playerO won')
    } else {
      continue
    }
  }
  // draw logic
  if (gameStoreTest.cells[8] === 'x' && (currentGameTest.winner === '' && currentGameTest.loser === '')) { // && setup.play === 9
    // change local games status
    currentGameTest.over = true
    playerX.games_drawn += 1
    playerO.games_drawn += 1
    // change local over to true
    currentGameTest.drawer = 'both'
    // change what's passed to server over to true
    gameStoreTest.over = true
    console.log("game over, it's a draw")
      // }
  }
  console.log('winner = ', currentGameTest.winner)
  console.log('winner = ', currentGameTest.loser)
  console.log('game over = ', currentGameTest.over)
  console.log('playerX.games_won = ', playerX.games_won)
  console.log('playerX.games_lost = ', playerX.games_lost)
  console.log('playerX.games_drawn = ', playerX.games_drawn)
  console.log('playerO.games_won = ', playerO.games_won)
  console.log('playerO.games_lost = ', playerO.games_lost)
  console.log('playerO.games_drawn = ', playerO.games_drawn)

  valx.total = valx.sumCol0 + valx.sumCol1 + valx.sumCol2

  console.log('diag1 ' + valx.sumForwardDiagonal + ' diag2 ' +
  valx.sumBackwardDiagonal + ' col0 ' +
  valx.sumCol0 + ' col1 ' +
  valx.sumCol1 + ' col2 ' +
  valx.sumCol2 + ' row0 ' +
  valx.sumRow0 + ' row1 ' +
  valx.sumRow1 + ' row 2' +
  valx.sumRow2 + ' and col total = ' +
  valx.total + ' and row total = ' +
  (valx.sumRow0 + valx.sumRow1 + valx.sumRow2) + ' and total total = '
  )

  // change the player to whose turn it is next
//   if (playerTurn === 'playerX') {
//     playerTurn = 'playerO'
//   } else {
//     playerTurn = 'playerX'
//     return valx.total
//   }

}
winCheck(grid, valArray)
currentGameTest // local
gameStoreTest // send to server

module.exports = {
  winCheck
}
