import * as Interfaces from 'interfaces/interfaces'

export const myTeamFree = ((gameState:Interfaces.GameState) => {
    let newArr = [];
    for(let i = 0; i < gameState.fullInfoPlayers.length; i++) {
        if((gameState.fullInfoPlayers[i].isAlive === true) && (gameState.fullInfoPlayers[i].team === gameState.myData.team) && (gameState.fullInfoPlayers[i].name !== gameState.prison)) newArr.push(gameState.fullInfoPlayers[i]);
    }
    return newArr;
})