import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const AddBand = () => {
  
  const [newBand, setNewBand] = useState('');
  const { socket } = useContext(SocketContext)
  const onSubmit = (e) => {
    e.preventDefault()
    if(newBand.trim().length > 0){
      socket.emit('create-band', { name: newBand })
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
