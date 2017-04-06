'use strict'

// GET /games games#index
// POST /games games#create
// GET /games/:id games#show
// PATCH /games/:id games#update
// GET /games/:id/watch games#watch

const app = require('../app.js')
const config = require('../config')
const store = require('../store')

const index = function () {
  return $.ajax({
    url: app.host + '/games',
    method: 'GET'
  })
}

const create = function (data) {
  console.log('2 ran!')
  return $.ajax({
    url: app.host + '/games/',
    method: 'POST',
    // data: data
    data: {
      'game': {
        'id': 3,
        'cells': ['x','o','x','o','x','o','x','o','x'],
        'over': true,
        'player_x': {
          'id': 1,
          'email': 'and@and.com'
        },
        'player_o': null
      }
    },
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const show = function (id) {
  return $.ajax({
    url: app.host + '/games/' + id,
    method: 'GET'
  })
}

const update = function (data) {
  return $.ajax({
    url: app.host + '/games/' + data.book.id,
    method: 'PATCH',
    data: data
  })
}

//
// placeholder for // GET /games/:id/watch games#watch
//

// const destroy = function (id) {
//   return $.ajax({
//     url: app.host + '/games/' + id,
//     method: 'DELETE'
//   })
// }

module.exports = {
  index,
  create,
  show,
  update
  // destroy,
}
