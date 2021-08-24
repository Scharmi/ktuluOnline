exports.plonacySzal = function(socket, io, gameData) {    
    if(gameData.actionObject.action === true) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        }
        let player = gameData.allFullInfoPlayers[playerIndex];
        gameData.kill(player.characterName);
    }
    io.to("admin").emit("end", gameData.stageName);
}