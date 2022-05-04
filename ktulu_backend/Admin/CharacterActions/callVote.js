exports.callVote = function(socket, io, gameData, type, allowedPlayers, voteOptions) {
    console.log("VOTE CALLED", voteOptions);
    let allowedNicks = [];
    for(let i = 0; i < allowedPlayers.length; i++) {
        allowedNicks.push(gameData.characterNick(allowedPlayers[i]));
    }
    io.to("admin").emit("allowedVoters", allowedNicks);
    gameData.voteId++;
    for(let i = 0; i < allowedPlayers.length; i++) {
        io.sendData(allowedPlayers[i], "callVote", {id: gameData.voteId, type: type, votedObjects: voteOptions, chosenNumber: gameData.inspectedNumber - gameData.inspected.length});
    }
    io.sendData("admin", "callvote", {id: gameData.voteId, type: type, votedObjects: voteOptions});
    let playersVoted = [];
    gameData.voteType = type;
    gameData.allowedPlayers = allowedPlayers;
    gameData.voteOptions = voteOptions;
    gameData.playersVoted = playersVoted;
    gameData.isVote = true;
    let votes = [];
    gameData.voteResults[gameData.voteId] = [];
    for(let i = 0; i < voteOptions.length; i++) {
        votes.push({option: voteOptions[i], voters: []});   
    }
    gameData.voteResults[gameData.voteId] = [...votes];
    if(type === "duel") votes.push({option: {text: "Wstrzymuję się od głosu", id: 2050}, voters: []});
    let voteFunction = function(user, sentID, chosenOptions) {
        if(sentID === gameData.voteId) {
            if(allowedPlayers.includes(user)) {
                if(!playersVoted.includes(user)) {
                    io.to("admin").emit("playerVoted", gameData.characterNick(user));
                    playersVoted.push(user);
                    io.sendData("everyone", "votesNumber", {votes: playersVoted.length, allVotes: allowedPlayers.length});
                    for(let i = 0; i < votes.length; i++) {
                        for(let j = 0; j < chosenOptions.length; j++) {
                            if(votes[i].option.id === chosenOptions[j].id) {
                                let voters = [...votes[i].voters];
                                voters.push(user);
                                let newVotes = [...votes];
                                newVotes[i] = {...newVotes[i], voters: voters};
                                votes = [...newVotes];
                            }
                        }
                    }
                    gameData.voteResults[gameData.voteId] = [...votes];
                    if(playersVoted.length === allowedPlayers.length) {
                        socket.emit("voteEnd", gameData.voteId)
                    }
                }
                else {
                    console.log("USER ALREADY VOTED", user)
                }
            }
            else {
                console.log("USER NOT ALLOWED", user)
            }
        }
        else {
            console.log("WRONG ID", user, sentId)
        }
    }
    function voteEndFunction(id) {
        if(id === gameData.voteId) {
            gameData.isVote = false;
            socket.off("vote", voteFunction);
        }
        else {
            socket.once("voteEnd", voteEndFunction);
        }
    }
    socket.on("vote", voteFunction);
    socket.once("voteEnd", voteEndFunction);
}