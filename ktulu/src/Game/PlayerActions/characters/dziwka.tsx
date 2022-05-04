import * as Interfaces from 'interfaces/interfaces'

export function dziwka(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "aliveExceptMe",
        voteProps: {
            type: "dziwka",
            votedObjects: gameData.aliveExceptMe(gameData.gameState),
            callBack: gameData.actionCallBack
        }
    }))
}