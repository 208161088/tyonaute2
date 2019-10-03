import React from 'react'
import Item from './Item'
const DateParser = ({datestring}) => {
  const date = new Date(datestring)
  const currentDate = Date.now()
  const arrived = currentDate > date.getTime()+30000 ? 'saapunut' : 'ei saapunut'
  return(
    <div style={{marginBottom: '10px'}}>
      tilattu: {date.toLocaleString('en-GB')}
      <br/>
      {arrived}
    </div>
  )
}
const OrderHistory = ({ orders, lisaaOstoskoriin }) => (
  <div>
    <h2>{orders.length?'tilaushistoria':''}</h2>
    {orders.map((order) =>
      <div key={order._id}>
        <Item item={order.orderItem} ostoskoriFunction={lisaaOstoskoriin}/>
        <DateParser datestring={order.date}/>
      </div>
    ).reverse()}
  </div>
)

export default OrderHistory