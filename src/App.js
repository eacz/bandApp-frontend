import { useEffect, useState } from "react";
import AddBand from "./components/AddBand";
import ListBand from "./components/ListBand";
import useSocket from "./hooks/useSocket";



function App() {
  const [bands, setBands] = useState([])

  const { online, socket } = useSocket('http://localhost:4000')


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

  const createBand = (name) => {
    socket.emit('create-band', { name })
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
        <AddBand  createBand={createBand} />
      </div>
    </div>
  </div>
  );
}

export default App;
