exports.dziwka = function(socket, io, gameData) {
    console.log("Dziwka")
    let playerIndex = 0;
    let dziwkaIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        if(gameData.allFullInfoPlayers[i].characterName === "dziwka") dziwkaIndex = i;
    }
    io.to("dziwka").emit("alert", {player: gameData.allFullInfoPlayers[playerIndex], type: "dziwkaActive"})
    io.to(gameData.allFullInfoPlayers[playerIndex].characterName).emit("alert", {player: gameData.allFullInfoPlayers[dziwkaIndex], type: "dziwkaPassive"})
    io.to("admin").emit("end", gameData.stageName);
}