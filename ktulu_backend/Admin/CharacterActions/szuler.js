
exports.szuler = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        }
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName
        gameData.usedSkills.push(gameData.playingCharacter);
        gameData.drunk.push(characterName);
        gameData.szuleredPlayer = characterName;
        if(gameData.statue === characterName) {
            gameData.setStatueTeam(gameData.playingCharacter);
        }
        io.to(characterName).emit("szulered", gameData.characterNick(characterName));
        if(gameData.allFullInfoPlayers[playerIndex].team !== "miastowi") {
            let members = gameData.activeMembers(gameData.allFullInfoPlayers[playerIndex].team);
            for(let i = 0; i < members.length; i++) {
                io.to(members[i].characterName).emit("szulered", gameData.characterNick(characterName));
            }
        }
    }
    io.to("admin").emit("end", gameData.stageName);
}