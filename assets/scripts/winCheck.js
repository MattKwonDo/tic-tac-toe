'use strict'

// links to other files
// const gameApi = require('./api.js')
// const gameUi = require('./ui.js')
// new game setup
const setup = require('./setup')
// game id data
const gameStore = require('./gameStore')

// test temporary grid
// grid = [[0, 0, 1],
//         [1, 1, 0],
//         [0, 1, 1]]

// temp gameStore for test
// let  // this should be on setup for game reset functions
// gameStoreTest = { // === gameStore.game
//   id: 1,
//   cells: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'], // should this be a 9 by 2 or 9 by 1 or 9 by 3
//   over: false,
//   player_x: {
//     id: setup.playerX.id,
//     email: setup.playerX.email
//   },
//   player_o: {
//     id: setup.playerO.id,
//     email: setup.playerO.email
//   }
// }

// let  // this should be on setup for game reset functions
// currentGameTest = { // === setup.currentGame
//   winner: '',
//   loser: '',
//   drawer: '',
//   // only send below to API
//   id: 1,
//   cells: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'], // should this be a 9 by 2 or 9 by 1 or 9 by 3
//   over: false,
//   player_x: {
//     id: setup.playerX.id,
//     email: setup.playerX.email
//   },
//   player_o: {
//     id: setup.playerO.id,
//     email: setup.playerO.email
//   }
// }

