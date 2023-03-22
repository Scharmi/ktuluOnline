exports.chooseVoted = function(socket, io, gameData) {
    io.sendData("admin", "fullInfoPlayers", gameData.allFullInfoPlayers)
    io.sendData("admin", "chooseVoted");
    //io.to("admin").emit("chooseVoted");
    socket.on("votedPlayers", (votedPlayers) => {
        gameData.votedPlayers = votedPlayers;
        io.to("admin").emit("end", gameData.stageName);
    })
}