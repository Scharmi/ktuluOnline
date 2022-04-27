import * as Interfaces from 'interfaces/interfaces';

export const aliveExceptMe = ((gameState: Interfaces.GameState) => {
    let newArr = [];
    for(let i = 0; i < gameState.allPlayers.length; i++) {
        if((gameState.allPlayers[i].isAlive === true) && (gameState.allPlayers[i].name !== gameState.myData.name)) newArr.push(gameState.allPlayers[i]);
        
    }
    return newArr;
})