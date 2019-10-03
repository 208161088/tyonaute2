const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const checkToken = (request) => {
  try{
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    return decodedToken
  } catch (exception) {
    return null
  }
}
usersRouter.post('/', async (request, response) => {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(409).send({ error: 'username must be unique' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
      address: body.address
    })

    const savedUser = await user.save()
    
    const userForToken = {
      username: savedUser.username,
      id: savedUser._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({ token, username: savedUser.username, address: savedUser.address, orderHistory: [] })
})

usersRouter.put('/information', async (request, response) => {
  const decodedToken = checkToken(request)
  if(!decodedToken){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  const user = {
    address: body.address
  }

  await User.findByIdAndUpdate(decodedToken.id, user)
  response.status(204).end()
})

usersRouter.put('/password', async (request, response) => {
  const decodedToken = checkToken(request)
  if(!decodedToken){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body
  const user = await User.findOne({ username: body.username })
  const oldPasswordCorrect = user === null
  ? false
  : await bcrypt.compare(body.oldPassword, user.passwordHash)

  if (!(user && oldPasswordCorrect)) {
    return response.status(401).send({ error: 'invalid current password' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const newUser = {
    passwordHash
  }
  await User.findByIdAndUpdate(decodedToken.id, newUser)
  response.status(204).end()
})

usersRouter.put('/order', async (request, response) => {
  const decodedToken = checkToken(request)
  if(!decodedToken){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  updatedUser = await User.findByIdAndUpdate(decodedToken.id, {orderHistory: body.orderHistory},  { new: true }).populate('orderHistory.orderItem')

  response.json(updatedUser.orderHistory)
})

usersRouter.delete('/delete', async (request, response) => {
  const decodedToken = checkToken(request)
  if(!decodedToken){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  await User.findByIdAndRemove(decodedToken.id)
  response.status(204).end()
})

module.exports = usersRouter
