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
    io.to("everyone").emit("prison", "");
    io.to("everyone").emit("drunk", "");
    io.to("everyone").emit("szulered", "");
    io.to("admin").emit("end", gameData.stageName)
}