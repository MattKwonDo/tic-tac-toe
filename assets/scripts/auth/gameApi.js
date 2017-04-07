'use strict'

// GET /games games#index
// POST /games games#create
// GET /games/:id games#show
// PATCH /games/:id games#update
// GET /games/:id/watch games#watch

const app = require('../app.js')
const config = require('../config')
const store = require('../store')

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

const updateGameState = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
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
