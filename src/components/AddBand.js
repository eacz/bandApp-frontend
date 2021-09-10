import React, { useState } from 'react'

const AddBand = ({createBand}) => {
  
  const [newBand, setNewBand] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if(newBand.trim().length > 0){
      createBand(newBand)
      setNewBand('')
    }
  }
  return (
   <>
     <h3>Add Bands</h3>
     <form onSubmit={onSubmit}>
       <input 
        value={newBand} onChange={e => setNewBand(e.target.value)}
        type="text" placeholder="new band name" className="form-control" 
       />
     </form>
   </>
  )
}

export default AddBand
