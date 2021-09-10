import { useEffect, useState } from "react";
import io from "socket.io-client";
import AddBand from "./components/AddBand";
import ListBand from "./components/ListBand";

const connectSocketServer = () => {
  const socket = io('http://localhost:4000', { transports: [ 'websocket'] })
  return socket
}

function App() {
  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false)
  const [bands, setBands] = useState([])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
     //return socket.disconnect()
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])


  useEffect(() => {
    socket.on('current-bands', data => {
      setBands(data)
    })
  }, [socket])
  
  const vote = (id) => {
    console.log('voting ' + id);
    socket.emit('vote-band', id)
  }

  const deleteBand = (id) => {
    socket.emit('delete-band', id)
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
        <ListBand data={bands} vote={vote} deleteBand={deleteBand} /> 
      </div>
      <div className="col-4">
        <AddBand />
      </div>
    </div>
  </div>
  );
}

export default App;
