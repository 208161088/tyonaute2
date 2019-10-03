import React from 'react'
import Item from './Item'
const ItemList = ({ items, title, lisaaOstoskoriin }) => (
  <div>
    <h2>{title}</h2>
    {items.map((item) => (
      <Item key={item._id} item={item} ostoskoriFunction={lisaaOstoskoriin}/>
    )
    )}
  </div>
)
export default ItemList