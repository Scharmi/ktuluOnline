import * as Interfaces from 'interfaces/interfaces'

export const myTeamFree = ((gameState:Interfaces.GameState) => {
    console.log("WYWOŁANO FUNKCJĘ", gameState)
    let newArr = [];
    for(let i = 0; i < gameState.fullInfoPlayers.length; i++) {
        console.log("TEAM MEMBER:", gameState.fullInfoPlayers[i]);
        if((gameState.fullInfoPlayers[i].isAlive === true) && (gameState.fullInfoPlayers[i].team === gameState.myData.team) && (gameState.fullInfoPlayers[i].name !== gameState.prison)) newArr.push(gameState.fullInfoPlayers[i]);
    }
    console.log("OHNE MY TEAM:", newArr, gameState.fullInfoPlayers)
    return newArr;
})