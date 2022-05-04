import * as Interfaces from 'interfaces/interfaces'

export function szeryf(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "aliveExceptMe",
        voteProps: {
            type: "szeryf",
            votedObjects: [...gameData.aliveExceptMe(gameData.gameState)],
            callBack: gameData.actionCallBack,
        }
    }))
}