export function szeryf(socket: any, io: any, gameData: any) {
        gameData.setIsVote(true);
        gameData.setVoteFunctionName("aliveExceptMe")
        gameData.setVoteProps({
            type: "szeryf",
            optionList: [],
            votedObjects: gameData.aliveExceptMe(),
            votes: 0,
            allVotes: 0,
            minChosen: 1, voteState: "choosing",
            maxChosen: 1,
            callBack: gameData.actionCallBack
        })
}