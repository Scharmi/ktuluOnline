exports.callVote = function(socket, io, gameData, type, allowedPlayers, voteOptions) {
    gameData.voteId++;
    console.log("VOTE CALLED")
    for(let i = 0; i < allowedPlayers.length; i++) {
        io.to(allowedPlayers[i]).emit("callVote", gameData.voteId, type, voteOptions);
    }
    let playersVoted = [];
    let votes = [];
    for(let i = 0; i < voteOptions.length; i++) {
        votes.push({option: voteOptions[i], voters: []});   
    }
    if(type === "duel") votes.push({option: {text: "Wstrzymuję się od głosu", id: 2050}, voters: []});
    let voteFunction = function(user, sentID, chosenOptions) {
        if(sentID === gameData.voteId) {
            if(allowedPlayers.includes(user)) {
                if(!playersVoted.includes(user)) {
                    playersVoted.push(user);
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
                    console.log(votes);
                    if(playersVoted.length === allowedPlayers.length) {
                        gameData.voteResults[gameData.voteId] = [...votes];
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
            socket.off("vote", voteFunction);
        }
        else {
            socket.once("voteEnd", voteEndFunction);
        }
    }
    socket.on("vote", voteFunction);
    socket.once("voteEnd", voteEndFunction);
}