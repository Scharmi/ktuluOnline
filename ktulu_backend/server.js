function server() {
  var preGame= require ('./PreGame/PreGame.js');
  var game = require('./Game/Game.js');
  var admin = require('./Admin/Admin')
  const { reconnectDataSend } = require('./reconnect/reconnectDataSend')
  const gameDataGenerator = require('./GameData/gameData.js')
  const prod = true;
  const e = require('cors');
  const sslOptions = {};
  if(prod) {
    const fs = require("fs");
    sslOptions.key = fs.readFileSync("./cert/privkey.pem");
    sslOptions.cert = fs.readFileSync("./cert/fullchain.pem")
  }
  const httpServer = require(prod ? "https" : "http").createServer(sslOptions);
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  let gameData = gameDataGenerator.gameDataGenerator();
  let namesArray = [];

  io.setMaxListeners(500);
  function reconnect(name) {
    if(gameData.disconnectedPlayers.includes(name)) return true;
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
            i--; 
        }
      }
    }
  } 
  gameData.hash = function(arg) {
    var hash = 0, i, chr;
    if (arg.length === 0) return hash;
    for (i = 0; i < arg.length; i++) {
      chr   = arg.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };
  //hash: 3174880
  console.log(gameData.gameStage)
  io.sendData = ((reciever, type, object) => {
    /*console.log("Reciever: ", reciever);
    console.log("Type: ", type);
    console.log("Object: ",object);
    console.log("\n");*/
    io.to(reciever).emit("backendData", type, object);
  });
  io.on("connection", (socket) => {
    socket.reconnect = false;
    socket.join("everyone")
    console.log("connected", socket.id, io.engine.clientsCount);
    if(gameData.gameStage === "preGame") {
      preGame.preGame(
        socket, 
        io, 
        removeName,
        gameData
      );
    }
    else {
      console.log("Reconnection Attempt", gameData.gameStage, socket.id)
      socket.on("isTaken",  (name, password, isAdmin, callback) => {
        console.log("DISCONNECTED:", gameData.disconnectedPlayers)
        callback({
          status: !gameData.disconnectedPlayers.includes(name)
        });
      });
      socket.once("enterName", (name, isAdmin, password) => {
        if(gameData.hash(password) !== 3174880) isAdmin = false;
        if(name.length < 30) {
          
        }
        socket.name = name;
        if(reconnect(name)) {
          socket.reconnect = true;
          socket.admin = isAdmin;
          if(!isAdmin) {
            socket.join("allPlayers");
            socket.join("everyone");
            removeDisconnectedName(name);
            socket.emit("Game started")
          }
          else {
            socket.once("GAME OVER", () => {
              console.log("GAME OVER")
              io.removeAllListeners()
              io.close();
              process.exit();
            })
            socket.join("everyone");
            socket.join("admin");
            console.log("RECONNECT")
            removeDisconnectedName(name);
            socket.emit("Game started")
          }
        }
      })
    }
    socket.once("Game loaded", () => {
      console.log("GAME LOADED");
      if(socket.admin === false) {
        game.game(
          socket,
          io,
          gameData
        )
        if(socket.reconnect) reconnectDataSend(socket, io, gameData);
      }
      else {
        admin.admin(
          socket,
          io,
          gameData,
          server
        )
        if(socket.reconnect) reconnectDataSend(socket, io, gameData);
      }
        
    })
    socket.once("disconnect", (reason) => {
      delete socket;
      if(gameData.gameStage === "preGame") {
        removeName(socket.name); 
      }
      if(gameData.gameStage === "game") {
        gameData.disconnectedPlayers.push(socket.name)
      }
      io.to("everyone").emit("Player names", gameData.namesArray);
    });
  })
  process.on("uncaughtException", error => {
    console.log(error)
    httpServer.close()
    io.removeAllListeners()
    io.close();
    process.exit()
  })
  process.on('SIGINT', function() {
    console.log("SERVER CLOSED")
    httpServer.close()
    io.removeAllListeners();
    io.close();
    io.exit()
    process.exit();
  });
  httpServer.listen(8080);
}
server();
