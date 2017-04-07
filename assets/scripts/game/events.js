'use strict'
// sign in / out / change pw data
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('../auth/api')
const ui = require('../auth/ui')
// create game stuff
const gameApi = require('./api.js')
const gameUi = require('./ui.js')
// game id data
const gameStore = require('../gameStore')
      // game {
      // cells: Array[9]
      // id:11
      // over:false
      // player_o:null
      // player_x:Object
      // }
// game logic
const winCheck = require('../winCheck')


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
    .then(gameUi.createGameSuccess)
    .catch(gameUi.createGameFailure)
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
      'game': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': false
      }
    }
    console.log('clicked ' + value)
    console.log(data)
    // gameApi.updateGameState(data)
    // .then(gameUi.onNoContentSuccess)
    // .catch(gameUi.onError)
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
    // gameApi.updateGameState(data)
    // .then(gameUi.onNoContentSuccess)
    // .catch(gameUi.onError)
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
        [0, 1, 1]]
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#1').one('click', onClick)
  $('#2').one('click', onClick)
  $('#3').one('click', onClick)
  $('#4').one('click', onClick)
  $('#5').one('click', onClick)
  $('#6').one('click', onClick)
  $('#7').one('click', onClick)
  $('#8').one('click', onClick)
  $('#9').one('click', onClick)
  $('#game-create').on('click', onCreateGame)
  $('#game-create-new').on('click', onCreateGame)
  // $('.game-update').on('submit', onClick)
}

module.exports = {
  addHandlers,
  onCreateGame,
  onClick
}
