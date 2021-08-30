
const { callVote } = require('./callVote') 
const { inspectionVote } = require('./inspectionVote')
exports.inspection = function(socket, io, gameData) {  
    let votedPlayers = gameData.votedPlayers;
    let voteOptions = [];
    io.to("admin").emit("herbsKill");
    for(let i = 0; i < votedPlayers.length; i++) {
        voteOptions.push({name: votedPlayers[i].text, id: votedPlayers[i].id})
    }
    io.to("everyone").emit("turnInfo", "Wybieranie przeszukiwanych")
    console.log(votedPlayers)
    inspectionVote(socket, io, gameData, voteOptions)
    socket.once("inspectionEnd", () => {
        io.to("admin").emit("end", "inspection")
        for(let i = 0; i < gameData.inspected.length; i++) {
            let name = gameData.inspected[i].name;
            let player = gameData.playerProps(name);
            let characterName = player.characterName;
            if(characterName === gameData.statue) {
                gameData.gameOver("miastowi");
                console.log("PRZESZUKANIE GAME OVER", characterName);
            }
            console.log("INSPECTION:", gameData.inspected)
        }
    })

}