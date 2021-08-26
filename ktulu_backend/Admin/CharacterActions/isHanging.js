
const { callVote } = require('./callVote') 
exports.isHanging = function(socket, io, gameData) {  
    let allowedPlayers = [];
    let voteOptions = [{name: "Wieszamy", id: 1}, {name: "Nie wieszamy", id: 0}];
    let playersToKill = [];
    for(let i = 0; i < gameData.allFullInfoPlayers.length; i++) {
        if(gameData.allFullInfoPlayers[i].isAlive === true) {
            allowedPlayers.push(gameData.allFullInfoPlayers[i].characterName);
        }
    }
    callVote(socket, io, gameData, "isHanging", allowedPlayers, voteOptions);
    function voteEndFunction(id) {
        if(gameData.voteId === id) {
            function sortFunction(a,b) {
                if(a.option.id === 2050) return 1;
                if(b.option.id === 2050) return -1;
                return - a.voters.length + b.voters.length;
            }
            let results = [...gameData.voteResults[gameData.voteId]]
            results.sort(sortFunction);
            console.log(results);
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
            let wieszamy = 0;
            if(results[0].voters.length > results[1].voters.length) {
                sendVotes[0].isChosen = 1;
                sendVotes[1].isChosen = 0;
                wieszamy = sendVotes[0].optionName;
            }
            else {
                if(results[0].option.id === 1) {
                    sendVotes[1].isChosen = 1;
                    sendVotes[0].isChosen = 0;
                    wieszamy = sendVotes[1].optionName;
                }
                else {
                    sendVotes[1].isChosen = 0;
                    sendVotes[0].isChosen = 1;
                    wieszamy = sendVotes[0].optionName;
                }

            }
            io.to("everyone").emit("voteResults", "isHanging", sendVotes);
            io.to("admin").emit("alert", {type: "isHangingEnd"});
            socket.once("isHangingEnd", () => {
                if(wieszamy === "Wieszamy")
                gameData.shiftTurn("hanging");
                io.to("admin").emit("end", "isHanging")
            })
        }
        else {
            socket.once("voteEnd", voteEndFunction)
        }
    }
    socket.once("voteEnd", voteEndFunction);

}