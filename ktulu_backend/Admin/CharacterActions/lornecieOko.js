
exports.lornecieOko = function(socket, io, gameData) {
    if(gameData.actionObject.action === true) {
        gameData.usedSkills.push(gameData.playingCharacter);
        io.to(gameData.playingCharacter).emit("alert", {type: "default", header: "Posążek posiada w tym momencie " + gameData.characterNick(gameData.statue)})
    }
    io.to("admin").emit("end", gameData.stageName);
}