'use strict'

// links to other files
const gameApi = require('./api.js')
const gameUi = require('./ui.js')
// new game setup
const setup = require('../setup')
// game id data
const gameStore = require('../gameStore')
// game logic
const winCheck = require('../winCheck')
// for future dev: // const bootstrap = require('bootstrap') // not sure if this is needed
// const refData = require('../auth/ui')
// const gameHistory = require('../gameHistory')

const playOrderArray = []

let arrayValue = null

// Below is create game and click functionality
// create game
const onCreateGame = function (event) {
  event.preventDefault()
  // reset game board
  $('.game-update').empty()
  $('.game-update').text('')
  $('.game-update').on('click')
  $('.game-update').css('background-color', '#ffd700')
  // $('.game-update').html(
  //   $('<img />', {src: 'http://i.imgur.com/ysG8bk0.png  ' //, 'class': 'fullImage'
  //   })
  // ).show()
  gameApi.create()
    .then(gameUi.createGameSuccess)
    .catch(gameUi.createGameFailure)
}
// get current game data
const onGetStats = function (event) {
  event.preventDefault()
  // get data back from the server
  gameApi.showGame()
  .then(gameUi.showGameSuccess)
  .catch(gameUi.showGameFailure)
}
// get all game data
const onGetStatsAll = function (event) {
  event.preventDefault()
  // get data back from the server
  gameApi.showAllGames()
  .then(gameUi.showAllGameSuccess)
  .catch(gameUi.showAllGameFailure)
}
// get complete games data
const onGetStatsComplete = function (event) {
  event.preventDefault()
  // get data back from the server
  gameApi.indexGame()
  .then(gameUi.indexGameSuccess)
  .catch(gameUi.indexGameFailure)
}

const onClick = function (event) { // may not need 'event'
  // only allow a play if the box hasn't been clicked
  if (this.innerHTML === 'x' | this.innerHTML === 'o' | $(this).text === 'x' | $(this).text === 'o') {
    return
  }
  let data = {}
  if (setup.play % 2 === 0) {
    // keep track of the box id
    const index = parseInt($(this).attr('id')) - 1
    // keep track of the plays and set this as the next play if valid
    setup.play += 1
    // update display
    $(this).css('background-color', '#5e91fe')
    $(this).css('font-size', '50px')
    this.innerHTML = 'x'
    // set value to be stored equal to player x or o
    const value = this.innerHTML
    // convert x or o to 1 or 0
    if (this.innerHTML === 'x') {
      arrayValue = 1
    } else if (this.innerHTML === 'o') {
      arrayValue = 0
    }
    // log the play in the appropriate spot for server
    gameStore.game.cells[setup.play - 1] = value
    // log the value in the order of the click
    playOrderArray.push(arrayValue)
    // translate the data to the array format
    setup.grid[Math.floor((index) / 3)][(index) % 3] = arrayValue
    // call winCheck
    winCheck.winCheck(setup.grid, setup.valArray)
    // set game status equal to the right data
    data = { // should this be a constructor function to have one for each play?
      'game': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': gameStore.game.over
      }
    }
    // send data to server
    gameApi.updateGameState(data)
    .then(gameUi.playSuccess)
    .catch(gameUi.playFailure)
// if player not x, then:
  } else {
    // only allow a play if the box hasn't been clicked
    if (this.innerHTML === 'x' | this.innerHTML === 'o' | $(this).text === 'x' | $(this).text === 'o') {
      return
    }
    // keep track of the box id
    const index = parseInt($(this).attr('id')) - 1
    // gameStore.game.play += 1
    // keep track of the plays and set this as the next play if valid
    setup.play += 1
    // update display
    $(this).css('background-color', 'red')
    $(this).css('font-size', '50px')
    // $(this).css('background-image', 'url')
    this.innerHTML = 'o'
    // $(this).text('o')
    const value = this.innerHTML
    // convert x or o to 1 or 0
    if (this.innerHTML === 'x') {
      arrayValue = 1
    } else if (this.innerHTML === 'o') {
      arrayValue = 0
    } else {
    }
    // create data object
    let data = {}
    // log the play in the appropriate spot for server
    gameStore.game.cells[setup.play - 1] = value
    // log the value in the order of the click
    playOrderArray.push(value)
    // translate the data to the array format
    setup.grid[Math.floor((index) / 3)][(index) % 3] = arrayValue
    // call winCheck
    winCheck.winCheck(setup.grid, setup.valArray)
    // set game status equal to the right data
    data = { // should this be a constructor function to have one for each play?
      'game': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': gameStore.game.over
      }
    }
    // send data to server
    gameApi.updateGameState(data)
    .then(gameUi.playSuccess)
    .catch(gameUi.playFailure)
  }
}

const addHandlers = () => {
  $('#myModal').modal('show') // .modal({backdrop: 'static', keyboard: false})
  $('#change-password').hide()
  $('#game-create').hide()
  $('#sign-out').hide()
  $('.game-create').on('click', onCreateGame).on('click', onGetStatsAll)// .on('click', setup.reset)
  $('.game-update').on('click', onClick)
  $('#game-return').on('click', onGetStats)
  $('#game-return-all').on('click', onGetStatsAll)
  $('#game-return-complete').on('click', onGetStatsComplete)
}

module.exports = {
  addHandlers,
  onCreateGame, //
  onClick, //
  onGetStats,
  onGetStatsAll,
  onGetStatsComplete
}
