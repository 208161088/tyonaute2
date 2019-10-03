import React from 'react'
import ItemList from './ItemList'
const Category = ({items, category, lisaaOstoskoriin}) => {
  const categoryItems = items.filter(item => item.kategoria === category)
  return(
    <div>
      <ItemList items={categoryItems} title={category} lisaaOstoskoriin={lisaaOstoskoriin}/>
    </div>
  )
}
export default Category