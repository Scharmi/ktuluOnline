import * as Interfaces from 'interfaces/interfaces';

export const aliveExceptTeam = ((gameState: Interfaces.GameState) => {
    let newArr = [];
    for(let i = 0; i < gameState.allPlayers.length; i++) {
        let team = ""
        for(let j = 0; j < gameState.fullInfoPlayers.length; j++) {
            if(gameState.fullInfoPlayers[j].name === gameState.allPlayers[i].name) {
                team = gameState.fullInfoPlayers[j].team;
            }
        }
        if((team !== gameState.myData.team) && (gameState.allPlayers[i].isAlive === true)) newArr.push(gameState.allPlayers[i]);
        return newArr;
    }
})