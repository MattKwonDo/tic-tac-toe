'use strict'

const reset = function () {
  $('.game-update').css('background-color', '#5e91fe').text('')
  $('.image1').show('slow')
}

// define number of plays and playerTurn to keep track of who should be playing
let play = 0

// define grid to store game state
let grid = [new Array(3), new Array(3), new Array(3)]

// values for the game logic
let valx = {
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
let valArray = new Array(8)

// local store of game data
let playerX = {
  id: 1,
  email: 'matt@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
}
let playerO = {
  id: 2,
  email: 'fake@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
}
let currentGame = {
  winner: '',
  loser: '',
  drawer: '',
  // only send below to API
  id: 1,
  cells: [], // should this be a 9 by 2 or 9 by 1 or 9 by 3
  over: false,
  player_x: {
    id: playerX.id,
    email: playerX.email
  },
  player_o: {
    id: playerO.id,
    email: playerO.email
  }
}

// below is what needs to be sent to API, not currently used
let games = [
  {
      id: 1,
      cells: ['o','x','o','x','o','x','o','x','o'],
      over: true,
      player_x: {
        id: 1,
        email: 'and@and.com'
      },
      player_o: {
        id: 3,
        email: 'dna@dna.com'
      }
    }
]

module.exports = {
  reset,
  play,
  grid,
  valx,
  valArray,
  playerX,
  playerO,
  currentGame,
  games
}
