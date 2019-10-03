import React from 'react'
const OneItem = ({ item, lisaaOstoskoriin}) => {
  return(
    <div>
      <h2>{item.nimi}</h2>
      <img
        src={require('../../images/'+item.kuva+'.webp')}
        className={'oneItemImage'}
        alt=""
      />
      <div>{'hinta: '+(item.hinta).toFixed(2)}€</div>
      <div>{'paino: '+item.paino}g</div>
      <div>{'kilohinta '+(item.hinta*1000/item.paino).toFixed(2)}€/kg</div>
      <button className='oneItemButton' onClick={() => lisaaOstoskoriin(item._id)}>lisää ostoskoriin</button>
      <p>{item.kuvaus}</p>
    </div>
  )
}
export default OneItem