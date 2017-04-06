'use strict'

const store = require('../store')

const signUpSuccess = (data) => {
  console.log(data)
}

const signUpFailure = (error) => {
  console.error(error)
}

const signInSuccess = (data) => {
  console.log('sign in success: ', data)
  store.user = data.user
}

const signInFailure = (error) => {
  console.error('sign in error is: ', error)
}

const signOutSuccess = () => {
  console.log('sign onSignOut success')
  store.user = null
  console.log('store is null: ' + store.user)
}

const signOutFailure = (error) => {
  console.error('sign out error is: ', error)
}

const changePasswordSuccess = (data) => {
  console.log('changePasswordSuccess success')
  console.log(data)
}

const changePasswordFailure = (error) => {
  console.error('changePasswordFailure error is: ', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
