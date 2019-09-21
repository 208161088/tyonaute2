import React from 'react'
import {Link} from 'react-router-dom'

const CategoryLink = ({text}) => (
  <Link to={"/kauppa/" + text} className='categoryLink'>{text}</Link>
)


const CategoryMenu = () => {
  return(
    <div>
      <CategoryLink text="lihat"/>
      <CategoryLink text='kasvikset'/>
      <CategoryLink text='leivät'/>
      <CategoryLink text='hedelmät'/>
      <CategoryLink text='maitotuotteet'/>
      <CategoryLink text='muut'/>
      <Link to="/kauppa" className='categoryLink'>kaikki</Link>
    </div>
  )
}
export default CategoryMenu