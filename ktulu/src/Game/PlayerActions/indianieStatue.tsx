export function indianieStatue(socket: any, io: any, gameData: any) {
        gameData.setIsVote(true);
        gameData.setVoteFunctionName("myTeamFree")
        gameData.setVoteProps({
            type: "giveStatue",
            optionList: [],
            votedObjects: [],
            votes: 0,
            allVotes: 0,
            minChosen: 1, voteState: "choosing",
            maxChosen: 1,
            callBack: gameData.actionCallBack
        })

}