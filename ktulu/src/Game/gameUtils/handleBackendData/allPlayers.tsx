import * as Interfaces from 'interfaces/interfaces'
export const allPlayers = ((gameState:Interfaces.GameState, setGameState: Function, players: Array<Interfaces.Player>) => {
    setGameState((prevState: Interfaces.GameState) => {
        let newArr = [...prevState.allPlayers];
        for(let i = 0; i < players.length; i++) {
            let newPlayer = {...players[i]};
            let isUpdate = false;
            for(let j = 0; j < newArr.length; j++) {
                if(newArr[j].name === newPlayer.name) {
                    isUpdate = true;
                    newArr[j] = {...newPlayer};
                    break;
                }
            }
            if(isUpdate === false) newArr.push({...newPlayer});
        }
        return {...prevState, allPlayers: newArr};
    })
});