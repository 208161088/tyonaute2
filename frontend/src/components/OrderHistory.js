import React from 'react'
import Item from './Item'
const DateParser = ({datestring}) => {
  const date = new Date(datestring)
  const currentDate = Date.now()
  const arrived = currentDate>date.getTime()+30000 ? 'saapunut' : 'ei saapunut'
  return(
    <div>
      {date.toLocaleString('en-GB')}
      <br/>
      {arrived}
    </div>
  )
}
const OrderHistory = ({ orders }) => {
  return(
    <div>
      <h2>tilaushistoria</h2>
      {orders.map((order, index) =>
        <div key={index}>
          <Item item={order.orderItem}/>
          <DateParser datestring={order.date}/>
          <br/>
        </div>
      )}
    </div>
  )
}
export default OrderHistory