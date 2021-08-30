exports.reconnectDataSend = function(socket, io, gameData) {
    if(!socket.admin) {
        let me = socket.myData.characterName;
        io.to(me).emit("prison", gameData.prison);
        io.to(me).emit("drunk", gameData.drunkPlayer);
        io.to(me).emit("szulered", gameData.szulered);
        io.to(me).emit("setTime", gameData.dayNumber, gameData.dayTime);
        io.to(me).emit("turnInfo", gameData.turnInfo[gameData.stageName])
        io.to(me).emit("Player data", socket.myData)
        if(gameData.playerProps(gameData.characterNick(me)).isAlive) {
            io.to(me).emit("statueTeam", gameData.statueTeam());
            if(me !== gameData.prison) {
                if(gameData.chat === socket.myData.team) io.to(me).emit("chatState", true);
            }
            if(gameData.knowsTeammates.includes(me)) {
                let newArr = []
                for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                    let player = gameData.allFullInfoPlayers[i];
                    if(player.team === socket.myData.team) newArr.push(player);
                }
                io.to(me).emit("fullInfoPlayers", newArr);
            } 
            if(gameData.activePlayerName === me) {
                io.to(me).emit("start", gameData.turn, gameData.activePlayerName);
            }
            if(gameData.simulateCharacter === me) {
                io.to(me).emit("manualSkip", gameData.turn, simulatePlayer);
            }
            if((gameData.isVote === true) && (gameData.allowedPlayers.includes(me)) && (!gameData.playersVoted.includes(me))) {
                io.to(me).emit("callVote", gameData.voteId, gameData.voteType, gameData.voteOptions, gameData.inspectedNumber - gameData.inspected.length);
            }    
            console.log("DISCLOSED", gameData.disclosed)
            for(let i = 0; i < gameData.disclosed.length; i++) {
                let player = gameData.disclosed[i];
                for(let j = 0; j < gameData.allFullInfoPlayers.length; j++) {
                    if(gameData.allFullInfoPlayers[j].characterName === player) {
                        console.log("GOT PLAYER")
                        io.to(me).emit("fullInfoPlayers", [gameData.allFullInfoPlayers[j]]);
                    }
                }
            }
            if(gameData.turn === "duelsTurn") {
                for(let i = 0; i < gameData.duelInvites.length; i++) {
                    if(gameData.duelInvites[i][1] === socket.myData.name) io.to(me).emit("alert", {type: "duelInvite", player: gameData.duelInvites[i][0]})
                }
            }
        }
        else {
            io.to(me).emit("fullInfoPlayers", gameData.allFullInfoPlayers);
        }
    }
    else {
        /*if(gameData.duel) io.to("admin").emit("alert", {type: "duelEnd", p1: gameData.duel1, p2: gameData.duel2});
        if(gameData.gameStage === "duelsTurn") io.to("admin").emit("alert", { type: "duelsTurnEnd" })
        if((gameData.herbs !== "") && (gameData.dayTime === "day")) io.to("admin").emit("alert", {type: "herbsKill", player: gameData.characterNick(gameData.herbs)});
        if(gameData.nextVote) io.to("admin").emit("alert", {type: "nextVote"});
        if(gameData.alertIsHanging) io.to("admin").emit("alert", {type: "isHangingEnd"});
        if(gameData.alertHanging) io.to("admin").emit("alert", {type: "hangingEnd", p1: gameData.hanged});*/
    }
}