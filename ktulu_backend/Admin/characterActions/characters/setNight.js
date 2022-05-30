exports.setNight = function(socket, io, gameData) {  
    gameData.dayTime = "night";
    io.sendData("everyone", "setTime", {dayNumber: gameData.dayNumber, dayTime: gameData.dayTime});
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