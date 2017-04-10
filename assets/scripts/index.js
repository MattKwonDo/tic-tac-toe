'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require without a reference to ensure a file is bundled
require('./example')

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
// On document ready
$(() => {
  authEvents.addHandlers()
  gameEvents.addHandlers()
})
