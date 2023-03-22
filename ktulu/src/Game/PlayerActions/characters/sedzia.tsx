import * as Interfaces from 'interfaces/interfaces'

export function sedzia(socket: any,  gameData: any, sentData: any) {
    if(gameData.myData.characterName === "sędzia") gameData.turnPlayer = "sędzia";
    if(gameData.myData.characterName === "pijany sędzia") gameData.turnPlayer = "pijany sędzia";
    //TODO dodać pijanego potem może
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "voteProps",
        voteProps: {
            type: "killing",
            votedObjects: sentData,
            callBack: gameData.actionCallBack
        }
    }))
}