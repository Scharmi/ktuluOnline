exports.indianieSendInfo = function(socket, io, gameData) {    
    let indianie = [...gameData.members("indianie")];
    for(let i = 0; i < indianie.length; i++) {
        if((indianie[i].characterName !== gameData.prison) && (!gameData.drunk.includes(indianie[i].characterName))) {
            io.sendData(indianie[i].characterName, "fullInfoPlayers", indianie)
            if(!gameData.knowsTeammates.includes(indianie[i].characterName)) gameData.knowsTeammates.push(indianie[i].characterName);
        }
    }
    if(gameData.statueTeam() === "indianie") {
        gameData.shiftTurn("indianieKilling")
    }
    io.to("admin").emit("end", "indianieSendInfo")
}