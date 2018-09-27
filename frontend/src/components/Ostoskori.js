import React from 'react'
import Item from './Item'
const Ostoskori = ({ ostoskori, poistaOstoskorista, tilaa, history, notification}) => {
  let totalPrice=0
  return(
    <div>
      <h2>Ostoskori</h2>
      {ostoskori.map((item, index) => {
        totalPrice += item.hinta
        return(
          <div key={index} className='itemList'>
            <Item item={item}/>
            <button onClick={() => poistaOstoskorista(index)}>poista</button>
          </div>
        )
      })}
      <br/>
      yhteensä: {totalPrice.toFixed(2)}€<br/>
      <button onClick={() => tilaa(history)}>tilaa</button>
      <div>{notification}</div>
    </div>
  )
}
export default Ostoskori