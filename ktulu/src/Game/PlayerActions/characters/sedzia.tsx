import * as Interfaces from 'interfaces/interfaces'

export function sedzia(socket: any,  gameData: any, sentData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "killableExceptTeam",
        voteProps: {
            type: "killing",
            votedObjects: sentData,
            callBack: gameData.actionCallBack
        }
    }))
}