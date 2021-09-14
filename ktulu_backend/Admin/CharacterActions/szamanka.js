
exports.szamanka = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        }
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName
        gameData.herbs = characterName;
        socket.once("herbsKill", () => {
            if(gameData.herbs === gameData.statue) gameData.gameOver("miastowi")
            gameData.kill(gameData.herbs);
            gameData.herbs = "";
        })
        gameData.usedSkills.push(gameData.playingCharacter);
    }
    io.to("admin").emit("end", gameData.stageName);
}