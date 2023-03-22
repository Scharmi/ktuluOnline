const { transmitter } = require("./PlayerActions/transmitter")
exports.game = function(socket, io, gameData) {
    socket.basicData = new Object();
    socket.basicData.name = socket.name
    socket.basicData.id = gameData.namesArray.indexOf(socket.name);
    socket.basicData.isAlive = true;
    if(!socket.reconnect)
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
    if(!socket.reconnect)
    gameData.allFullInfoPlayers.push(socket.myData)
    io.sendData(socket.myData.id, "myData", socket.myData);
    io.sendData(socket.myData.id, "prison", gameData.prison);
    io.sendData("everyone", "allPlayers", gameData.playersArray);
    io.sendData("admin", "fullInfoPlayers", gameData.allFullInfoPlayers);
    io.to("admin").emit("Full Players Info", gameData.allFullInfoPlayers, gameData.namesArray);
    transmitter(socket, io, gameData);
}