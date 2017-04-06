'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const authEvents = require('./auth/events.js')
// On document ready
$(() => {
  authEvents.addHandlers()

  $('#game-create').on('submit', authEvents.onCreateGame)
  $('#games-search').on('submit', authEvents.onGetGames)
  $('#game-search').on('submit', authEvents.onGetGame)
  // $('#game-delete').on('submit', authEvents.onDeletegame)
  $('#game-update').on('submit', authEvents.onUpdateGame)
})
