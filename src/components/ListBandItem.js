import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"

const ListBandItem = ({band, handleNameChange}) => {

  const {socket} = useContext(SocketContext)

  const handleOnBlurName = (id, name) => {
     socket.emit('change-band-name', {id, name})
  }

  const deleteBand = (id) => {
    socket.emit('delete-band', id)
  }

  const vote = (id) => {
    socket.emit('vote-band', id)
  }

  return (
    <tr>
      <td>
        <button onClick={() => vote(band.id)} className="btn btn-primary">+1</button>
      </td>
      <td>
        <input 
        value={band.name} type="text" className="form-control" 
          onChange={(e) => handleNameChange(e, band.id)} 
          onBlur={() => handleOnBlurName(band.id, band.name)}
        />
      </td>
      <td><h3>{band.votes}</h3></td>
      <td><button onClick={() => deleteBand(band.id)} className="btn btn-danger">Delete</button></td>
    </tr>
  )
}

export default ListBandItem
