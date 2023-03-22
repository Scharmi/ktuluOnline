import * as Interfaces from 'interfaces/interfaces'
export const turnInfo = ((gameData:any, setGameState: Function, turn: any) => {
    setGameState((prevState: Interfaces.GameState) => {
        if((turn !== null) && (turn.substring(0,15) === "Tura pojedynków")) {
            let newArr = [...prevState.alerts];
            for(let i = 0; i < newArr.length; i++) {
                if(newArr[i].type === "szeryfPassive") newArr.splice(i,1);
            }
            return {...prevState, alerts: newArr, whoseTurn: turn};
        }
        if((turn !== null) && (turn.substring(0,15) !== "Tura pojedynków")) {
            let newArr = [...prevState.alerts];
            for(let i = 0; i < newArr.length; i++) {
                if(newArr[i].type === "duelInvite") newArr.splice(i,1);
                if(turn === "wybór graczy nad których przeszukaniem będzie głosowanie") {
                    if(newArr[i].type === "duelsTurnEnd") newArr.splice(i,1);
                }
            }

            return {...prevState, alerts: newArr, whoseTurn: turn};
        }
        return {...prevState, whoseTurn: turn};
    })
});