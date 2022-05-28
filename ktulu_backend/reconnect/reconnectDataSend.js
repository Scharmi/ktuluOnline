exports.reconnectDataSend = function(socket, io, gameData) {
    let me = socket.admin ? "admin" : socket.myData.characterName;
    io.sendData(me, "prison", gameData.characterNick(gameData.prison));
    //TODO czy to powinno być wysyłane?
    io.sendData(me, "drunk", gameData.characterNick(gameData.drunkPlayer));
    io.sendData(me, "szulered", gameData.characterNick(gameData.szulered));
    io.sendData(me, "setTime", {dayNumber: gameData.dayNumber, dayTime: gameData.dayTime});
    io.sendData(me, "turnInfo", gameData.turnInfo[gameData.stageName]);
    if(!socket.admin) {
        io.sendData(me, "myData", socket.myData);
        if(gameData.playerProps(gameData.characterNick(me)).isAlive) {
            io.sendData(me, "statueTeam", gameData.statueTeam());
            if(me !== gameData.prison) {
                if(gameData.chat === socket.myData.team) io.sendData(me, "chatState", true);
            }
            if(gameData.knowsTeammates.includes(me)) {
                let newArr = []
                for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                    let player = gameData.allFullInfoPlayers[i];
                    if(player.team === socket.myData.team) newArr.push(player);
                }
                io.sendData(me, "fullInfoPlayers", newArr);
            } 
            if(gameData.activePlayerName === me) {
                io.sendData(me, "start", {turn: gameData.turn, player: gameData.activePlayerName});
            }
            if(gameData.simulatePlayer === me) {
                io.sendData(me, "manualSkip", {turn: gameData.turn, player: gameData.simulatePlayer});
            }
            if(gameData.simulateCharacter === me) {
                io.sendData(me, "manualSkip", {turn: gameData.turn, player: gameData.simulatePlayer});
            }
            if((gameData.isVote === true) && (gameData.allowedPlayers.includes(me)) && (!gameData.playersVoted.includes(me))) {
                io.sendData(me, "callVote", {id: gameData.voteId, type: gameData.voteType, votedObjects: gameData.voteOptions, chosenNumber: gameData.inspectedNumber - gameData.inspected.length})
                io.to(me).emit("callVote", gameData.voteId, gameData.voteType, gameData.voteOptions, gameData.inspectedNumber - gameData.inspected.length);
            }    
            for(let i = 0; i < gameData.disclosed.length; i++) {
                let player = gameData.disclosed[i];
                for(let j = 0; j < gameData.allFullInfoPlayers.length; j++) {
                    if(gameData.allFullInfoPlayers[j].characterName === player) {
                        io.sendData(me, "fullInfoPlayers", [gameData.allFullInfoPlayers[j]]);
                    }
                }
            }
            if(gameData.turn === "duelsTurn") {
                for(let i = 0; i < gameData.duelInvites.length; i++) {
                    if(gameData.duelInvites[i][1] === socket.myData.name) io.sendData(me, "alert", {type: "duelInvite", player: gameData.duelInvites[i][0]});
                    
                }
            }
        }
        else {
            io.sendData(me, "fullInfoPlayers", gameData.allFullInfoPlayers);
        }
    }
    else {
        
        if(gameData.duel) io.sendData("admin", "alert", {type: "duelEnd", p1: gameData.duel1, p2: gameData.duel2});
        if(gameData.gameStage === "duelsTurn") io.sendData("admin", "alert", { type: "duelsTurnEnd" });
        if((gameData.herbs !== "") && (gameData.dayTime === "day")) io.sendData("admin", "alert", {type: "herbsKill", player: gameData.characterNick(gameData.herbs)});  
        if(gameData.nextVote) io.sendData("admin", "alert", {type: "nextVote"});
        if(gameData.alertIsHanging) io.sendData("admin", "alert", {type: "isHangingEnd"});
        if(gameData.alertHanging) io.sendData("admin", "alert", {type: "hangingEnd", p1: gameData.hanged});
    }
}