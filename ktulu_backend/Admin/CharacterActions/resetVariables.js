exports.resetVariables = function(socket, io, gameData) {  
    gameData.drunk = []; 
    gameData.prison = "";
    gameData.drunkPlayer = "";
    gameData.szuler = "";
    gameData.usedDuels = 0;
    gameData.votedPlayers = [];
    gameData.inspected = [];
    io.to("everyone").emit("prison", "")
    io.to("everyone").emit("drunk", "")
    io.to("everyone").emit("szulered", "")
}