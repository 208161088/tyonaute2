import React from 'react'
import {Link} from 'react-router-dom'
const item = ({item}) => (
  <Link to={'/tuote/'+item._id} className='itemLink'>
    <div className='item'>
      <img
      src={require('../../images/'+item.kuva+'.jpg')}
      height="100"
	  alt=""
      />
      <div>
      {item.nimi}
      {' '+(item.hinta).toFixed(2)}€
      {' '+item.paino}g
      {' '+(item.hinta*1000/item.paino).toFixed(2)}€/kg
      </div>
    </div>
  </Link>
)

export default item