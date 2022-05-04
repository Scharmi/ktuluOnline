import * as Interfaces from 'interfaces/interfaces'

export function burmistrz(socket: any,  gameData: any, sentData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "voteProps",
        voteProps: {
            type: "burmistrz",
            votedObjects: sentData,
            callBack: gameData.actionCallBack
        }
    }))
}