exports.bandyciChatEnable = function(socket, io, gameData) {
    gameData.chat = "bandyci";
    let activeMembers = gameData.activeMembers("bandyci");
    for(let i = 0; i < activeMembers.length; i++) {
        io.to(activeMembers[i].characterName).emit("chatState", true);
    }
    io.to("admin").emit("end", "bandyciChatEnable");
}