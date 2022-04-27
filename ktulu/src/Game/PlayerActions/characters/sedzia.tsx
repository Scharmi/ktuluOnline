export function sedzia(socket: any, io: any, gameData: any, sentData: any) {
        gameData.setIsVote(true);
        gameData.setVoteFunctionName("voteProps")
        gameData.setVoteProps({
            type: "killing",
            optionList: [],
            votedObjects: sentData,
            votes: 0,
            allVotes: 0,
            minChosen: 1, voteState: "choosing",
            maxChosen: 1,
            callBack: gameData.actionCallBack
        })

}