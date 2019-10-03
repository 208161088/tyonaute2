import React from 'react'
const ChangePasswordForm = ({ onSubmit, handleChange, oldPassword, newPassword }) => {
    return (
      <div>
        <h3>Vaihda salasana</h3>
        <form onSubmit={onSubmit}>
          <div>
            nykyinen salasana
          </div>
            <input className='passwordInput'
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
            />
          
          <div>
            uusi salasana
          </div>
            <input className='passwordInput'
              name="password"
              value={newPassword}
              onChange={handleChange}
            />
          
          <button type="submit">valmis</button>
        </form>
      </div>
    )
  }
export default ChangePasswordForm