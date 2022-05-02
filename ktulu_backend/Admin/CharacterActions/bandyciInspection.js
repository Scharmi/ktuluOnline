exports.bandyciInspection = function(socket, io, gameData) {  
    if(gameData.actionObject.action === true) {  
    let playerIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
    }
    let player = gameData.allFullInfoPlayers[playerIndex];
    if(player.characterName === gameData.statue) {
        gameData.setStatueTeam(gameData.teamLeader("bandyci"))
    }
    else {
        io.sendData("bandyci", "alert", {type: "default", header: "Nie udało się przejąć posążka", bottomText: ""});
    }

    io.to("admin").emit("end", "bandyciInspection");
    
    }
}