import {  createContext } from "react";
import useSocket from "../hooks/useSocket";

export const SocketContext = createContext()


const SocketProvider = ({children}) => {

  const { online, socket } = useSocket('http://localhost:4000')

  return (
    <SocketContext.Provider
      value={{ online, socket }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
