
exports.zlodziej = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        }
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName
        gameData.usedSkills.push(gameData.playingCharacter);
        if(characterName === gameData.statue) {
            gameData.setStatueTeam(gameData.playingCharacter);
        }
    }
    io.to("admin").emit("end", gameData.stageName);
}