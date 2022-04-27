import * as Interfaces from 'interfaces/interfaces';

export const alivePlayers = ((gameState: Interfaces.GameState) => {
    let newArr = [];
    for(let i = 0; i < gameState.allPlayers.length; i++) {
        if(gameState.allPlayers[i].isAlive === true) newArr.push(gameState.allPlayers[i]);
        
    }
    return newArr;
})