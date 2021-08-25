
const { callVote } = require('./callVote') 
const { inspectionVote } = require('./inspectionVote')
exports.inspection = function(socket, io, gameData) {  
    let votedPlayers = gameData.votedPlayers;
    let voteOptions = [];
    for(let i = 0; i < votedPlayers.length; i++) {
        voteOptions.push({name: votedPlayers[i].text, id: votedPlayers[i].id})
    }
    io.to("everyone").emit("turnInfo", "Wybieranie przeszukiwanych")
    console.log(votedPlayers)
    inspectionVote(socket, io, gameData, voteOptions)
    socket.once("inspectionEnd", () => {
        console.log("INSPECTION:", gameData.inspected)
    })

}