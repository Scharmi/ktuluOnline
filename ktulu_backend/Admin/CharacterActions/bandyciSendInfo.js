exports.bandyciSendInfo = function(socket, io, gameData) {    
    let bandyci = [...gameData.members("bandyci")];
    for(let i = 0; i < bandyci.length; i++) {
        if((bandyci[i].characterName !== gameData.prison) && (!gameData.drunk.includes(bandyci[i].characterName))) {
            io.sendData(bandyci[i].characterName, "fullInfoPlayers", bandyci);
            if(!gameData.knowsTeammates.includes(bandyci[i].characterName)) gameData.knowsTeammates.push(bandyci[i].characterName);
        }
    }
    io.to("admin").emit("end", "bandyciChatEnable")
    io.to("admin").emit("end", "bandyciSendInfo")
}