
const { hangingVote } = require('./hangingVote')
exports.hanging = function(socket, io, gameData) {  
    let votedPlayers = gameData.inspected;
    let voteOptions = [];
    for(let i = 0; i < votedPlayers.length; i++) {
        voteOptions.push({name: votedPlayers[i].name, id: votedPlayers[i].id})
    }
    io.to("everyone").emit("turnInfo", "Wybieranie kogo powiesić")
    hangingVote(socket, io, gameData, voteOptions)
    socket.once("hangingEnd", () => {
        console.log("HANGING:", gameData.hanged)
        io.to("admin").emit("end", "hanging")
    })

}