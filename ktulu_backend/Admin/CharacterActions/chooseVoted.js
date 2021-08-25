exports.chooseVoted = function(socket, io, gameData) {
    io.to("admin").emit("fullInfoPlayers", gameData.allFullInfoPlayers);
    io.to("admin").emit("chooseVoted");
    socket.on("votedPlayers", (votedPlayers) => {
        gameData.votedPlayers = votedPlayers;
        io.to("admin").emit("end", gameData.stageName);
    })
}