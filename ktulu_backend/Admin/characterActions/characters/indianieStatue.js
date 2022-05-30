

exports.indianieStatue = function(socket, io, gameData) {    
    let playerIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
    }
    let player = gameData.allFullInfoPlayers[playerIndex];
    if((player.team === "indianie") && (player.characterName !== gameData.prison))
    gameData.statue = player.characterName
    else
    io.to("admin").emit("end", "indianieStatue");
}