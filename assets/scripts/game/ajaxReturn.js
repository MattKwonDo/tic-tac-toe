'use strict'

const gameHistory = require('../gameHistory')

// const setup = require('../setup')

// get a an object with all of the games to run back through winCheck
const games = function (ajaxResponseShowAll) {
  console.log('last games: ', gameHistory.games.map(function (ajaxResponseShowAll) { return ajaxResponseShowAll.cells }))
}

module.exports = {
  // totalWins,
  games
}
