exports.indianieChatEnable = function(socket, io, gameData) {
    gameData.chat = "indianie";
    let activeMembers = gameData.activeMembers("indianie");
    for(let i = 0; i < activeMembers.length; i++) {
        io.sendData(activeMembers[i].characterName, "chatState", true);
    }
    io.to("admin").emit("end", gameData.stageName)
}