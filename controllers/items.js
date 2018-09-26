const itemsRouter = require('express').Router()
const Item = require('../models/item')

itemsRouter.get('/', async (request, response) => {
  const items = await Item.find({})
  response.json(items)
})

/*
itemsRouter.post('/', async (request, response) => {
  const body = request.body
  const item = new Item({
    nimi: body.nimi,
    kuva: body.kuva,
    hinta: body.hinta,
    paino: body.paino,
    kuvaus: body.kuvaus,
    kategoria: body.kategoria
  })
  const savedItem = await item.save()
  response.json(savedItem)
})

itemsRouter.delete('/:id', async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
*/
module.exports = itemsRouter