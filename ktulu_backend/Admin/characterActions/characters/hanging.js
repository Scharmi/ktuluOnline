
const { hangingVote } = require('./hangingVote')
exports.hanging = function(socket, io, gameData) {  
    let votedPlayers = gameData.inspected;
    let voteOptions = [];
    for(let i = 0; i < votedPlayers.length; i++) {
        voteOptions.push({name: votedPlayers[i].name, id: votedPlayers[i].id})
    }
    io.sendData("everyone", "turnInfo", "Wybieranie kogo powiesić");
    hangingVote(socket, io, gameData, voteOptions)
    socket.once("hangingEnd", () => {
        if(gameData.hanged !== "") gameData.kill(gameData.playerProps(gameData.hanged).characterName);
        io.to("admin").emit("end", "hanging")
    })

}