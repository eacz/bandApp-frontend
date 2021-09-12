import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import AddBand from '../components/AddBand'
import ListBand from '../components/ListBand'

const BandsView = () => {

  const [bands, setBands] = useState([])
  const {socket, online} = useContext(SocketContext)
  
  useEffect(() => {
    socket.on('current-bands', data => {
      setBands(data)
    })
  }, [socket])
  
  const vote = (id) => {
    socket.emit('vote-band', id)
  }

  const deleteBand = (id) => {
    socket.emit('delete-band', id)
  }

  const changeBandName = (id, name) => {
    socket.emit('change-band-name', {id, name})
  }


  return (
    <div className="container" >
    
    <div className="alert">
      <p> 
        Service Status: 
        { online 
          ? <span className="text-success"> Online</span> 
          : <span className="text-danger"> Offline</span> 
        }
      </p>
    </div>
  
    <h1>BandNames</h1>
    <hr />

    <div className="row">
      <div className="col-8">
        <ListBand data={bands} vote={vote} deleteBand={deleteBand} changeBandName={changeBandName} /> 
      </div>
      <div className="col-4">
        <AddBand />
      </div>
    </div>
  </div>
  );
}

export default BandsView
