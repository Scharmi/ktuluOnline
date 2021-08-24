
exports.opoj = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        }
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName
        if(gameData.opojOnce === true) gameData.usedSkills.push(gameData.playingCharacter);
        gameData.drunk.push(characterName);
        gameData.drunkPlayer = characterName;
        gameData.opojOnce = true;
    }
    io.to("admin").emit("end", gameData.stageName);
}