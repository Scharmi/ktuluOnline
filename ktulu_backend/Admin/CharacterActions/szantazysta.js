exports.szantazysta = function(socket, io, gameData) {
    let playerIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
    }
    let player = gameData.allFullInfoPlayers[playerIndex];
    if(player.team === "bandyci") {
        io.sendData(gameData.playingCharacter, "alert", {type:"default", header: "Wybrałeś bandytę, spróbuj ponownie"});
        gameData.shiftTurn("szantazysta")
    }
    else {
        io.sendData(gameData.playingCharacter, "alert", {type:"default", header: "Zaszantażowałeś gracza " + player.name, bottomText: "Osoba ta nie może teraz działać na twoją niekorzyść"});
        io.sendData(player.characterName, "alert", {type: "nonClosing", header: "Zaszantażował Cię gracz " + gameData.characterNick(gameData.playingCharacter), bottomText: "Nie możesz działać na jego niekorzyść"});
    }
    io.to("admin").emit("end", gameData.stageName);
}