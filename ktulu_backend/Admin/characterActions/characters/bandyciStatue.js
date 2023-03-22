

exports.bandyciStatue = function(socket, io, gameData) {    
    let playerIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
    }
    let player = gameData.allFullInfoPlayers[playerIndex];
    if((player.team === "bandyci") && (player.characterName !== gameData.prison)) {
      gameData.statue = player.characterName  
        console.log("BANDYCI STATUE 1")
        //TODO potencjalnie potem wyrzucić
        io.to("admin").emit("end", "bandyciStatue");
    }
    else {
        console.log("BANDYCI STATUE 2")
        io.to("admin").emit("end", "bandyciStatue");
    }
    
}