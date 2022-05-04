import * as Interfaces from 'interfaces/interfaces'

export function uwodziciel(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "aliveExceptMe",
        voteProps: {
            type: "uwodziciel",
            votedObjects: gameData.aliveExceptMe(gameData.gameState),
            callBack: gameData.actionCallBack
        }
    }))
}