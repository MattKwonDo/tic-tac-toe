'use strict'

// GET /games games#index
// POST /games games#create
// GET /games/:id games#show
// PATCH /games/:id games#update
// GET /games/:id/watch games#watch

// const app = require('../app.js') // may not be needed
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

const showGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameStore.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showAllGames = function (ajaxResponseShowAll) {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // },
    data: ajaxResponseShowAll
  })
}

const indexGame = function (ajaxResponseIndex) {
  return $.ajax({
    url: config.apiOrigin + '/games?over=true',
    // url: config.apiOrigin + '/games/' + gameStore.game.id + '/' + '?over=true',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ajaxResponseIndex
  })
}

// placeholder for // GET /games/:id/watch games#watch
// const watchGame = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/games/' + gameStore.game.id + '/watch',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

module.exports = {
  create,
  updateGameState,
  showGame,
  showAllGames,
  indexGame
  // ,watchGame
}
