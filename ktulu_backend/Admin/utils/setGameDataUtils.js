exports.setGameDataUtils = function setUtils(gameData) {
    gameData.gameOver = function(team) {
        console.log("GAME OVER");
        if(gameData.isGameOver === false) {
            io.sendData("everyone", "fullInfoPlayers", gameData.allFullInfoPlayers);
            io.sendData("everyone", "alert", {type:"default", header: team + " wygrali"});
            gameData.isGameOver = true;
            io.to("admin").emit("GAME OVER")
        }
    }
    gameData.kill = function(characterName) {
        if(characterName !== gameData.prison) {
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if( gameData.allFullInfoPlayers[i].characterName === characterName) {
                  gameData.allFullInfoPlayers[i].isAlive = false;
                  io.sendData("everyone", "fullInfoPlayers", [gameData.allFullInfoPlayers[i]]);
                }
              }
              for(let i = 0; i < gameData.playersArray.length; i++) {
                if( gameData.playersArray[i].name === gameData.characterNick(characterName)) {
                  gameData.playersArray[i].isAlive = false;
                  io.sendData("everyone", "allPlayers", [gameData.allFullInfoPlayers[i]]);
                }
              }
              io.sendData(characterName, "fullInfoPlayers", gameData.allFullInfoPlayers);
              let indiansWon = true;
              for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if((gameData.allFullInfoPlayers[i].team !== "indianie") && (gameData.allFullInfoPlayers[i].isAlive)) indiansWon = false;
              }
              if(indiansWon) gameData.gameOver("indianie")
        }
        else {
            gameData.gameStages.splice(gameData.counter + 1, 0 , gameData.stageName);
        }
    }
    gameData.setStatueTeam = function(characterName) {
        gameData.statue = characterName;
        io.sendData("everyone", "statueTeam", gameData.statueTeam());
        io.sendData("everyone", "snackbar", {type: "warning", text: gameData.statueTeam() + " przejęli posążek"});
        if(gameData.statueTeam() === "indianie") {
            gameData.shiftTurn("plonacySzal")
        }
        if(gameData.statueTeam() !== "miastowi") {
            gameData.gameStages.splice(gameData.counter + 1, 0 , gameData.statueTeam() + "Statue");
            gameData.gameStages.splice(gameData.counter + 1, 0 , gameData.statueTeam() + "SendInfo");
        }
    }
}
