var preGame= require ('./Pregame/Pregame.js');
var game = require('./Game/Game.js');
var admin = require('./Admin/Admin')

const gameDataGenerator = require('./GameData/gameData.js')
const e = require('cors');
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
let gameData = gameDataGenerator.gameDataGenerator();


let namesArray = [];
let playersArray = [];
let gameStage = "preGame"
let forbiddenNames=["admin", "allPlayers"];
io.setMaxListeners(100);
function reconnect(name) {
  
  for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
      if(gameData.allFullInfoPlayers[i].name === name) return true;
  }
  return false;
}
gameData.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function removeName(name) {
  if(gameData.namesArray.includes(name)) {
    for( var i = 0; i < gameData.namesArray.length; i++){                
      if ( gameData.namesArray[i] === name) { 
          gameData.namesArray.splice(i, 1);
          gameData.idsArray.splice(i, 1);
          i--; 
      }
    }
  }
} 
function removeDisconnectedName(name) {
  if(gameData.disconnectedPlayers.includes(name)) {
    for( var i = 0; i < gameData.disconnectedPlayers.length; i++){                
      if ( gameData.disconnectedPlayers[i] === name) { 
          gameData.disconnectedPlayers.splice(i, 1);
          gameData.disconnectedPlayers.splice(i, 1);
          i--; 
      }
    }
  }
} 
function removePlayer(player) {
  for( var i = 0; i < gameData.playersArray.length; i++){                
      if ( gameData.playersArray[i].id === player) { 
          gameData.playersArray.splice(i,1);
          i--; 
      }
  }
}
io.on("connection", (socket) => {
  socket.join("everyone")
  console.log("connected", socket.id);
  if(gameStage === "preGame") {
    preGame.preGame(
      socket, 
      io, 
      removeName,
      gameData
    );
  }
  else {
    console.log("Reconnection Attempt")
    socket.on("isTaken",  (name, callback) => {
      callback({
        status: !gameData.disconnectedPlayers.includes(name)
      });
    });
    socket.once("enterName", (name, isAdmin) => {
      socket.join("allPlayers");
      socket.emit("Game started")
      socket.admin = false;
      socket.name = name;
      if(reconnect(name) && (isAdmin === false)) {
        
        console.log("RECONNECT")
        removeDisconnectedName(name);
        game.game(
          socket,
          io,
          gameData,
          reconnect
        )    
      }
    })
  }
  socket.once("Game loaded", () => {
    io.off("reconnection", () => {})
    gameStage = "game";
    io.to("allPlayers").emit("All players", gameData.playersArray);
    io.to("admin").emit("Full Players Info", gameData.allFullInfoPlayers, gameData.namesArray);
    if(socket.admin === false) {
      game.game(
        socket,
        io,
        gameData,
        reconnect
      )      
    }
    else {
      admin.admin(
        socket,
        io,
        gameData
      )
    }
      
  })
  socket.once("disconnect", (reason) => {
    if(gameStage === "preGame") {
      removeName(socket.name);
      console.log("disconnected and removed name"+socket.name);     
    }
    if(gameStage === "game") {
      gameData.disconnectedPlayers.push(socket.name)
    }
    io.to("allPlayers").emit("Player names", namesArray);
    io.to("admin").emit("Player names", namesArray);
  });
})
httpServer.listen(8080);