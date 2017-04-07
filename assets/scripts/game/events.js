'use strict'

// create game stuff
const gameApi = require('./api.js')
const gameUi = require('./ui.js')
// new game setup
const setup = require('../setup')
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
  setup.play += 1
  // keep track of the box id
  const index = parseInt($(this).attr('id'))
  if (setup.play % 2 === 1) {
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
    // .then(gameUi.playSuccess)
    // .catch(gameUi.playFailure)
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
    // .then(gameUi.playSuccess)
    // .catch(gameUi.playFailure)
  }
  $(this).off('click')
}

const addHandlers = () => {
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
