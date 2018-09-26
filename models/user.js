const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  date: Date
})

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  address: String,
  orderHistory: [orderSchema]
})

userSchema.statics.format = (user) => {
  return {
    _id: user._id,
    username: user.username,
    address: user.address,
    orderHistory: user.orderHistory
  }
}

const Order = mongoose.model('Order', orderSchema)
const User = mongoose.model('User', userSchema)

module.exports = Order
module.exports = User