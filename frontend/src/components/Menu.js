import React from 'react'
import {Link} from 'react-router-dom'
const Menu = ({user, resetNotification}) => {
  const linkMaker = (path, content) => (
    <Link to={path} onClick={resetNotification}>{content}</Link>
  )
  
  const linkToUser = user ? linkMaker('/käyttäjä', user.username) : linkMaker('/kirjaudu', 'kirjaudu/rekisteröidy')
  return(
    <div>
      {linkMaker('/kauppa', 'kauppa')} &nbsp;
      {linkMaker('/ostoskori', 'ostoskori')} &nbsp;
      {linkToUser}
    </div>
  )
}

export default Menu