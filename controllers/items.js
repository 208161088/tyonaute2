const itemsRouter = require('express').Router()
const Item = require('../models/item')

itemsRouter.get('/', async (request, response) => {
  const items = await Item.find({})
  response.json(items)
})

module.exports = itemsRouter