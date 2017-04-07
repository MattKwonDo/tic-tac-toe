'use strict'

const gameStore = require('../game/gameStore')
const winCheck = require('../winCheck.js')

const createGameSuccess = (ajaxResponse) => {
  console.log('sign in success: ', ajaxResponse)
  gameStore.game = ajaxResponse.game
  gameStore.game.play = 0
  console.log('gameStore game ', gameStore.game)
  console.log('gameStore id ', gameStore.game.cells)
  console.log('gameStore id ', gameStore.game.id)
  console.log('gameStore id ', gameStore.game.over)
  console.log('gameStore id ', gameStore.game.player_o)
  console.log('gameStore id ', gameStore.game.player_x)
}
const createGameFailure = (error) => {
  console.error('sign in error is: ', error)
}

const playSuccess = (data) => {
  gameStore.game.play++
  console.log(data)
  gameStore.game.cells = data.game.cells
  console.log('gameStore game cells', gameStore.game.cells)
  win.winCheck(gameStore.game.cells)
  console.log('array to check win against ', gameStore.game.cells)
  console.log(win.winCheck(gameStore.game.cells))
}

const playFailure = (error) => {
  console.error(error)
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  playSuccess,
  playFailure
}
