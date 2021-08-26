
const { callVote } = require('./callVote') 
exports.inspectionVote = function(socket, io, gameData, voteOptions) {  
    function inspectionVote(socket, io, gameData, voteOptions) {
        console.log(voteOptions);
        let numberOfChosen = gameData.inspectedNumber - gameData.inspected.length;
        if(numberOfChosen > voteOptions.length) numberOfChosen = voteOptions.length
        let allowedPlayers = [];
        let nextVoteOptions = [];
        if(numberOfChosen === voteOptions.length) {
            let newArr = [...gameData.inspected];
            newArr = [...newArr, ...voteOptions];
            gameData.inspected = [...newArr];
            io.to("admin").emit("inspectionEnd");
        }
        else {
            for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
                if(gameData.allFullInfoPlayers[i].isAlive === true) {
                    allowedPlayers.push(gameData.allFullInfoPlayers[i].characterName);
                }
            }
            callVote(socket, io, gameData, "dailyInspection", allowedPlayers, voteOptions);
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
                    r = "";
                    if(results[numberOfChosen].voters !== undefined)  r = results[numberOfChosen].voters.length;
                    if(results[numberOfChosen - 1].voters.length === r) {
                        let border = results[numberOfChosen - 1].voters.length;
                        for(let i = 0; i < results.length; i++) {
                            if(results[i].voters.length > border) {
                                gameData.inspected.push(results[i].option);
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
                            gameData.inspected.push(results[i].option);
                            sendVotes[i].isChosen = 1;
                        }
                        for(let i = numberOfChosen; i < results.length; i++) {
                            sendVotes[i].isChosen = 0;
                        }
                    }
                    io.to("everyone").emit("voteResults", "inspection", sendVotes);
                    console.log(nextVoteOptions)
                    if((nextVoteOptions.length !== 0) && (nextVoteOptions.length !== voteOptions.length)) {
                        io.to("admin").emit("alert", {type: "nextVote"});
                        socket.once("nextVote", () => {
                            inspectionVote(socket, io, gameData, nextVoteOptions)
                        })
                    }
                    else {
                        io.to("admin").emit("inspectionEnd");
                    }
                }
                else {
                    socket.once("voteEnd", voteEndFunction)
                }
            }
            socket.once("voteEnd", voteEndFunction);
        }
    }
    inspectionVote(socket, io, gameData, voteOptions);
}