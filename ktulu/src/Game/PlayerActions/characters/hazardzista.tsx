import * as Interfaces from 'interfaces/interfaces'

export function hazardzista(socket: any,  gameData: any) {
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
                    socket.emit("action", gameData.turnPlayer, {action: true, turn: gameData.turn})
                }
            }
        ]
        }
    ))
}