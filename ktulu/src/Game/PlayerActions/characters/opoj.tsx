import * as Interfaces from 'interfaces/interfaces'

export function opoj(socket: any,  gameData: any) {
    console.log("OPUJ");
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
                            type: "drinking",
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