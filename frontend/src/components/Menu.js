import React from 'react'
import {Link} from 'react-router-dom'
const Menu = ({user, ostoskori, resetNotification}) => {
  const linkMaker = (path, content) => (
    <Link to={path} className='categoryLink' onClick={resetNotification}>{content}</Link>
  )
  
  const linkToUser = user ? linkMaker('/käyttäjä', user.username) : linkMaker('/kirjaudu', 'kirjaudu/rekisteröidy')
  return(
    <div>
      {linkMaker('/kauppa', 'kauppa')}
      {ostoskori ? linkMaker('/ostoskori', 'ostoskori') : null}
      {linkToUser}
    </div>
  )
}

export default Menu