const { characterActions } = require('./characterActions/characterActions');
const { setGameDataUtils } = require('./utils/setGameDataUtils')
const { runStage } = require('./runStage/runStage')
exports.admin = function(socket, io, gameData, server) {
    gameData.io = io;
    gameData.socket = socket;
    console.log(characterActions);
    playerActions = characterActions;
    setGameDataUtils(gameData);
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].characterName === "pijany sędzia") {
            gameData.turnCharacter.opoj = "pijany sędzia";
            gameData.turnInfo.opoj = "pijany sędzia";
        }
    }
    socket.on("disclose", (character) => {
        let name = gameData.characterNick(character);
        let player = gameData.playerProps(name);
        io.sendData("everyone", "fullInfoPlayers", [player]);
    })
    io.to("admin").emit("Full Players Info", gameData.allFullInfoPlayers, gameData.namesArray);  
    socket.emit("Full Players Info", gameData.allFullInfoPlayers, gameData.namesArray)
    socket.once("allPlayersConnected", () => {
        runStage(gameData.counter, gameData, socket, io);
        socket.on("reconnection", (player) => {
            //Resend wyzwań do pojedynków
            //Resend ujawnionych ludzi (w tym tych z teamu)
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(player === gameData.allFullInfoPlayers[i].name) {
                    player = gameData.allFullInfoPlayers[i];
                }
            }
            if(gameData.playingCharacter === player.characterName) {
                io.sendData(player.characterName, "allPlayers", gameData.playersArray);
                io.sendData(player.characterName, "start", {turn: gameData.turn, player: gameData.playingCharacter});
            }

        })
    })
    socket.once("GAME OVER", () => {
        console.log("GAME OVER")
        io.removeAllListeners()
        io.close();
        process.exit();
    })
}