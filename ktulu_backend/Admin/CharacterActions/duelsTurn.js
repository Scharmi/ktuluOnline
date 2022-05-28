const { duel } = require('./duel')
exports.duelsTurn = function(socket, io, gameData) {
    io.sendData("admin", "alert", { type: "duelsTurnEnd" });
    gameData.pendingDuels = [];
    gameData.duelInvites = [];
    gameData.duel = false;
    gameData.usedDuels = 0;
    gameData.inviteExists = function(p1,p2) {
        for(let i = 0; i < gameData.duelInvites.length; i++) {
            if((gameData.duelInvites[i][0] === p1) && (gameData.duelInvites[i][1] === p2)) return true
        }
        return false
    }
    gameData.deleteDuel = function(player1, player2) {
        for(let i = 0; i < gameData.duelInvites.length; i++) {
            if(((gameData.duelInvites[i][0] = player1) && (gameData.duelInvites[i][1] = player2)) || ((gameData.duelInvites[i][1] = player1) && (gameData.duelInvites[i][0] = player2))) {
                gameData.duelInvites.splice(i, 1);
            }

        }
    }
    socket.on("duelInvite", (player1, player2) => {
        let player1Props = gameData.playerProps(player1);
        let player2Props = gameData.playerProps(player2);
        if(gameData.inviteExists(player1, player2)) io.sendData(player1Props.characterName, "snackbar", {type: "error", text:  "Wyzwanie do tego gracza zostało już wysłane"});
        if(gameData.usedDuels < gameData.duelsLimit) {
            if(!gameData.szeryfAlive()) {
                io.sendData(player1Props.characterName, "snackbar", {type: "success", text:  "Wyzwano gracza na pojedynek"});
                if((player1Props.isAlive) && (player2Props.isAlive)) {
                    duel(socket, io, gameData, player1, player2);
                }
            }
            else {
                if((!gameData.inviteExists(player1, player2)) && (!gameData.duel)){
                    if((player1Props.isAlive) && (player2Props.isAlive))
                    io.sendData(player1Props.characterName, "snackbar", {type: "success", text:  "Wyzwano gracza na pojedynek"});
                    if(gameData.inviteExists(player2, player1)) {
                        if((player1Props.isAlive) && (player2Props.isAlive)) {
                            if(gameData.usedDuels < gameData.duelsLimit) {
                                duel(socket, io, gameData, player1, player2);
                            }
                        }
                        
                    }
                    else {
                        if((player1Props.isAlive) && (player2Props.isAlive)) {
                            gameData.duelInvites.push([player1,player2]);
                            io.sendData(player2Props.characterName, "alert", {type: "duelInvite", player: player1});
                            io.sendData("admin", "snackbar", {type: "info", text:  "Gracz " + player1 + " wyzwał gracza " + player2 + " na pojedynek"});
                            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                                if((gameData.allFullInfoPlayers[i].characterName !== player1Props.characterName) && (gameData.allFullInfoPlayers[i].characterName !== player1Props.characterName)) {
                                    io.sendData(gameData.allFullInfoPlayers[i].characterName, "snackbar", {type: "info", text:  "Gracz " + player1 + " wyzwał gracza " + player2 + " na pojedynek"});
                                }
                            }
                        }
                        
                        
                    }
                }
            }
        }
        else {
            io.sendData(player1Props.characterName, "alert", {type: "default", header: "Wyczerpano limit pojedynków"});
        }
    })
    socket.on("duelDecline", (player1, player2) => {
        let player1Props = gameData.playerProps(player1);
        let player2Props = gameData.playerProps(player2);
        if(gameData.inviteExists(player2, player1)) {
            gameData.deleteDuel(player1, player2);
            io.sendData(player2Props.characterName, "alert", {type: "default", header: "Gracz " + player1 + " odrzucił Twoje wyzwanie"});
        }
        else {
            console.log("INVITE DOESN'T EXIST")
        }
    })
    socket.on("duelAccept", (player1, player2) => {
        let player1Props = gameData.playerProps(player1);
        let player2Props = gameData.playerProps(player2);
        if(gameData.inviteExists(player2, player1)) {
            if((player1Props.isAlive) && (player2Props.isAlive)) {
                if(gameData.duel === false) {
                    if(gameData.usedDuels < gameData.duelsLimit) {
                        duel(socket, io, gameData, player1, player2);
                    }
                    
                }
                else {
                    if(gameData.usedDuels < gameData.duelsLimit) {
                        gameData.usedDuels++;
                        gameData.pendingDuels.push([player1,player2])
                    }
                }
            }
            
        }
        else {
            console.log("INVITE NONEXIST")
        }
    })
}