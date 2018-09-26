import React from 'react'
import Img from 'react-image'
const OneItem = ({ item, lisaaOstoskoriin}) => {
  return(
    <div>
    <h2>{item.nimi}</h2>
    <Img
    src={require('../../images/'+item.kuva+'.jpg')}
    height="200"
    />
    <div>{'hinta: '+(item.hinta).toFixed(2)}€</div>
    <div>{'paino: '+item.paino}g</div>
    <div>{'kilohinta '+(item.hinta*1000/item.paino).toFixed(2)}€/kg</div>
    <button onClick={() => lisaaOstoskoriin(item)}>lisää ostoskoriin</button>
    <p>{item.kuvaus}</p>
    </div>
  )
}
export default OneItem