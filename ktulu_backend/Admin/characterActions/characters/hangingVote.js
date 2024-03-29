
const { callVote } = require('./callVote') 
exports.hangingVote = function(socket, io, gameData, voteOptions) {  
    function hangingVote(socket, io, gameData, voteOptions) {
        console.log(voteOptions);
        let numberOfChosen = 1;
        let allowedPlayers = [];
        let nextVoteOptions = [];
        function discloseAction(character) {
            if(character !== "burmistrz") {
                console.log("WRONG DISCLOSE")
                socket.once("diclose", discloseAction);
            }
            else {
                function burmistrzAction(name, obj) {
                    console.log("OBJ:", obj)
                    if(name === "burmistrz") {
                        io.sendData("everyone", "systemMessage", {sender:"", text:"Burmistrz zdecydował o ułaskawieniu gracza " + gameData.hanged + "."});
                        if(obj.player[0].id === 1) gameData.hanged = "";
                    }
                    else {
                        console.log("WRONG NAME");
                        socket.once("action", burmistrzAction);
                    }
                }
                io.sendData(
                    character, 
                    "start", 
                    {
                        turn: "burmistrz", 
                        player: "burmistrz", 
                        data: [
                            {
                                name: "Ułaskaw",
                                id: 1
                            },
                            {
                                name: "Nie ułaskawiaj",
                                id: 0
                            }
                        ]
                    }
                );
                socket.once("action", burmistrzAction);
                socket.once("hangingEnd", () => {
                    socket.off("action", burmistrzAction);
                })
            }
        }
        if(numberOfChosen === voteOptions.length) {
            gameData.hanged = voteOptions[0].name;
            socket.once("disclose", discloseAction);
            if(!gameData.disclosed.includes("burmistrz"))
            io.sendData("burmistrz", "snackbar", {type: "warning", text:  "Jeśli chcesz ułaskawić wieszanego gracza, ujawnij się teraz"});
            io.sendData("admin", "alert", {type: "hangingEnd", p1: gameData.hanged});
            gameData.alertHanging = true;
        }
        else {
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(gameData.allFullInfoPlayers[i].isAlive === true) {
                    allowedPlayers.push(gameData.allFullInfoPlayers[i].characterName);
                }
            }
            callVote(socket, io, gameData, "hanging", allowedPlayers, voteOptions);
            function voteEndFunction(id) {
                if(gameData.voteId === id) {
                    function sortFunction(a,b) {
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
                    if(results[numberOfChosen - 1].voters.length === results[numberOfChosen].voters.length) {
                        let border = results[numberOfChosen - 1].voters.length;
                        for(let i = 0; i < results.length; i++) {
                            if(results[i].voters.length > border) {
                                gameData.hanged = results[i].option.name;
                                sendVotes[i].isChosen = 1;
                            }
                            if(results[i].voters.length === border) {
                                nextVoteOptions.push(results[i].option);
                                sendVotes[i].isChosen = -1;
                            }
                            if(results[i].voters.length < border) {
                                sendVotes[i].isChosen = 0;
                            }
                        }
                    }
                    else {
                        for(let i = 0; i < numberOfChosen; i++) {
                            gameData.hanged = results[i].option.name;
                            sendVotes[i].isChosen = 1;
                        }
                        for(let i = numberOfChosen; i < results.length; i++) {
                            sendVotes[i].isChosen = 0;
                        }
                    }
                    io.sendData("everyone", "voteResults", {type: "hanging", results: sendVotes});
                    console.log(nextVoteOptions)
                    if((nextVoteOptions.length !== 0) && (nextVoteOptions.length !== voteOptions.length)) {
                        io.sendData("admin", "alert", {type: "nextVote"});
                        gameData.nextVote = true;
                        socket.once("nextVote", () => {
                            gameData.nextVote = false;
                            hangingVote(socket, io, gameData, nextVoteOptions)
                        })
                    }
                    else {
                        socket.once("disclose", discloseAction);
                        if(!gameData.disclosed.includes("burmistrz"))
                        io.sendData("burmistrz", "snackbar", {type: "warning", text:  "Jeśli chcesz ułaskawić wieszanego gracza, ujawnij się teraz"});
                        io.sendData("admin", "alert", {type: "hangingEnd", p1: gameData.hanged});
                        gameData.alertHanging = true;
                    }
                }
                else {
                    socket.once("voteEnd", voteEndFunction);
                }
            }
            socket.once("voteEnd", voteEndFunction);
        }
    }
    hangingVote(socket, io, gameData, voteOptions);
}