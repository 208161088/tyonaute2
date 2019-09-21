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
const OrderHistory = ({ orders, ostoskoriFunction }) => (
  <div>
    <h2>{orders.length?'tilaushistoria':''}</h2>
    {orders.map((order, index) =>
      <div key={index}>
        <Item item={order.orderItem} ostoskoriFunction={ostoskoriFunction} index={index}/>
        <DateParser datestring={order.date}/>
      </div>
    )}
  </div>
)

export default OrderHistory