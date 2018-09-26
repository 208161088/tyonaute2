import React from 'react'
import ItemList from './ItemList'
const Category = ({items, category}) => {
  const categoryItems = items.filter(item => item.kategoria === category)
  return(
    <div>
      <ItemList items={categoryItems} title={category}/>
    </div>
  )
}
export default Category