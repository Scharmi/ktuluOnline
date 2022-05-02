exports.resetVariables = function(socket, io, gameData) {  
    gameData.drunk = []; 
    gameData.prison = "";
    gameData.drunkPlayer = "";
    gameData.szuler = "";
    gameData.usedDuels = 0;
    gameData.votedPlayers = [];
    gameData.inspected = [];
    io.sendData("everyone", "prison", "");
    io.sendData("everyone", "szulered", "");
    io.sendData("everyone", "drunk", "");
}