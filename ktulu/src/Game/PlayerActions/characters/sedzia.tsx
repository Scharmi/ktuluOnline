import * as Interfaces from 'interfaces/interfaces'

export function sedzia(socket: any,  gameData: any, sentData: any) {
    gameData.turnPlayer = "sędzia";
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