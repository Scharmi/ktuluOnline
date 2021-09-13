
exports.hazardzistaKilling = function(socket, io, gameData) {    
    let playerIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
    }
    let player = gameData.allFullInfoPlayers[playerIndex];
    if(player.team !== "miastowi") {
        if(player.characterName !== prison)
        gameData.kill(player.characterName);
        gameData.shiftTurn("hazardzistaKilling");
        if(player.characterName === gameData.statue) gameData.setStatueTeam(gameData.playingCharacter);
    }
    else {
        gameData.usedSkills.push(gameData.playingCharacter);
        if(gameData.statue === gameData.playingCharacter) gameData.statue = player.characterName
        gameData.kill(gameData.playingCharacter);
    }
    io.to("admin").emit("end", gameData.stageName);
}