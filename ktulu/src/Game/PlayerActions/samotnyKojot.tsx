export function samotnyKojot(socket: any, io: any, gameData: any) {
        gameData.setIsVote(true);
        gameData.setVoteFunctionName("aliveExceptMe")
        gameData.setVoteProps({
            type: "killing",
            optionList: [],
            votedObjects: [...gameData.aliveExceptMe(gameData.fullInfoPlayers)],
            votes: 0,
            allVotes: 0,
            minChosen: 1, voteState: "choosing",
            maxChosen: 1,
            callBack: gameData.actionCallBack
        })

}