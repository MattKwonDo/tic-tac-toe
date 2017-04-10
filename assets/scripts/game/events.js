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
// const bootstrap = require('bootstrap') // not sure if this is needed
const refData = require('../auth/ui')

const gameHistory = require('../gameHistory')

const playOrderArray = []
// let localData = {
//   index: [],
//   value: []
// }

let arrayValue = null

// Below is create game and click functionality
// create game
const onCreateGame = function (event) {
  // if ($('.wins').text('0') === '0') {
  event.preventDefault()
  console.log('1 ran!')
  // reset game board
  $('.game-update').empty()
  $('.game-update').text('')
  $('.game-update').on('click')
  $('.game-update').css('background-color', '#ffd700')
  $('.game-update').html(
    $('<img />', {src: 'http://i.imgur.com/ysG8bk0.png' //, 'class': 'fullImage'
    })
  ).show()
  // $('#img1').show()
  gameApi.create()
    .then(gameUi.createGameSuccess)
    .catch(gameUi.createGameFailure)
  console.log('3 ran!')
  // will want to reset board, reset handlers, load handlers
  // } else {
  //   return
  // }
}

// get current game data
const onGetStats = function (event) {
  event.preventDefault()
  console.log('1 ran!')
  // get data back from the server
  gameApi.showGame()
  .then(gameUi.showGameSuccess)
  .catch(gameUi.showGameFailure)
    //
    // gameApi.indexGame()
    // .then(gameUi.indexGameSuccess)
    // .catch(gameUi.indexGameFailure)
  console.log('3 ran!')
  // will want to reset board, reset handlers, load handlers
}
// get all game data
const onGetStatsAll = function (event) {
  event.preventDefault()
  console.log('1 ran!')
  // get data back from the server
  gameApi.showAllGames()
  .then(gameUi.showAllGameSuccess)
  .catch(gameUi.showAllGameFailure)
    //
    // gameApi.indexGame()
    // .then(gameUi.indexGameSuccess)
    // .catch(gameUi.indexGameFailure)

  // will want to reset board, reset handlers, load handlers
  // console.log('games: ', gameHistory.games.length)
  // ajaxReturn.dddd
}
// get complete games data
const onGetStatsComplete = function (event) {
  event.preventDefault()
  console.log('1 ran!')
  // get data back from the server
  gameApi.indexGame()
  .then(gameUi.indexGameSuccess)
  .catch(gameUi.indexGameFailure)
    //
    // gameApi.indexGame()
    // .then(gameUi.indexGameSuccess)
    // .catch(gameUi.indexGameFailure)
  console.log('3 ran!')
  // will want to reset board, reset handlers, load handlers
}

