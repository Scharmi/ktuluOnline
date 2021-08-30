import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from './Game/Game'
import { Paper } from '@material-ui/core'
import { PreGame } from './PreGame/PreGame'
import { AdminView } from './Game/AdminView'
import { io } from 'socket.io-client';
const socket = io("http://localhost:8080",{
  query: {
    name: '1242'
  }
});
function App() {
  const [gameState, setGameState] = useState("pregame")
  console.log("APP RENDER", gameState)
    if(gameState === "pregame")
    return (
      <div className="App">
        <Paper elevation={4}>
          <PreGame setGameState={setGameState} socket={socket} gameState={gameState}/>
        </Paper>
        
      </div>
    )
    if(gameState === "game") {
      return (
        <div className="App">
          <Paper elevation={4}>
            <Game socket={socket}></Game>
          </Paper>
        </div>
      );
    }

    if(gameState === "adminPanel")
    return (
      <div className="App">
        <AdminView adminGameState="started" socket={socket}/>
      </div>
    )
    return <div></div>
  }

  


export default App;
