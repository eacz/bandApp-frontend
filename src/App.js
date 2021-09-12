import SocketProvider from "./context/SocketContext";
import BandsView from "./views/BandsView";

function App() {
  return (
    <SocketProvider>
      <BandsView />
    </SocketProvider>
  )
  
}

export default App;
