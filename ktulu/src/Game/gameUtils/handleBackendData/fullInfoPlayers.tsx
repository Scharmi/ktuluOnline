import * as Interfaces from 'interfaces/interfaces'
export const fullInfoPlayers = ((gameState:Interfaces.GameState, setGameState: Function, fullInfoArr: Array<Interfaces.FullInfoPlayer>) => {
    setGameState((prevState: Interfaces.GameState) => {
        let newArr = [...prevState.fullInfoPlayers];
        for(let i = 0; i < fullInfoArr.length; i++) {
            let newPlayer = {...fullInfoArr[i]};
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
        return {...prevState, fullInfoPlayers: newArr};
    })
});