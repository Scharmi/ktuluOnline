import * as Interfaces from 'interfaces/interfaces'

export function wojownik(socket: any,  gameData: any) {
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
                        voteFunctionName: "killableExceptTeam",
                        voteProps: {
                            type: "killing",
                            votedObjects: gameData.killableExceptTeam(gameData.gameState),
                            callBack: gameData.actionCallBack
                        }
                    }))
                }
            }
        ]
        }
    ))
}