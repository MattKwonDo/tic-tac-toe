'use strict'

const gameStore = require('../gameStore')
// const winCheck = require('../winCheck')
// new game setup
const setup = require('../setup')

// // reset board function. Resets clicks on board and resets variables.
// function resetBoard() {
//     $gameCells.removeClass('won');
//     $gameCells.html('');
//     winner = 'null';
//     moves = ["", "", "", "", "", "", "", "", ""];
//     turn = 'X';
//     count = 0;
// }
//
// // Button for new game. Clears board and let's player play new game.
// $('#newGame').click(function() {
//     $(this).on();
//     resetBoard();
//     startGame();
//     console.log(moves, turn, count);
// });

const createGameSuccess = (ajaxResponseCreate) => {
  console.log('ajaxResponseCreate game: ', ajaxResponseCreate)
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
  console.log('gameStore game ', gameStore.game)
  console.log('gameStore cells ', gameStore.game.cells)
  console.log('gameStore id ', gameStore.game.id)
  console.log('gameStore over ', gameStore.game.over)
  console.log('gameStore player_o ', gameStore.game.player_o)
  console.log('gameStore player_x ', gameStore.game.player_x)
  // console.log('gameStore plays', gameStore.game.play)
  console.log('setup plays', setup.play)
}
const createGameFailure = (error) => {
  $('#myModal').modal('show')
  // delete this console.log or make it return?
  console.error('sign in error is: ', error)
}

const playSuccess = (ajaxResponsePlay) => {
  // const engine = require('./engine.js')
  console.log('ajaxResponsePlay: ', ajaxResponsePlay)
}

const playFailure = (error) => {
  console.error(error)
}

const showGameSuccess = (ajaxResponseShow) => {
  console.log('ajaxResponseShow: ', ajaxResponseShow)
}

const showGameFailure = (error) => {
  console.error(error)
}

const showAllGamesSuccess = (ajaxResponseShowAll) => {
  console.log('ajaxResponseShowAll: ', ajaxResponseShowAll)
}

const showAllGamesFailure = (error) => {
  console.error(error)
}

const indexGameSuccess = (ajaxResponseIndex) => {
  console.log('ajaxResponseIndex: ', ajaxResponseIndex)
}

const indexGameFailure = (error) => {
  console.error(error)
}

// const sendSuccess = (data) => {
//   gameStore.game.play++
//   console.log(data)
//   gameStore.game.cells = data.game.cells
//   console.log('gameStore game cells', gameStore.game.cells)
//   win.winCheck(gameStore.game.cells)
//   console.log('array to check win against ', gameStore.game.cells)
//   console.log(win.winCheck(gameStore.game.cells))
// }

const sendFailure = (error) => {
  console.error(error)
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
  showAllGamesSuccess,
  showAllGamesFailure,
  indexGameSuccess,
  indexGameFailure
}
