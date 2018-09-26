import React from 'react'
const ChangePasswordForm = ({ onSubmit, handleChange, password }) => {
    return (
      <div>
        <h3>Vaihda salasana</h3>
        <form onSubmit={onSubmit}>
          <div>
            uusi salasana
            <input
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">valmis</button>
        </form>
      </div>
    )
  }
export default ChangePasswordForm