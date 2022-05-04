import * as Interfaces from 'interfaces/interfaces'

export function szantazysta(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "aliveExceptMe",
        voteProps: {
            type: "szantazysta",
            votedObjects: gameData.aliveExceptMe(gameData.gameState),
            callBack: gameData.actionCallBack
        }
    }))
}