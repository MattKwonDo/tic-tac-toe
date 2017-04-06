'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  // test if working console.log('sign in function worked, bro')
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  // test if working console.log('sign in function worked, bro')
  event.preventDefault()
  // console.log('sign out ran ')
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const byId = function (e) {
  return document.getElementById(e)
}

const onClick = function (event) {
  const data = getFormFields(this)
  console.log('ayo222')
  console.log($('#test1')) // change this to 'event' instead of test1???
  console.log(data)
  $(this).css('background-color', '#5e91fe')
  // $(this).css('border-color', '#5e91fe')
  // $(this).html('img', src='images/questionBlock128.png')

  // console.log(document.getElementById($('#test1')))
  // return document.getElementById($('#test1')).src
  // = "images/questionBlock128.png"
  // const tgt = $('#test1')
  // const tmp = tgt.src
  // tgt.src = tgt.getAttribute('src2')
  // tgt.setAttribute('src2', tmp)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  // $('#test1').on('click', onClick)
  // $('#test2').on('click', onClick)
  // $('#test3').on('click', onClick)
  // $('#test4').on('click', onClick)
  // $('#test5').on('click', onClick)
  // $('#test6').on('click', onClick)
  // $('#test7').on('click', onClick)
  // $('#test8').on('click', onClick)
  // $('#test9').on('click', onClick)
  $('#1').on('click', onClick)
  $('#2').on('click', onClick)
  $('#3').on('click', onClick)
  $('#4').on('click', onClick)
  $('#5').on('click', onClick)
  $('#6').on('click', onClick)
  $('#7').on('click', onClick)
  $('#8').on('click', onClick)
  $('#9').on('click', onClick)
}

module.exports = {
  addHandlers
}
