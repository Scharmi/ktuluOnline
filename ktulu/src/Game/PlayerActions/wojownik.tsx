
export function wojownik(socket: any, io: any, gameData: any) {
        gameData.setAlertArray((prevArray: any) => {
            let newArr = [...prevArray];
            newArr.push({
                type:"isAction", 
                callBackNo: () => {
                    socket.emit("action", gameData.turnPlayer, {action: false, turn: gameData.turn})
                },
                callBackYes: () => {
                    gameData.setIsVote(true);
                    gameData.setVoteFunctionName("killableExceptTeam")
                    gameData.setVoteProps({
                        type: "killing",
                        optionList: [], 
                        votedObjects: gameData.killableExceptTeam(),
                        votes: 0,
                        allVotes: 0,
                        minChosen: 1,
                        voteState: "choosing",
                        callBack: gameData.actionCallBack
                    })
                }
            })
            return newArr;
        })

}