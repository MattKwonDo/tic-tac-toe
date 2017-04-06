'use strict'

const onSuccess = function (data) {
  if (!data) {
    console.warn('Either you deleted something, or something went wrong.')
  } else if (data.game) {
    console.log(data.game)
  } else {
    console.table(data.games)
  }
}

const onNoContentSuccess = function () {
  console.log('Your request was successful bro!')
}

const onError = function (response) {
  console.error(response)
}

module.exports = {
  onSuccess,
  onNoContentSuccess,
  onError
}
