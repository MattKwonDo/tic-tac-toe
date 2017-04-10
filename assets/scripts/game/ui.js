'use strict'

const gameStore = require('../gameStore')
// const winCheck = require('../winCheck')
// new game setup
const setup = require('../setup')
const gameHistory = require('../gameHistory')
const ajaxReturn = require('./ajaxReturn')

let games = ''
let gamesPlayed = ''
let errors = 0
let successes = 0

const createGameSuccess = (ajaxResponseCreate) => {
  // reset local store of data
  setup.play = 0
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

  // local store of game data
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
  gameStore.game = ajaxResponseCreate.game
}
const createGameFailure = () => {
  $('#myModal').modal('show')
  errors += 1
}

const playSuccess = (ajaxResponsePlay) => {
  successes += 1
}

const playFailure = () => {
  errors += 1
}

const showGameSuccess = (ajaxResponseShow) => {
  successes += 1
}

const showGameFailure = () => {
  errors += 1
}

const showAllGameSuccess = (ajaxResponseShowAll) => {
  gameHistory.games = ajaxResponseShowAll.games
  gamesPlayed = gameHistory.games.length - 1
  $('#games').text(gamesPlayed)
  // run function
  games = gameHistory.games.map(function (ajaxResponseShowAll) { return ajaxResponseShowAll.cells })
  // ajaxReturn.games(ajaxResponseShowAll)
  // console.log('ajaxReturn.games: ', ajaxReturn.games)
  // .then(ajaxReturn.totalWins(ajaxResponseShowAll))

  // .catch(console.log('did not get games list'))
}

const showAllGameFailure = () => {
  errors += 1
}

// const indexGameSuccess = (ajaxResponseIndex) => {
//   console.log('ajaxResponseIndex: ', ajaxResponseIndex)
//   // gameHistory.games = ajaxResponseIndex.games
// }
//
// const indexGameFailure = (error) => {
//   console.error(error)
// }

// const sendSuccess = (data) => {
//   gameStore.game.play++
//   console.log(data)
//   gameStore.game.cells = data.game.cells
//   console.log('gameStore game cells', gameStore.game.cells)
//   win.winCheck(gameStore.game.cells)
//   console.log('array to check win against ', gameStore.game.cells)
//   console.log(win.winCheck(gameStore.game.cells))
// }

const sendFailure = () => {
  errors += 1
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  playSuccess,
  playFailure,
  // sendSuccess,
  sendFailure,
  showGameSuccess,
  showGameFailure,
  showAllGameSuccess,
  showAllGameFailure,
  // indexGameSuccess,
  // indexGameFailure,
  games,
  gamesPlayed
}
