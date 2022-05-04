import * as Interfaces from 'interfaces/interfaces'

export function szamanka(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        alerts: [
            ...prevState.alerts,
            {
                type:"isAction", 
                callBackNo: () => {
                    socket.emit("action", gameData.turnPlayer, {action: false, turn: gameData.turn})
                },
                callBackYes: () => {
                    gameData.setGameState((prevState:Interfaces.GameState) => ({
                        ...prevState,
                        isVote: true,
                        voteFunctionName: "aliveExceptMe",
                        voteProps: {
                            type: "herbs",
                            votedObjects: gameData.aliveExceptMe(gameData.gameState),
                            callBack: gameData.actionCallBack
                        }
                    }))
                }
            }
        ]
        }
    ))
}