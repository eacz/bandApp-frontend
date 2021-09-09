import React, { useEffect, useState } from 'react'

const ListBand = ({data}) => {

  const [bands, setBands] = useState(data)

  useEffect(() => {
    setBands(data)
  }, [data])

  const handleNameChange = (e, id) => {
    setBands(bands.map(band => {
      if(band.id === id){
        band.name = e.target.value //e.target.value contains the new name
      }
      return band
    }))
  }

  const handleOnBlurName = (id, name) => {
    console.log(id);
    console.log(name);
    //here will be emitted the edit socket event
  }
  
  const createRows = () => {
    return (
      bands.map(band => (
        <tr key={band.id}>
        <td>
          <button className="btn btn-primary">+1</button>
        </td>
        <td>
          <input 
          value={band.name} type="text" className="form-control" 
            onChange={(e) => handleNameChange(e, band.id)} 
            onBlur={() => handleOnBlurName(band.id, band.name)}
          />
        </td>
        <td><h3>{band.votes}</h3></td>
        <td><button className="btn btn-danger">Delete</button></td>
      </tr>
      ))
      
    )
  }

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
         {createRows()}
        </tbody>
      </table>
    </>
  )
}

export default ListBand
