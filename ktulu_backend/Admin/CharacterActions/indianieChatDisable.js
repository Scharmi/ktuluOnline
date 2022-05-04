exports.indianieChatDisable = function(socket, io, gameData)  {
    gameData.chat = "";
    let activeMembers = gameData.activeMembers("indianie");
    for(let i = 0; i < activeMembers.length; i++) {
        io.sendData(activeMembers[i].characterName, "chatState", false);
    }
    io.to("admin").emit("end", gameData.stageName)
}
