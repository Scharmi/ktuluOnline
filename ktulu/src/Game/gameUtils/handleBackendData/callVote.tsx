import * as Interfaces from 'interfaces/interfaces'

export const callVote = ((gameData:any, setGameState: Function, data: any) => {
    setGameState((prevState: Interfaces.GameState) => {
        const isVote:boolean = (data.type !== "no");
        const voteCallBack = ((options:any) => {
            gameData.socket.emit("vote", gameData.myData.characterName, data.id, options);
        })
        let chosen = 1;
        if(data.type === "dailyInspection") chosen = data.chosenNumber;
        if(data.type === " duel") {
            let newArr = [...prevState.alerts];
            for(let i = 0; i < newArr.length; i++) {
                if(newArr[i].type === "duelInvite") newArr.splice(i,1);
            }
            return {
                ...prevState,
                alerts: newArr,
                isVote: isVote,
                voteFunctionName: "voteProps",
                voteProps: {
                    type: data.type,
                    optionList: [],
                    votedObjects: data.votedObjects,
                    votes: 0,
                    allVotes: 0,
                    minChosen: chosen,
                    maxChosen: chosen,
                    voteState: "choosing",
                    callBack: voteCallBack
                }
            };
        }
        return {
            ...prevState,
            isVote: isVote,
            voteFunctionName: "voteProps",
            voteProps: {
                type: data.type,
                optionList: [],
                votedObjects: data.votedObjects,
                votes: 0,
                allVotes: 0,
                minChosen: chosen,
                maxChosen: chosen,
                voteState: "choosing",
                callBack: voteCallBack
            }
        };
    })
});