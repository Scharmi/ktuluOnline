exports.bandyciChatDisable = function(socket, io, gameData) {
    gameData.chat = "";
    let activeMembers = gameData.activeMembers("bandyci");
    for(let i = 0; i < activeMembers.length; i++) {
        io.to(activeMembers[i].characterName).emit("chatState", false);
    }
    io.to("admin").emit("end", gameData.stageName)
}
