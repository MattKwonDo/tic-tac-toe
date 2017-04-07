'use strict'

const reset = function () {
  $('.game-update').css('background-color', '#5e91fe').text('')
  $('.image1').show('slow')
}

let playerX = {
  id: 1,
  email: 'matt@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
  // ,   game_history: [] // push id, outcome
}
let playerO = {
  id: 2,
  email: 'fake@m.com',
  games_won: 0,
  games_lost: 0,
  games_drawn: 0
  // ,   game_history: [] // push id, outcome
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

// below is what needs to be sent to API
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

// define number of plays and playerTurn to keep track of who should be playing
let play = 0
let playerTurn = 'playerX'

// define grid to store game state
let grid = [new Array(3),new Array(3),new Array(3)]
// function to check to see if someone has won and change game states and winner loser, drawer, and counts
// combine all of the below functions into one function, reset total to 0 after each for loop
// let overCheck = function {

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

grid = [[0, 0, 1],
        [1, 0, 1],
        [0, 1, 1]]

module.exports = {
  reset,
  play,
  currentGame
}
