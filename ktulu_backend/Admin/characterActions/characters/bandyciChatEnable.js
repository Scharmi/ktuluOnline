exports.bandyciChatEnable = function(socket, io, gameData) {
    gameData.chat = "bandyci";
    let activeMembers = gameData.activeMembers("bandyci");
    for(let i = 0; i < activeMembers.length; i++) {
        io.sendData(activeMembers[i].characterName, "chatState", true);
    }
    io.to("admin").emit("end", "bandyciChatEnable");
}