const mongoose = require('mongoose')

const Item = mongoose.model('Item', {
  nimi: String,
  kuva: String,
  hinta: Number,
  paino: Number,
  kuvaus: String,
  kategoria: String
})
module.exports = Item