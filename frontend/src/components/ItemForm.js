import React from 'react'
const ItemForm = ({ onSubmit, handleChange, value1, value2, value3, value4, value5, value6}) => {
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onSubmit}>
          <div>
            nimi
            <input
              name="newItemNimi"
              value={value1}
              onChange={handleChange}
            />
          </div>
          <div>
            kuva
            <input
              name="newItemKuva"
              value={value2}
              onChange={handleChange}
            />
          </div>
          <div>
            hinta
            <input
              name="newItemHinta"
              value={value3}
              onChange={handleChange}
            />
          </div>
          <div>
            paino
            <input
              name="newItemPaino"
              value={value4}
              onChange={handleChange}
            />
          </div>
          <div>
            kuvaus
            <input
              name="newItemKuvaus"
              value={value5}
              onChange={handleChange}
            />
          </div>
          <div>
            kategoria
            <input
              name="newItemKategoria"
              value={value6}
              onChange={handleChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
export default ItemForm