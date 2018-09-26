
import React from 'react'
const ChangeInformationForm = ({address, handleChange, onSubmit }) => {
    return (
      <div>
        <h3>muokkaa tietoja</h3>
        <form onSubmit={onSubmit}>
          <div>
            osoite
            <input
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>
          <button type="submit">valmis</button>
        </form>
      </div>
    )

  }
export default ChangeInformationForm