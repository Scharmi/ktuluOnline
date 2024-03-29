
const { callVote } = require('./callVote') 
exports.duel = function(socket, io, gameData, player1, player2) {  
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        io.sendData(gameData.allFullInfoPlayers[i].characterName, "snackbar", {type: "warning", text: "Gracze " + player1 + " i " + player2 + " będą się pojedynkować"});
    }
    gameData.duel = true;
    gameData.usedDuels++;
    gameData.deleteDuel(player1, player2);
    gameData.duelInvites = [];
    let allowedPlayers = [];
    let voteOptions = [];
    let playersToKill = [];
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if((gameData.allFullInfoPlayers[i].name !== player1) && (gameData.allFullInfoPlayers[i].name !== player2) && (gameData.allFullInfoPlayers[i].isAlive === true)) {
            allowedPlayers.push(gameData.allFullInfoPlayers[i].characterName);
        }
    }
    voteOptions.push({name: player1, id: gameData.playerProps(player1).id});
    voteOptions.push({name: player2, id: gameData.playerProps(player2).id});
    io.sendData("everyone", "turnInfo", "Pojedynek między graczami " + player1 + " i " + player2);
    callVote(socket, io, gameData, "duel", allowedPlayers, voteOptions);
    function voteEndFunction(id) {
        if(gameData.voteId === id) {
            function sortFunction(a,b) {
                if(a.option.id === 2050) return 1;
                if(b.option.id === 2050) return -1;
                return - a.voters.length + b.voters.length;
            }
            let results = [...gameData.voteResults[gameData.voteId]]
            results.sort(sortFunction);
            let sendVotes = [];
            for(let i = 0; i < results.length; i++) {
                let optionName = "";
                if(results[i].option.name !== undefined)
                optionName = results[i].option.name;
                else 
                optionName = results[i].option.text;
                let voters = [...results[i].voters]
                let newVoters = [];
                for(let j = 0; j < voters.length; j++) {
                    newVoters.push(gameData.characterNick(voters[j]));
                }
                sendVotes.push({isChosen: -1, optionName: optionName, voters: [...newVoters]});
            }
            let rev = [gameData.characterNick("dobry rewolwerowiec"), gameData.characterNick("zły rewolwerowiec")];
            if(results[0].voters.length > results[1].voters.length) {
                if((rev.includes(results[0].option.name)) && (!rev.includes(results[1].option.name))) {
                    sendVotes[0].isChosen = 0;
                    sendVotes[1].isChosen = 1;
                }
                else {
                    sendVotes[0].isChosen = 1;
                    sendVotes[1].isChosen = 0;
                }
            }
            else {
                if((rev.includes(results[0].option.name)) && (!rev.includes(results[1].option.name))) {
                    sendVotes[0].isChosen = 0;
                    sendVotes[1].isChosen = 1;
                }
                else {
                    if((rev.includes(results[1].option.name)) && (!rev.includes(results[0].option.name))) {
                        sendVotes[0].isChosen = 1;
                        sendVotes[1].isChosen = 0;
                    }
                    else {
                        if(results[0].voters.length === 0) {
                            sendVotes[0].isChosen = 0;
                            sendVotes[1].isChosen = 0;
                        }
                        else {
                            sendVotes[0].isChosen = 1;
                            sendVotes[1].isChosen = 1;
                        }
                    }
                }
            }
            for(let i = 0; i < sendVotes.length; i++) {
                if(sendVotes[i].isChosen === 1) {   
                    playersToKill.push(gameData.playerProps(sendVotes[i].optionName).characterName);
                }
            }
            io.sendData("everyone", "voteResults", {type: "duel", results: sendVotes});
            function discloseAction(character) {
                if((character !== "sędzia") && (character !== "pijany sędzia")) {
                    console.log("WRONG DISCLOSE")
                    socket.once("diclose", discloseAction);
                    
                }
                else {
                    function sedziaAction(name, obj) {
                        if(((name === "sędzia") || (name === "pijany sędzia")) && ((obj.player[0].text === player1) || (obj.player[0].text === player2))) {
                            let playerIndex = 0;
                            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                                if(gameData.allFullInfoPlayers[i].name === obj.player[0].text) playerIndex = i;
                            }
                            let characterName = gameData.allFullInfoPlayers[playerIndex].characterName
                            io.sendData("everyone", "systemMessage", {sender:"", text:"Sędzia zadecydował że zginie " + gameData.characterNick(characterName) + "."});
                            playersToKill = [characterName];
                        }
                        else {
                            console.log("WRONG NAME");
                            socket.once("action", sedziaAction);
                        }
                    }
                    io.sendData(
                        character, 
                        "start", 
                        {
                            //TODO potencjalnie zmienić na "duel"
                            turn: "sedzia", 
                            player: "sedzia", 
                            data: [
                                {
                                    name: player1,
                                    id: 1
                                },
                                {
                                    name: player2,
                                    id: 2
                                }
                            ]
                        }
                    );
                    socket.once("action", sedziaAction);
                    socket.once("duelEnd", () => {
                        socket.off("action", sedziaAction);
                    })
                }
            }
            gameData.duel1 = player1;
            gameData.duel2 = player2;
            socket.once("disclose", discloseAction);
            if(!gameData.disclosed.includes("sędzia"))
            io.sendData("sędzia", "snackbar", {type: "warning", text: "Jeśli chcesz zmienić wynik pojedynku, ujawnij się teraz"});
            if(!gameData.disclosed.includes("pijany sędzia"))
            io.sendData("pijany sędzia", "snackbar", {type: "warning", text: "Jeśli chcesz zmienić wynik pojedynku, ujawnij się teraz"});
            io.sendData("admin", "alert", {type: "duelEnd", p1: player1, p2: player2});
            socket.once("duelEnd", () => {
                if(gameData.usedDuels === gameData.duelsLimit) {
                    io.to("admin").emit("end", "duelsTurn")
                    console.log(gameData.usedDuels, gameData.duelsLimit)
                }
                
                else
                io.sendData("everyone", "turnInfo", "Tura pojedynków");
                gameData.duel = false;
                for(let i = 0; i < playersToKill.length; i++) {
                    let otherPlayer = (gameData.characterNick(playersToKill[i]) === player1 ? player2 : player1);
                    io.sendData(
                        "everyone",
                        "systemMessage", 
                        {
                            sender:"", 
                            text: "Gracz "+ 
                            gameData.characterNick(playersToKill[i]) + 
                            " został zabity podczas pojedynku z graczem " + otherPlayer +
                            ", a jego rolą był(a) " + playersToKill[i],
                        }
                    );
                    if(playersToKill[i] === gameData.statue) {
                        io.sendData(
                            "everyone",
                            "systemMessage", 
                            {
                                sender:"", 
                                text: "Gracz "+ 
                                gameData.characterNick(playersToKill[i]) + 
                                " był w posiadaniu posążka, więc miastowi wygrali!"
                            }
                        );
                        gameData.gameOver("miastowi")
                    }
                    gameData.kill(playersToKill[i]);
                }
            })
        }
        else {
            socket.once("voteEnd", voteEndFunction)
        }
    }
    socket.once("voteEnd", voteEndFunction);

}