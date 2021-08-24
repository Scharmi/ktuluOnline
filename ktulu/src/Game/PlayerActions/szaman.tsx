
export function szaman(socket: any, io: any, gameData: any) {
        gameData.setAlertArray((prevArray: any) => {
            let newArr = [...prevArray];
            newArr.push({
                type:"isAction", 
                callBackNo: () => {
                    socket.emit("action", gameData.turnPlayer, {action: false, turn: gameData.turn})
                },
                callBackYes: () => {
                    gameData.setIsVote(true);
                    gameData.setVoteFunctionName("aliveExceptMe")
                    gameData.setVoteProps({
                        type: "character",
                        optionList: [],
                        votedObjects: gameData.aliveExceptMe(),
                        votes: 0,
                        allVotes: 0,
                        minChosen: 1,
                        maxChosen: 1,
                        callBack: gameData.actionCallBack
                    })
                }
            })
            return newArr;
        })

}