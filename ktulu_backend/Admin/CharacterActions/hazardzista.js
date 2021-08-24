exports.hazardzista = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        gameData.shiftTurn("hazardzistaKilling")

    }
    io.to("admin").emit("end", gameData.stageName);
}