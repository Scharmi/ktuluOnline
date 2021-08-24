exports.szeryf = function(socket, io, gameData) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
           
        }
        let player = gameData.allFullInfoPlayers[playerIndex];
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName;
        io.to("everyone").emit("prison", gameData.characterNick(characterName));
        if(characterName === gameData.statue) {
            gameData.statue = "szeryf"
            io.to("everyone").emit("alert", {type: "default", header: "Szeryf przejął posążek"});
        }
        gameData.prison = characterName;
        io.to(gameData.allFullInfoPlayers[playerIndex].characterName).emit("alert", {type: "szeryfPassive"});
        io.to("admin").emit("end", gameData.stageName);
}