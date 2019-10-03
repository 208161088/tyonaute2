import React from 'react'
import Item from './Item'

const tilaaButton = (totalPrice, tilaa, history) => (
  <div>
    yhteensä: {totalPrice}€<br/>
    <button className='tilaaButton' onClick={() => tilaa(history)}>tilaa</button>
  </div>
)

const Ostoskori = ({ ostoskori, poistaOstoskorista, tilaa, history, notification}) => {
  const totalPrice = ostoskori.reduce((accumulator, item) => accumulator + item.hinta, 0).toFixed(2)
  return(
    <div>
      <h2>Ostoskori</h2>
      {ostoskori.length > 4 ? tilaaButton(totalPrice, tilaa, history) : null}
      {ostoskori.map((item, index) => {
        return(
          <div key={index} className='itemList'>
            <Item item={item} buttonText='poista ostoskorista' ostoskoriFunction={poistaOstoskorista} index={index}/>
          </div>
        )
      })}
      <br/>
      {tilaaButton(totalPrice, tilaa, history)}
      <div>{notification}</div>
    </div>
  )
}
export default Ostoskori