// let  // this should be on setup for game reset functions
// playerX = {
//   id: 1,
//   email: 'matt@m.com',
//   games_won: 0,
//   games_lost: 0,
//   games_drawn: 0
// }
// // let // this should be on setup for game reset functions
// playerO = {
//   id: 2,
//   email: 'fake@m.com',
//   games_won: 0,
//   games_lost: 0,
//   games_drawn: 0
// }
// let
// play = 8

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

  // reset the winCheck values
  setup.valx.sumForwardDiagonal = 0
  setup.valx.sumBackwardDiagonal = 0
  setup.valx.sumCol0 = 0
  setup.valx.sumCol1 = 0
  setup.valx.sumCol2 = 0
  setup.valx.sumRow0 = 0
  setup.valx.sumRow1 = 0
  setup.valx.sumRow2 = 0

  // playOrderArray[]
  // run through the rows/cols/diagonals and add up scores
  for (let i = 0; i < array.length; i++) {
    setup.valx.sumForwardDiagonal += array[i][i] // starts at upper left corner and moves down and to right
    setup.valx.sumBackwardDiagonal += array[i][array[i].length - i - 1] // starts at upper right corner and moves down and to left
    setup.valx.sumCol0 += array[i][0]
    setup.valx.sumCol1 += array[i][1]
    setup.valx.sumCol2 += array[i][2]
    setup.valx.sumRow0 += array[0][i]
    setup.valx.sumRow1 += array[1][i]
    setup.valx.sumRow2 += array[2][i]
  }
  for (let i = 0; i < array.length; i++) {
    setup.valArray[0] = setup.valx.sumForwardDiagonal // forward diagonal sum  // starts at upper left corner and moves down and to right
    setup.valArray[1] = setup.valx.sumBackwardDiagonal // backward diagonal sum // starts at upper right corner and moves down and to left
    setup.valArray[2] = setup.valx.sumCol0 // col 0 sum
    setup.valArray[3] = setup.valx.sumCol1// col 1 sum
    setup.valArray[4] = setup.valx.sumCol2 // col 2 sum
    setup.valArray[5] = setup.valx.sumRow0 // row 0 sum
    setup.valArray[6] = setup.valx.sumRow1 // row 1 sum
    setup.valArray[7] = setup.valx.sumRow2 // row 2 sum
  }
  // check values to see if any are = 3 or zero
  for (let i = 0; i < setup.valArray.length; i++) {
    if (setup.valArray[i] === 3) {
      // change local games status
      setup.currentGame.winner = 'playerX'
      setup.currentGame.loser = 'playerO'
      // change local over to true
      setup.currentGame.over = true
      // change what's passed to server over to true
      gameStore.game.over = true
      setup.playerX.games_won += 1
      setup.playerO.games_lost += 1
      console.log('game over, playerX won')
      $('.wins').text(setup.playerX.games_won)
      $('.draws').text(setup.playerX.games_drawn)
      $('.losses').text(setup.playerX.games_lost)
      // $('.game-update').off('click')
      $('#myModal').modal('show') // .modal({backdrop: 'static', keyboard: false})
    } else if (setup.valArray[i] === 0) {
      // change local games status
      setup.currentGame.winner = 'playerO'
      setup.currentGame.loser = 'playerX'
      setup.playerO.games_won += 1
      setup.playerX.games_lost += 1
      // change local over to true
      setup.currentGame.over = true
      // change what's passed to server over to true
      gameStore.game.over = true
      console.log('game over, playerO won')
      $('.wins').text(setup.playerX.games_won)
      $('.draws').text(setup.playerX.games_drawn)
      $('.losses').text(setup.playerX.games_lost)
      // $('.game-update').off('click')
      $('#myModal').modal('show').modal({backdrop: 'static', keyboard: false})
    } else {
      continue
    }
  }
  // draw logic
  if (gameStore.game.cells[8] === 'x' && (setup.currentGame.winner === '' && setup.currentGame.loser === '')) { // && setup.play === 9
    // change local games status
    setup.currentGame.over = true
    setup.playerX.games_drawn += 1
    setup.playerO.games_drawn += 1
    // change local over to true
    setup.currentGame.drawer = 'both'
    // change what's passed to server over to true
    gameStore.game.over = true
    console.log("game over, it's a draw")
    $('.wins').text(setup.playerX.games_won)
    $('.draws').text(setup.playerX.games_drawn)
    $('.losses').text(setup.playerX.games_lost)
    // $('.game-update').off('click')
    $('#myModal').modal('show').modal({backdrop: 'static', keyboard: false})
  }

  console.log('winner = ', setup.currentGame.winner)
  console.log('winner = ', setup.currentGame.loser)
  console.log('game over = ', setup.currentGame.over)
  console.log('setup.playerX.games_won = ', setup.playerX.games_won)
  console.log('setup.playerX.games_lost = ', setup.playerX.games_lost)
  console.log('setup.playerX.games_drawn = ', setup.playerX.games_drawn)
  console.log('setup.playerO.games_won = ', setup.playerO.games_won)
  console.log('setup.playerO.games_lost = ', setup.playerO.games_lost)
  console.log('setup.playerO.games_drawn = ', setup.playerO.games_drawn)

  setup.valx.total = setup.valx.sumCol0 + setup.valx.sumCol1 + setup.valx.sumCol2

  console.log('diag1 ' + setup.valx.sumForwardDiagonal + ' diag2 ' +
  setup.valx.sumBackwardDiagonal + ' col0 ' +
  setup.valx.sumCol0 + ' col1 ' +
  setup.valx.sumCol1 + ' col2 ' +
  setup.valx.sumCol2 + ' row0 ' +
  setup.valx.sumRow0 + ' row1 ' +
  setup.valx.sumRow1 + ' row 2' +
  setup.valx.sumRow2 + ' and col total = ' +
  setup.valx.total + ' and row total = ' +
  (setup.valx.sumRow0 + setup.valx.sumRow1 + setup.valx.sumRow2) + ' and total total = '
  )

  // change the player to whose turn it is next
//   if (playerTurn === 'playerX') {
//     playerTurn = 'playerO'
//   } else {
//     playerTurn = 'playerX'
//     return setup.valx.total
//   }
}
// for testing:
// winCheck(grid, valArray)
// setup.currentGame // local
// gameStore.game // send to server

module.exports = {
  winCheck
}
