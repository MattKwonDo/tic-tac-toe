'use strict'

const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data: data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out' + '/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password' + '/' + store.user.id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}

// const signUp = (data) =>
//   new Promise(function (resolve, reject) {
//     if (Math.random() > 0.5) {
//       resolve('in signUp')
//     } else {
//       const error = new Error('Random')
//       error.data = data
//       reject(error)
//     }
//   })
