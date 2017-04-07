'use strict'

const gameStore = require('../gameStore')
const winCheck = require('../winCheck.js')
// new game setup
const setup = require('../setup')

const createGameSuccess = (ajaxResponse) => {
  console.log('sign in success: ', ajaxResponse)
  gameStore.game = ajaxResponse.game
  // gameStore.game.play = 0
  setup.play = 0
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
  console.error('sign in error is: ', error)
}

const playSuccess = (data) => {

}

const playFailure = (error) => {

}

const sendSuccess = (data) => {
  gameStore.game.play++
  console.log(data)
  gameStore.game.cells = data.game.cells
  console.log('gameStore game cells', gameStore.game.cells)
  win.winCheck(gameStore.game.cells)
  console.log('array to check win against ', gameStore.game.cells)
  console.log(win.winCheck(gameStore.game.cells))
}

const sendFailure = (error) => {
  console.error(error)
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  playSuccess,
  playFailure,
  sendSuccess,
  sendFailure
}
