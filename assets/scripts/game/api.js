'use strict'

// GET /games games#index
// POST /games games#create
// GET /games/:id games#show
// PATCH /games/:id games#update
// GET /games/:id/watch games#watch

const app = require('../app.js') // may not be needed
const config = require('../config') // why the url in this file over another one?
const store = require('../store')
const gameStore = require('../gameStore')

// create a new game
const create = function () {
  console.log('2 ran!')
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGameState = (ajaxSend) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameStore.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ajaxSend
  })
}

//
// placeholder for // GET /games/:id/watch games#watch
//
// const index = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/games',
//     method: 'GET'
//   })
// }
//
// const show = function (id) {
//   return $.ajax({
//     url: config.apiOrigin + '/games/' + id,
//     method: 'GET'
//   })
// }

module.exports = {
  create,
  updateGameState
}
