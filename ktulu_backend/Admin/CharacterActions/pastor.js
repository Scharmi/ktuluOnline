exports.pastor = function(socket, io, gameData) {
            let playerIndex = 0;
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
            }
            io.sendData("pastor", "alert", {team: gameData.allFullInfoPlayers[playerIndex].team, name: gameData.allFullInfoPlayers[playerIndex].name, type: "pastor"})
            io.to("admin").emit("end", gameData.stageName);
}