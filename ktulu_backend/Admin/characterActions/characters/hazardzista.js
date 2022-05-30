exports.hazardzista = function(socket, io, gameData) {
    console.log("HAZARDZISTA", gameData.actionObject.action);
    if(gameData.actionObject.action === true) {
        gameData.shiftTurn("hazardzistaKilling")
    }
    io.to("admin").emit("end", gameData.stageName);
}