exports.dziwka = function(socket, io, gameData) {
    let playerIndex = 0;
    let dziwkaIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        if(gameData.allFullInfoPlayers[i].characterName === "dziwka") dziwkaIndex = i;
    }
    io.sendData(gameData.playingCharacter, "alert", {player: gameData.allFullInfoPlayers[playerIndex], type: "dziwkaActive"});
    io.sendData(gameData.allFullInfoPlayers[playerIndex].characterName, "alert", {player: gameData.allFullInfoPlayers[dziwkaIndex], type: "dziwkaPassive"});
    io.to("admin").emit("end", gameData.stageName);
}