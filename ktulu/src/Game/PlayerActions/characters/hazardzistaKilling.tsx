export function hazardzistaKilling(socket: any, io: any, gameData: any) {
        gameData.setIsVote(true);
        gameData.setVoteFunctionName("killableExceptTeam")
        gameData.setVoteProps({
            type: "killing",
            optionList: [],
            votedObjects: gameData.aliveExceptMe(gameData.gameState),
            votes: 0,
            allVotes: 0,
            minChosen: 1, voteState: "choosing",
            maxChosen: 1,
            callBack: gameData.actionCallBack
        })
}