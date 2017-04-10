'use strict'
const setup = require('../setup')
// // game id data
// const gameStore = require('./gameStore')

const store = require('../store')
let refData = ''

const signUpSuccess = (data) => {
  refData = 'x'
  console.log(data)
  $('.errors-sign-up').text('')
}
const signUpFailure = (error) => {
  console.error(error)
  // $('#sign-up').append('<p> "that didnt work" </p>')
  $('.errors-sign-up').text('Uh uh uh, you didnt say the magic word')
}

const signInSuccess = (data) => {
  console.log('sign in success: ', data)
  store.user = data.user
  refData = 'x'
  $('.wins').text('0')
  $('.draws').text('0')
  $('.losses').text('0')
  // show diff modal pieces
  $('#change-password').show()
  $('#game-create').show()
  $('#sign-out').show()
  // hide sign-up modal piece until sign-out
  $('#sign-up').hide()
  $('#sign-in').hide()
  // $('sign-in').append('<p> "" </p>')
  $('.errors-sign-in').text('')
  $('#errors-sign-in-image').hide()
}
const signInFailure = (error) => {
  console.error('sign in error is: ', error)
  // $('#sign-in').append('<p> "that didnt work" </p>')
  $('.errors-sign-in').text('Uh uh uh, you didnt say the magic word')
  $('#errors-sign-in-image').html(
    $('<img />', {src: '../../../../images/error-image.gif' //, 'class': 'fullImage'
    })
  ).show()
  $('#sign-in-box').text('god dang')
}

const signOutSuccess = () => {
  console.log('sign onSignOut success')
  store.user = null
  console.log('store is null: ' + store.user)
  refData = ''
  $('.wins').text('0')
  $('.draws').text('0')
  $('.losses').text('0')
  $('.game-update').empty()
  $('.game-update').text('')
  $('.game-update').on('click')
  $('.game-update').css('background-color', '#ffd700')
  $('.game-update').html(
    $('<img />', {src: '../../../../images/questionBlock64.png' //, 'class': 'fullImage'
    })
  ).show()
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('#game-create').hide()
  $('#sign-out').hide()
  setup.play = 0

  // define grid to store game state
  setup.grid = [new Array(3), new Array(3), new Array(3)]

  // values for the game logic
  setup.valx = {
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
  setup.valArray = new Array(8)

  // local store of game data
  setup.playerX = {
    id: 1,
    email: 'matt@m.com',
    games_won: 0,
    games_lost: 0,
    games_drawn: 0
  }
  setup.playerO = {
    id: 2,
    email: 'fake@m.com',
    games_won: 0,
    games_lost: 0,
    games_drawn: 0
  }
  setup.currentGame = {
    winner: '',
    loser: '',
    drawer: '',
    // only send below to API
    id: 1,
    cells: [], // should this be a 9 by 2 or 9 by 1 or 9 by 3
    over: false,
    player_x: {
      id: setup.playerX.id,
      email: setup.playerX.email
    },
    player_o: {
      id: setup.playerO.id,
      email: setup.playerO.email
    }
  }
}
const signOutFailure = (error) => {
  console.error('sign out error is: ', error)
}

const changePasswordSuccess = (data) => {
  console.log('changePasswordSuccess success')
  console.log(data)
  // $('#change-password').text('')
  $('.errors-change-password').text('')
}
const changePasswordFailure = (error) => {
  console.error('changePasswordFailure error is: ', error)
  // $('#change-password').append('<p> "that didnt work" </p>')
  $('.errors-change-password').text('Uh uh uh, you didnt say the magic word')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  refData
}
