import { useState } from "react";
import io from "socket.io-client";
import AddBand from "./components/AddBand";
import ListBand from "./components/ListBand";

const connectSocketServer = () => {
  const socket = io('http://localhost:4000')
}

function App() {
  const [socket] = useState(null)
  const [online, setOnline] = useState(false)

  
  return (
    <div className="container" >
    
    <div className="alert">
      <p> 
        Service Status: 
        <span className="text-success"> Online</span>  
        <span className="text-danger"> Offline</span>  
      </p>
    </div>
  
    <h1>BandNames</h1>
    <hr />

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

export default App;
