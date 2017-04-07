'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const gameApi = require('./gameApi.js')
const gameUi = require('./gameUi.js')

// const bootstrap = require('bootstrap')

// below is all sign in / out / change pw data
// sign up
const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
// sign in
const onSignIn = function (event) {
  // test if working console.log('sign in function worked, bro')
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
// sign out
const onSignOut = function (event) {
  // test if working console.log('sign in function worked, bro')
  event.preventDefault()
  // console.log('sign out ran ')
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}
// change password
const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
//
//
// Below is the create game stuff
// create game
const onCreateGame = function (event) {
  event.preventDefault()
  console.log('1 ran!')
  gameApi.create()
    .then(gameUi.onNoContentSuccess)
    .catch(gameUi.onError)
  console.log('3 ran!')
  // will want to reset board, reset handlers, load handlers
}
// update game state
// const onUpdateGame = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   const game = data.game
//
//   if (game.id.length !== 0) {
//     gameApi.updateGameState(data)
//     .then(gameUi.onNoContentSuccess)
//     .catch(gameUi.onError)
//   } else {
//     console.log('Please provide a game id!')
//   }
// }

const onClick = function (event) { // may not need 'event'
  // only allow a play if the box hasn't been clicked
  if (this.innerHTML === 'x' | this.innerHTML === 'o' | $(this).text === 'x') {
    console.log('this box cannot be clicked again')
    return
  }
  // keep track of the plays and set this as the next play if valid
  play += 1
  // keep track of the box id
  const index = parseInt($(this).attr('id'))
  if (play % 2 === 1) {
    $(this).css('background-color', '#5e91fe')
    $(this).css('font-size', '50px')
    this.innerHTML = 'x'
    $(this).text('x')
    const value = this.innerHTML
    const data = {
      'play': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': false
      }
    }
    console.log('clicked ' + value)
    console.log(data)
    gameApi.updateGameState(data)
    .then(gameUi.onNoContentSuccess)
    .catch(gameUi.onError)
  } else {
    $(this).css('background-color', 'red')
    $(this).css('font-size', '50px')
    // $(this).css('background-image', 'url')
    this.innerHTML = 'o'
    const value = this.innerHTML
    const data = {
      'play': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': false
      }
    }
    console.log('clicked ' + value)
    console.log(data)
    gameApi.updateGameState(data)
    .then(gameUi.onNoContentSuccess)
    .catch(gameUi.onError)
  }
  $(this).off('click')
}

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
let play = 0
let playerTurn = 'playerX'

// define grid to store game state
let grid = [new Array(3),new Array(3),new Array(3)]
// function to check to see if someone has won and change game states and winner loser, drawer, and counts
// combine all of the below functions into one function, reset total to 0 after each for loop
// let overCheck = function {

// values for the game logic
let valx = {
  total: 0,
  sumForwardDiagonal: 0,
  sumBackwardDiagonal: 0,
  sumCol0: 0,
  sumCol1: 0,
  sumCol2: 0,
  sumRow0: 0,
  sumRow1: 0,
  sumRow2: 0
}

// array with values for game logic
let valArray = new Array(8)

grid = [[0, 0, 1],
        [1, 0, 1],
        [0, 1, 1]] // just for test purposese, delete this eventually
// console.log(valueCalc(grid, valArray)) // just for test
// grid = [[0,0,1],[,1,],[0,,1]] // just for test purposese, delete this eventually
let valueCalc = function (array, valArray) {
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
  // for (let i = 0; i < array.length; i++) {
  //   valArray[0] += array[i][i] // forward diagonal sum  // starts at upper left corner and moves down and to right
  //   valArray[1] += array[i][array[i].length - i - 1] // backward diagonal sum // starts at upper right corner and moves down and to left
  //   valArray[2] += array[i][0] // col 0 sum
  //   valArray[3] += array[i][1] // col 1 sum
  //   valArray[4] += array[i][2] // col 2 sum
  //   valArray[5] += array[0][i] // row 0 sum
  //   valArray[6] += array[1][i] // row 1 sum
  //   valArray[7] += array[2][i] // row 2 sum
  // }
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
// console.log(valueCalc(grid, valArray))

// let winCheck = function () {
//   if
// }

//
//

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#1').on('click', onClick)
  $('#2').on('click', onClick)
  $('#3').on('click', onClick)
  $('#4').on('click', onClick)
  $('#5').on('click', onClick)
  $('#6').on('click', onClick)
  $('#7').on('click', onClick)
  $('#8').on('click', onClick)
  $('#9').on('click', onClick)
  $('#game-create').on('click', onCreateGame)
  $('#game-create-new').on('click', onCreateGame)
  // $('.game-update').on('submit', onClick)
}

module.exports = {
  addHandlers,
  valueCalc,
  onCreateGame,
  onClick
}
