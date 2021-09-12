import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import ListBandItem from './ListBandItem'

const ListBand = () => {

  const [bands, setBands] = useState([])
  const {socket} = useContext(SocketContext)
 
  useEffect(() => {
    socket.on('current-bands', data => {
      setBands(data)
    })
    return () => socket.off('current-bands');
  }, [socket])

  const handleNameChange = (e, id) => {
    setBands(bands.map(band => {
      if(band.id === id){
        band.name = e.target.value //e.target.value contains the new name
      }
      return band
    }))
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
         { bands.map(band => <ListBandItem key={band.id} band={band} handleNameChange={handleNameChange} />) }
        </tbody>
      </table>
    </>
  )
}

export default ListBand
