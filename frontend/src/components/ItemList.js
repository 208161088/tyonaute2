import React from 'react'
import Item from './Item'
const ItemList = ({ items, title }) => (
  
  <div>
    <h2>{title}</h2>
    {items.map(item =>
      <div key={item._id} className='itemList'>
        <Item item={item}/>
      </div>
    )}
  </div>
)
export default ItemList