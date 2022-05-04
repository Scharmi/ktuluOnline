import * as Interfaces from 'interfaces/interfaces'

export function bandyciInspection(socket: any,  gameData: any) {
        gameData.setGameState((prevState:Interfaces.GameState) => ({
            ...prevState,
            isVote: true,
            voteFunctionName: "aliveExceptMe",
            voteProps: {
                type: "inspection",
                votedObjects: [...gameData.aliveExceptMe(gameData.gameState)],
                callBack: gameData.actionCallBack
            }
        }))
}