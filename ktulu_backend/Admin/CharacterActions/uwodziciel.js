exports.uwodziciel = function(socket, io, gameData) {
    let playerIndex = 0;
    let dziwkaIndex = 0;
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].name === gameData.actionObject.player[0].text) playerIndex = i;
        if(gameData.allFullInfoPlayers[i].characterName === "dziwka") dziwkaIndex = i;
    }
    let player = gameData.allFullInfoPlayers[playerIndex];
    io.to(gameData.playingCharacter).emit("alert", {type:"default", header: "Uwiodłeś gracza " + player.name, bottomText: "Osoba ta nie może teraz działać na twoją niekorzyść"})
    io.to(player.characterName).emit("alert", {type: "nonClosing", header: "Uwiódł Cię gracz " + gameData.characterNick(gameData.playingCharacter), bottomText: "Nie możesz działać na jego niekorzyść"})
    io.to("admin").emit("end", gameData.stageName);
}