import React from 'react'
import OrderHistory from './OrderHistory'
import Toggleable from './Toggleable'
import ChangeInformationForm from './ChangeInformationForm'
import ChangePasswordForm from './ChangePasswordForm'

const User = ({ user, address, oldPassword, newPassword, handleChange, onInformationSubmit, onPasswordSubmit, logout, changeAppState, notification, deleteUser, history, lisaaOstoskoriin }) => {
  if (user){
    let tog1
    let tog2
    const togref1 = instance => tog1 = instance
    const togref2 = instance => tog2 = instance
    
    const changeInformationFormSubmit = (event) => {
      tog1.toggleVisibility()
      onInformationSubmit(event, address)
    }

    const changePasswordFormSubmit = (event) => {
      tog2.toggleVisibility()
      onPasswordSubmit(event)
    }

    return(
      <div>
      <h2>{user.username}</h2>
      <br/>
      osoite: {user.address}
      <Toggleable buttonLabel="muokkaa tietoja" changeAppState={changeAppState} user={user} ref={togref1}>
        <ChangeInformationForm
          address={address}
          handleChange={handleChange}
          onSubmit={changeInformationFormSubmit}
        />
      </Toggleable>

      <Toggleable buttonLabel="vaihda salasana" ref={togref2}>
        <ChangePasswordForm
          oldPassword={oldPassword}
          newPassword={newPassword}
          handleChange={handleChange}
          onSubmit={changePasswordFormSubmit}
        />
      </Toggleable>

      
      <button onClick={()=>logout(history)}>kirjaudu ulos</button>
      <br/>
      <button onClick={()=>deleteUser(history)}>poista käyttäjätunnus</button>
      <div>{notification}</div>
      <OrderHistory orders={user.orderHistory} lisaaOstoskoriin={lisaaOstoskoriin}/>
    </div>
    )
  }else{
    return(
      null
    )
  }
}
export default User
