const { transmitter } = require("./PlayerActions/transmitter")
exports.game = function(socket, io, gameData, reconnect) {

    function removePlayer(player) {
        for( var i = 0; i < gameData.playersArray.length; i++){                
            if ( playersArray[i].id === player) { 
                playersArray.splice(i,1);
                i--; 
            }
        }
        for( var i = 0; i < gameData.allFullInfoPlayers.length; i++){                
            if ( allFullInfoPlayers[i].id === player) { 
                allFullInfoPlayers.splice(i,1);
                i--; 
            }
        }
    }
    function removeCharacter(id) {
        console.log("remove", gameData.chosenCharacters)
        for( var i = 0; i < gameData.chosenCharacters.length; i++){                
            if ( gameData.chosenCharacters[i].id === id) { 
                gameData.chosenCharacters.splice(i,1);
                i--; 
            }
        }
    }
    socket.basicData = new Object();
    socket.basicData.name = socket.name
    socket.basicData.id = gameData.namesArray.indexOf(socket.name);
    socket.basicData.isAlive = true;
    if(!reconnect(socket.name))
    gameData.playersArray.push(socket.basicData);
    socket.myData = new Object();
    socket.myData.name = socket.name;
    socket.myData.id = socket.basicData.id;
    socket.myData.isAlive = true;   
    socket.myData.characterId = gameData.chosenCharacters[socket.myData.id].id;
    socket.myData.characterName = gameData.chosenCharacters[socket.myData.id].text;
    socket.myData.team = gameData.team(socket.myData.characterId);
    socket.join(socket.myData.id);
    socket.join(socket.myData.characterName);
    socket.join(socket.myData.team);
    io.to("admin").emit("reconnection", socket.name);
    if(!reconnect(socket.name))
    gameData.allFullInfoPlayers.push(socket.myData)
    io.to(socket.myData.id).emit("Player data", socket.myData)
    io.to(socket.myData.id).emit("prison", gameData.prison)
    io.to("allPlayers").emit("All players", gameData.playersArray);
    io.to("admin").emit("Full Players Info", gameData.allFullInfoPlayers, gameData.namesArray);
    transmitter(socket, io, gameData);

}