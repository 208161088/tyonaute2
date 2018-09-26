import React from 'react'
import OrderHistory from './OrderHistory'
import Togglable from './Togglable'
import ChangeInformationForm from './ChangeInformationForm'
import ChangePasswordForm from './ChangePasswordForm'
const User = ({ user, address, password, handleChange, onInformationSubmit, onPasswordSubmit, logout, changeAppState, notification, deleteUser, history }) => {
  if (user){
    const changeInformationFormSubmit = (event) => {
      this.changeInformationForm.toggleVisibility()
      onInformationSubmit(event, address)
    }
    const changeInformationForm = () => (
      <Togglable buttonLabel="muokkaa tietoja" changeAppState={changeAppState} user={user} ref={component => this.changeInformationForm = component}>
        <ChangeInformationForm
          address={address}
          handleChange={handleChange}
          onSubmit={changeInformationFormSubmit}
        />
      </Togglable>
    )

    const changePasswordFormSubmit = (event) => {
      this.changePasswordForm.toggleVisibility()
      onPasswordSubmit(event)
    }
    const changePasswordForm = () => (
      <Togglable buttonLabel="vaihda salasana" ref={component => this.changePasswordForm = component}>
        <ChangePasswordForm
          password={password}
          handleChange={handleChange}
          onSubmit={changePasswordFormSubmit}
        />
      </Togglable>
    )

    return(
      <div>
      <h2>{user.username}</h2>
      <br/>
      osoite: {user.address}
      {changeInformationForm()}
      {changePasswordForm()}

      
      <button onClick={()=>logout(history)}>kirjaudu ulos</button>
      <button onClick={()=>deleteUser(history)}>poista käyttäjätunnus</button>
      <div>{notification}</div>
      <OrderHistory orders={user.orderHistory} />
    </div>
    )
  }else{
    return(
      null
    )
  }
}
export default User
