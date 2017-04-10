'use strict'

// links to other files
// new game setup
const setup = require('./setup')
// game id data
const gameStore = require('./gameStore')

const authUi = require('./auth/ui')

let winCheck = function (array, valArray) {
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
      authUi.gamesPlayed += 1
      $('#games').text('') // authUi.gamesPlayed
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
      authUi.gamesPlayed += 1
      $('#games').text('') // authUi.gamesPlayed
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
    authUi.gamesPlayed += 1
    $('#games').text('') // authUi.gamesPlayed
    $('.wins').text(setup.playerX.games_won)
    $('.draws').text(setup.playerX.games_drawn)
    $('.losses').text(setup.playerX.games_lost)
    // $('.game-update').off('click')
    $('#myModal').modal('show').modal({backdrop: 'static', keyboard: false})
  }
  setup.valx.total = setup.valx.sumCol0 + setup.valx.sumCol1 + setup.valx.sumCol2
}

module.exports = {
  winCheck
}
