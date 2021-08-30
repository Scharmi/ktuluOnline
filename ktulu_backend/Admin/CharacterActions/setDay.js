exports.setDay = function(socket, io, gameData) {  
    gameData.dayNumber++;
    gameData.dayTime = "day";
    if((gameData.dayNumber >= gameData.banditsWin) && (gameData.statueTeam() === "bandyci")) gameData.gameOver("bandyci");
    if(gameData.statueTeam() === "miastowi") gameData.gameOver("miastowi");
    io.to("everyone").emit("setTime", gameData.dayNumber, gameData.dayTime)
    if(gameData.herbs !== "") {
        io.to("admin").emit("alert", {type: "herbsKill", player: gameData.characterNick(gameData.herbs)});
    }
    gameData.drunk = []; 
    gameData.prison = "";
    gameData.drunkPlayer = "";
    gameData.szuler = "";
    gameData.usedDuels = 0;
    gameData.votedPlayers = [];
    gameData.inspected = [];
    gameData.hanged = "";
    gameData.inspected = [];
    io.to("everyone").emit("prison", "");
    io.to("everyone").emit("drunk", "");
    io.to("everyone").emit("szulered", "");
    io.to("admin").emit("end", gameData.stageName)
}