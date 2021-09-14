exports.preGame = function(socket, io, removeName, gameData) {
    function shuffle(array) {
        var result = [], source = array.concat([]);
        while (source.length) {
          let index = Math.floor(Math.random() * source.length);
          result.push(source.splice(index, 1)[0]);
        }
        return result;
      }
    socket.on("isTaken",  (arg1, callback) => {
        callback({
          status: (gameData.namesArray.includes(arg1) || (arg1.length >= 32))
        });
      });
      socket.once("enterName", (arg, isAdmin, password) => {
          if(gameData.hash(password) !== 3174880) isAdmin = false;
          if(arg.length < 32) {
            if(isAdmin === false) {
              socket.admin = false;
              socket.join("allPlayers")
              gameData.namesArray.push(arg);
              gameData.idsArray.push(socket.id);
              socket.name = arg;
              console.log(gameData.namesArray, socket.id);
              io.to("allPlayers").emit("Player names", gameData.namesArray);
              io.to("admin").emit("Player names", gameData.namesArray);
            }
            else {                    
                socket.join("admin");
                socket.admin = true;
                socket.once("GAME OVER", () => {
                  console.log("GAME OVER")
                  io.removeAllListeners()
                  io.close();
                  process.exit();
                })
                socket.name = arg;
                io.to("admin").emit("Player names", gameData.namesArray);        
                socket.on("Game start", () => {
                  io.to("admin").emit("Choose characters", gameData.namesArray.length, gameData.characters);
                  socket.on("gameProps", (duels, bandits, inspections) => {
                    console.log("GOT GAME PROPS");
                    gameData.duelsLimit = parseInt(duels);
                    gameData.banditsWin = parseInt(bandits);
                    gameData.inspectedNumber = parseInt(inspections)
                  })
                  socket.on("Chosen characters", (chosenCharactersRecieved) => {
                      let newArr = shuffle(chosenCharactersRecieved);
                      newArr = shuffle(newArr);
                      newArr = shuffle(newArr);
                      for(let i = 0; i < chosenCharactersRecieved.length; i++) {
                          gameData.chosenCharacters.push(newArr[i]);
                      }
                      gameData.gameStage = "game"
                      io.to("admin").emit("Game started");
                      io.to("allPlayers").emit("Game started")
                  })
  
                })
            }
          }


      });

}

exports.preGame