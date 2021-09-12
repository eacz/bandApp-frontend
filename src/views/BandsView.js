import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import AddBand from '../components/AddBand'
import ListBand from '../components/ListBand'
import ChartBand from '../components/ChartBand'

const BandsView = () => {
  
  const { online} = useContext(SocketContext)

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
      <div className="col">
        <ChartBand />
      </div>
    </div>

    <div className="row">
      <div className="col-8">
        <ListBand />
      </div>
      <div className="col-4">
        <AddBand />
      </div>
    </div>
  </div>
  );
}

export default BandsView
