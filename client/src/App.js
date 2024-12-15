import "./App.css";
import Instruction from "./component/Instruction/Instruction";
import Frog from "./component/Frog/Frog";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

export default function App() {
  return (
      <>
        <Instruction/>
        <Frog/>
      </>
  )
}