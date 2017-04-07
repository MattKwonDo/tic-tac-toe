'use strict'

// just for test purposese, delete this eventually
// console.log(winCheck(grid, valArray)) // just for test
// grid = [[0,0,1],[,1,],[0,,1]] // just for test purposese, delete this eventually

let winCheck = function (array, valArray) {
  // log the coordinates
  // need to figure this out - is this a pair like in boggle???
  // add 1 to set the current play
  // play += 1
  // if this is the 4th play or lower, then exit as no one could win yet
  if (play < 5) {
    // change the player to whose turn it is next
    if (playerTurn === 'playerX') {
      playerTurn = 'playerO'
    } else {
      playerTurn = 'playerX'
    }
    return
  }
  // reset values
  valx.sumForwardDiagonal = 0
  valx.sumBackwardDiagonal = 0
  valx.sumCol0 = 0
  valx.sumCol1 = 0
  valx.sumCol2 = 0
  valx.sumRow0 = 0
  valx.sumRow1 = 0
  valx.sumRow2 = 0

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
      currentGame.winner = playerX
      currentGame.loser = playerO
      currentGame.over = true
      playerX.games_won += 1
      playerO.games_lost += 1
      console.log('game over, playerX won')
    } else if (valArray[i] === 0) {
      currentGame.winner = playerO
      currentGame.loser = playerX
      playerO.games_won += 1
      playerX.games_lost += 1
      currentGame.over = true
      console.log('game over, playerO won')
    } else {
      continue
    }
    // need to figure out how to log as a drawe
      // else if (valArray[5] + valArray[6] + valArray[7] === 5) {
      //   currentGame.drawer = 'both'
      //   playerO.games_drawn += 1
      //   playerX.games_drawn += 1
      //   currentGame.over = true
      //   return "game over, it's a draw"
      // }
  }
  console.log('winner = ', currentGame.winner)
  console.log('winner = ', currentGame.loser)
  console.log('game over = ', currentGame.over)
  console.log('playerX.games_won = ', playerX.games_won)
  console.log('playerX.games_lost = ', playerX.games_lost)
  console.log('playerX.games_drawn = ', playerX.games_drawn)
  console.log('playerO.games_won = ', playerO.games_won)
  console.log('playerO.games_lost = ', playerO.games_lost)
  console.log('playerO.games_drawn = ', playerO.games_drawn)

  valx.total = valx.sumCol0 + valx.sumCol1 + valx.sumCol2

  console.log(valx.sumForwardDiagonal + ' ' +
  valx.sumBackwardDiagonal + ' ' +
  valx.sumCol0 + ' ' +
  valx.sumCol1 + ' ' +
  valx.sumCol2 + ' ' +
  valx.sumRow0 + ' ' +
  valx.sumRow1 + ' ' +
  valx.sumRow2 + ' and col total = ' +
  valx.total + ' and row total = ' +
  (valx.sumRow0 + valx.sumRow1 + valx.sumRow2) + ' and total total = '
  )

  // if statement to set game over and winners if any of the row/col/diag combos are = 3 or 0
  // if
  // if (plays === 9 | one of the rows === 3 or 0) {
  //   currentGame.over = true
  //  }

  // change the player to whose turn it is next
  if (playerTurn === 'playerX') {
    playerTurn = 'playerO'
  } else {
    playerTurn = 'playerX'
    return valx.total
  }
}
// console.log(winCheck(grid, valArray))

module.exports = {
  winCheck
}
