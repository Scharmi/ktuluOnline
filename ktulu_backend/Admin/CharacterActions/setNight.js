exports.setNight = function(socket, io, gameData) {  
    gameData.dayTime = "night";
    io.to("everyone").emit("setTime", gameData.dayNumber, gameData.dayTime)
    gameData.drunk = []; 
    gameData.prison = "";
    gameData.alertHanging = false;
    gameData.drunkPlayer = "";
    gameData.szuler = "";
    gameData.usedDuels = 0;
    gameData.votedPlayers = [];
    gameData.inspected = [];
    io.sendData("everyone", "prison", "");
    io.sendData("everyone", "drunk", "");
    io.sendData("everyone", "szulered", "");
    io.to("admin").emit("end", gameData.stageName)
}