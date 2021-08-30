exports.transmitter = function(socket, io, gameData) {
    socket.on("action", (str,obj) => {
        if(str === socket.myData.characterName)
        io.to("admin").emit("action", str, obj);
        else
        console.log("TRANSMISSION BLOCKED")
    })
    socket.on("turnSkip", (turn, player) => {
        if((player === socket.myData.characterName) && (turn === gameData.turn))
        io.to("admin").emit("turnSkip", turn, player);
        else
        console.log("TRANSMISSION BLOCKED", player)
    })
    socket.on("duelInvite", (p1, p2) => {
        if((p1 === socket.myData.name) && (gameData.turn === "duelsTurn") && (p1 !== p2) && (!gameData.duel)) {
            io.to("admin").emit("duelInvite", p1, p2);
        }
        else console.log("TRANSMISSION BLOCKED")
    })
    socket.on("duelAccept", (p1, p2) => {
        if((p1 === socket.myData.name) && (gameData.turn === "duelsTurn") && (p1 !== p2) && (!gameData.duel)) {
            io.to("admin").emit("duelAccept", p1, p2);
        }
        else console.log("TRANSMISSION BLOCKED")
    })
    socket.on("duelDecline", (p1, p2) => {
        if((p1 === socket.myData.name) && (gameData.turn === "duelsTurn") && (p1 !== p2) && (!gameData.duel)) {
            io.to("admin").emit("duelDecline", p1, p2);
        }
        else console.log("TRANSMISSION BLOCKED")
    })
    socket.on("vote", (name, id, options) => {
        if(name === socket.myData.characterName) {
            io.to("admin").emit("vote", name, id, options);
        }
        else console.log("TRANSMISSION BLOCKED", socket.myData.characterName, name, id, options)
    })
    socket.on("disclose", (name) => {
        if((name === socket.myData.characterName) && (!gameData.disclosed.includes(name) && gameData.dayTime === "day")) {
            gameData.disclosed.push(name);
            io.to("admin").emit("disclose", name);
        }
        else console.log("TRANSMISSION BLOCKED", socket.myData.characterName, name)
    })
    socket.on("message", (sender, text) => {
        if(socket.myData.characterName === sender) {
            if(socket.myData.team === gameData.chat) {
                let activeMembers = gameData.activeMembers(socket.myData.team);
                for(let i = 0; i < activeMembers.length; i++) {
                    io.to(activeMembers[i].characterName).emit("message", gameData.characterNick(sender), text);
                }
                io.to("admin").emit("message", gameData.characterNick(sender), text);
            }

        }
        
    })
}