import React from 'react'
import {Link} from 'react-router-dom'
const item = ({item, buttonText, ostoskoriFunction, index}) => (
  <div className='item'>
    <div className='itemListButton' onClick={() => ostoskoriFunction(item._id, index)}>{buttonText ? buttonText : 'lisää ostoskoriin'}</div>
    <Link to={'/tuote/'+item._id} style={{textDecoration: 'none'}}>
      <div className='itemLink'>
        <img
        src={require('../../images/'+item.kuva+'.webp')}
        className={'itemImage'}
        alt=""
        />
        <div className='itemInformationText'>
        {' '+(item.hinta).toFixed(2)}€<br/>
        {' '+item.paino}g<br/>
        {' '+(item.hinta*1000/item.paino).toFixed(2)}€/kg
        </div>
        <div>{item.nimi}</div>
      </div>
    </Link>
  </div>
)

export default item