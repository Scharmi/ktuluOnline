const { duel } = require('./duel')
exports.duelsTurn = function(socket, io, gameData) {
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
        if(gameData.usedDuels < gameData.duelsLimit) {
            if(!gameData.szeryfAlive()) {
                if((player1Props.isAlive) && (player2Props.isAlive)) {
                    duel(socket, io, gameData, player1, player2);
                }
            }
            else {
                if((!gameData.inviteExists(player1, player2)) && (!gameData.duel)){
                    if(gameData.inviteExists(player2, player1)) {
                        if((player1Props.isAlive) && (player2Props.isAlive)) {
                            if(gameData.usedDuels < gameData.duelsLimit) {
                                gameData.usedDuels++;
                                duel(socket, io, gameData, player1, player2)
                            }
                        }
                        
                    }
                    else {
                        console.log(gameData.inviteExists(player1, player2))
                        if((player1Props.isAlive) && (player2Props.isAlive)) {
                            gameData.duelInvites.push([player1,player2]);
                            io.to(player2Props.characterName).emit("alert", {type: "duelInvite", player: player1})
                        }
                        
                        
                    }
                }
            }
        }
        else {
            io.to(player1Props.characterName).emit("alert", {type: "default", header: "Wyczerpano limit pojedynków"})
        }
    })
    socket.on("duelDecline", (player1, player2) => {
        let player1Props = gameData.playerProps(player1);
        let player2Props = gameData.playerProps(player2);
        if(gameData.inviteExists(player2, player1)) {
            gameData.deleteDuel(player1, player2);
            io.to(player2Props.characterName).emit("alert", {type: "default", header: "Gracz " + player1 + " odrzucił Twoje wyzwanie"});
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
                        gameData.usedDuels++;
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