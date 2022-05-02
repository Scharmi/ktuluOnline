exports.szeryf = function(socket, io, gameData) {
        let playerIndex = 0;
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
           
        }
        let player = gameData.allFullInfoPlayers[playerIndex];
        let characterName = gameData.allFullInfoPlayers[playerIndex].characterName;
        io.sendData("everyone", "prison", gameData.characterNick(characterName));
        if(characterName === gameData.statue) {
            gameData.statue = "szeryf"
            io.to("everyone").emit("snackbar", "warning", "Szeryf przejął posążek");
        }
        gameData.prison = characterName;
        io.sendData(gameData.allFullInfoPlayers[playerIndex].characterName, "alert", {type: "szeryfPassive"});
        io.to("admin").emit("end", gameData.stageName);
}