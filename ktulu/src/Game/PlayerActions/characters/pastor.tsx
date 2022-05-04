import * as Interfaces from 'interfaces/interfaces'

export function pastor(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "aliveExceptMe",
        voteProps: {
            type: "pastor",
            votedObjects: gameData.aliveExceptMe(gameData.gameState),
            callBack: gameData.actionCallBack
        }
    }))
}