const onClick = function (event) { // may not need 'event'
  // only allow a play if the box hasn't been clicked
  if (this.innerHTML === 'x' | this.innerHTML === 'o' | $(this).text === 'x' | $(this).text === 'o') {
    console.log('this box cannot be clicked again')
    return
  }
  // turn off click handler
  // $(this).off('click')
  // gameUi.playSuccess()
  // create data object
  let data = {}
  console.log(2)
  if (setup.play % 2 === 0) {
    console.log('xxxxxxxxxx')
    console.log('1')
    // keep track of the box id
    const index = parseInt($(this).attr('id')) - 1
    // gameStore.game.play += 1
    console.log('plays before this ', setup.play)
    // keep track of the plays and set this as the next play if valid
    setup.play += 1
    // update display
    $(this).css('background-color', '#5e91fe')
    $(this).css('font-size', '50px')
    this.innerHTML = 'x'
    // $(this).text('x')
    // set value to be stored equal to player x or o
    const value = this.innerHTML
    // convert x or o to 1 or 0
    if (this.innerHTML === 'x') {
      arrayValue = 1
    } else if (this.innerHTML === 'o') {
      arrayValue = 0
    } else {
      console.log('not new click')
    }
    console.log(data)
    console.log('gameStore game ', gameStore.game)
    console.log('gameStore cells ', gameStore.game.cells)
    console.log('gameStore id ', gameStore.game.id)
    console.log('gameStore over ', gameStore.game.over)
    console.log('gameStore player_o ', gameStore.game.player_o)
    console.log('gameStore player_x ', gameStore.game.player_x)
    // console.log('gameStore plays ', gameStore.game.play)
    console.log('setup plays', setup.play)
    console.log('clicked ' + value)
    // log the play in the appropriate spot for server
    gameStore.game.cells[setup.play - 1] = value
    // log the value in the order of the click
    playOrderArray.push(arrayValue)
    console.log('play order' + playOrderArray)
    // localData.index.push(index - 1)
    // localData.value.push(value)
    setup.grid[Math.floor((index) / 3)][(index) % 3] = arrayValue
    console.log('grid ' + setup.grid)
    console.log('gameStore game ', gameStore.game)
    console.log('gameStore cells ', gameStore.game.cells)
    console.log('gameStore id ', gameStore.game.id)
    console.log('gameStore over ', gameStore.game.over)
    console.log('gameStore player_o ', gameStore.game.player_o)
    console.log('gameStore player_x ', gameStore.game.player_x)
    // console.log('gameStore plays ', gameStore.game.play)
    console.log('setup plays', setup.play)
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
    console.log('data to be sent: ', data)
    // send data to server
    gameApi.updateGameState(data)
    .then(gameUi.playSuccess)
    .catch(gameUi.playFailure)
  // get data back from the server
    // gameApi.showGame()
    // .then(gameUi.showGameSuccess)
    // .catch(gameUi.showGameFailure)
    //
    // gameApi.indexGame()
    // .then(gameUi.indexGameSuccess)
    // .catch(gameUi.indexGameFailure)

// if player not x, then:
  } else {
    console.log('ooooooooo')
    console.log('1')
    // only allow a play if the box hasn't been clicked
    if (this.innerHTML === 'x' | this.innerHTML === 'o' | $(this).text === 'x' | $(this).text === 'o') {
      console.log('this box cannot be clicked again')
      return
    }
    // keep track of the box id
    const index = parseInt($(this).attr('id')) - 1
    // gameStore.game.play += 1
    console.log('plays before this ', setup.play)
    // keep track of the plays and set this as the next play if valid
    setup.play += 1
    console.log(2)
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
      console.log('not new click')
    }
    // create data object
    let data = {}
    console.log(data)
    console.log('gameStore game ', gameStore.game)
    console.log('gameStore cells ', gameStore.game.cells)
    console.log('gameStore id ', gameStore.game.id)
    console.log('gameStore over ', gameStore.game.over)
    console.log('gameStore player_o ', gameStore.game.player_o)
    console.log('gameStore player_x ', gameStore.game.player_x)
    // console.log('gameStore plays ', gameStore.game.play)
    console.log('setup plays', setup.play)
    console.log('clicked ' + value)
    // log the play in the appropriate spot for server
    gameStore.game.cells[setup.play - 1] = value
    // log the value in the order of the click
    playOrderArray.push(value)
    console.log('play order' + playOrderArray)
    // localData.index.push(index - 1)
    // localData.value.push(value)
    setup.grid[Math.floor((index) / 3)][(index) % 3] = arrayValue
    console.log('grid ' + setup.grid)
    console.log('gameStore game ', gameStore.game)
    console.log('gameStore cells ', gameStore.game.cells)
    console.log('gameStore id ', gameStore.game.id)
    console.log('gameStore over ', gameStore.game.over)
    console.log('gameStore player_o ', gameStore.game.player_o)
    console.log('gameStore player_x ', gameStore.game.player_x)
    // console.log('gameStore plays ', gameStore.game.play)
    console.log('setup plays', setup.play)
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
    console.log('data to be sent: ', data)
    // send data to server
    gameApi.updateGameState(data)
    .then(gameUi.playSuccess)
    .catch(gameUi.playFailure)
// get data back from the server
    // gameApi.showGame()
    // .then(gameUi.showGameSuccess)
    // .catch(gameUi.showGameFailure)
    //
    // gameApi.indexGame()
    // .then(gameUi.indexGameSuccess)
    // .catch(gameUi.indexGameFailure)
  }
}

const addHandlers = () => {
  $('#myModal').modal('show') // .modal({backdrop: 'static', keyboard: false})
  $('#change-password').hide()
  $('#game-create').hide()
  $('#sign-out').hide()
  $('.game-create').on('click', onCreateGame).on('click', onGetStatsAll)// .on('click', setup.reset)
  $('.game-update').on('click', onClick)
  // move this into onClick? or onto own button
  $('#game-return').on('click', onGetStats)
  $('#game-return-all').on('click', onGetStatsAll)
  $('#game-return-complete').on('click', onGetStatsComplete)
    // $('.game-return-wins').on('click', onGetStatsWins)
    // $('.game-return-draws').on('click', onGetStatsDraws)
    // $('.game-return-losses').on('click', onGetStatsLosses)
    // .on('click', gameApi.watchGame)
}

module.exports = {
  addHandlers,
  onCreateGame, //
  onClick, //
  onGetStats,
  onGetStatsAll,
  onGetStatsComplete
}
