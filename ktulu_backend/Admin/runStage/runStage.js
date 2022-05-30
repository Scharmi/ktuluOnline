exports.runStage = function runStage(counter, gameData) {
    io = gameData.io;
    socket = gameData.socket;
    if(gameData.isVote) {
        io.sendData("everyone", "callVote", {id: -1, type: "no", votedObjects: []});
    }
    if(counter < gameData.gameStages.length) {
        io.sendData("admin", "statueTeam", gameData.statue)
        for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
            if((gameData.allFullInfoPlayers[i].team === gameData.statueTeam()) && (gameData.knowsTeammates.includes(gameData.allFullInfoPlayers[i].characterName))) {
                io.sendData(gameData.allFullInfoPlayers[i].characterName, "statueTeam", gameData.characterNick(gameData.statue));
            }
            else {
                io.sendData(gameData.allFullInfoPlayers[i].characterName, "statueTeam", gameData.statueTeam());
            }
        }
        if(counter === gameData.gameStages.length - 1) {
            gameData.gameStages = [...gameData.gameStages, ...gameData.stageCycle]
        }
        socket.removeAllListeners("action");
        socket.removeAllListeners("duelInvite");
        gameData.counter = counter;
        let stageName = gameData.gameStages[counter];
        console.log("STAGE", stageName, gameData.isTurnPlaying(stageName), "STATUE:", gameData.statue);
        let activePlayer = gameData.activePlayer(gameData.turnCharacter[stageName])
        let simulatePlayer = gameData.activePlayerSimulate(gameData.turnCharacter[stageName])
        gameData.activePlayerName = "";
        gameData.simulatePlayer = "";
        gameData.stageName = stageName
        gameData.turn = stageName;
        function listenToAction() {
            socket.once("action", (str, obj) => {
                if((str === activePlayer) && (obj.turn  === gameData.turn)) {
                    console.log("ACTION", activePlayer, obj)
                    gameData.actionObject = {...obj};
                    if((obj.player !== undefined) || (activePlayer === "hazardzista")) {
                        if(obj.player !== undefined) {
                            io.sendData("admin", "message", {sender:"SYSTEM", text: gameData.stageName + " " + obj.player[0].text});
                        }
                        playerActions[stageName](socket, io, gameData);
                    }
                    else {
                        socket.emit("end", gameData.stageName);
                        console.log("UNDEFINED PLAYER, ", obj, activePlayer)
                    }

                }
                else {
                    console.log("BAD ACTION", str, obj, activePlayer, gameData.turn);
                    listenToAction();
                }
            })
        }
        function listenToEnd() {
            socket.once("turnSkip", (turn,player) => {
                if((player === simulatePlayer) && (turn === gameData.turn)) {
                    socket.emit("end", gameData.stageName);
                }
                else {
                    console.log("WRONG TURNSKIP", turn, player)
                    listenToEnd();
                }
            })
        }
        function forceEnd() {
            io.to("admin").emit("end", gameData.stageName);
        }
        if(gameData.isTurnPlaying(stageName) === "play") {
            gameData.activePlayerName = activePlayer;
            io.sendData(activePlayer, "allPlayers", gameData.playersArray);
            io.sendData(activePlayer, "start", {turn: gameData.turn, player: activePlayer});
            listenToAction();
        }
        if(gameData.isTurnPlaying(stageName) === "simulatePrison") {
            gameData.simulatePlayer = simulatePlayer;
            io.sendData(simulatePlayer, "manualSkip", {turn: gameData.turn, player: simulatePlayer});
            listenToEnd();
        }
        if(gameData.isTurnPlaying(stageName) === "simulateUsedSkill") {
            gameData.simulatePlayer = simulatePlayer;
            io.sendData(simulatePlayer, "manualSkip", {turn: gameData.turn, player: simulatePlayer});
            listenToEnd();
        }
        if(gameData.isTurnPlaying(stageName) === "nonActionTurn") {
            playerActions[stageName](socket, io, gameData);
        }
        if(gameData.isTurnPlaying(stageName) === "skip") {
            counter++;
            runStage(counter, gameData);
        }
        else {
            socket.once("forceEnd", forceEnd);
            io.sendData("everyone", "turnInfo", gameData.turnInfo[stageName]);
            function endListener(arg) {
                console.log("END", arg)
                if(arg === stageName) {
                    socket.off("forceEnd", forceEnd);
                    if(stageName === "duelsTurn") {
                        socket.removeAllListeners("duelInvite");
                        socket.removeAllListeners("duelDecline");
                        socket.removeAllListeners("duelAccept");
                    }
                    socket.removeAllListeners("action");
                    counter++;
                    runStage(counter, gameData);
                }
                else {
                    socket.once("end", endListener)
                }
            }
            socket.once("end", endListener)
        }
    }   
}