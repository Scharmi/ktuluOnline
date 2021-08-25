exports.choosingVotedInspections = function(socket, io, gameData) {
    io.to("admin", "alert", { type: "duelsTurnEnd" })
    
}