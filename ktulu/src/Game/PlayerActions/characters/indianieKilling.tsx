import * as Interfaces from 'interfaces/interfaces'

export function indianieKilling(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "killableExceptTeam",
        voteProps: {
            type: "killing",
            votedObjects: gameData.killableExceptTeam(gameData.gameState),
            callBack: gameData.actionCallBack
        }
    }))
}