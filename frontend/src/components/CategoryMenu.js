import React from 'react'
import {Link} from 'react-router-dom'
const CategoryMenu = () => {
  return(
    <div>
      <Link to="/kauppa/lihat">lihat</Link> &nbsp;
      <Link to="/kauppa/kasvikset">kasvikset</Link> &nbsp;
      <Link to="/kauppa/leivät">leivät</Link> &nbsp;
      <Link to="/kauppa/hedelmät">hedelmät</Link> &nbsp;
      <Link to="/kauppa/maitotuotteet">maitotuotteet</Link> &nbsp;
      <Link to="/kauppa/muut">muut</Link> &nbsp;
      <Link to="/kauppa">kaikki</Link>
    </div>
  )
}
export default CategoryMenu