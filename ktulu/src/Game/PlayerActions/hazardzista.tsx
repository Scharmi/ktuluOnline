export function hazardzista(socket: any, io: any, gameData: any) {
        gameData.setAlertArray((prevArray: any) => {
            let newArr = [...prevArray];
            newArr.push({
                type:"isAction", 
                callBackNo: () => {
                    socket.emit("action", gameData.turnPlayer, {action: false, turn: gameData.turn})
                },
                callBackYes: () => {
                    socket.emit("action", gameData.turnPlayer, {action: true, turn: gameData.turn})
                }
            })
            return newArr;
        })

}