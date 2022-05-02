
exports.szaman = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        }
        let playerName = gameData.allFullInfoPlayers[playerIndex].name;
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName;
        gameData.usedSkills.push(gameData.playingCharacter);
        let indianie = gameData.members("indianie");
        for(let i = 0; i < indianie.length; i++) {
            if(indianie[i].characterName !== gameData.prison)
                if(!gameData.drunk.includes(indianie[i].characterName))
                    if(indianie[i].isAlive === true)
                        io.sendData(indianie[i].characterName, "alert", {type:"default", header: "Szaman sprawdził kartę gracza " + playerName, bottomText: "Jego postać to " + characterName});
        }
    }
    io.to("admin").emit("end", gameData.stageName);
}