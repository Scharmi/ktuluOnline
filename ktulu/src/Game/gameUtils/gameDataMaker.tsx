
import * as Interfaces from '../../interfaces/interfaces'

export const gameDataMaker = (socket:any, gameState:Interfaces.GameState, setGameState: Function, gameFunctions:any) => {
    let gameData = {
        gameState: gameState,
        myData: gameState.myData,
        allPlayers: gameState.allPlayers,
        fullInfoPlayers: gameState.fullInfoPlayers,
        isVote: gameState.isVote,
        voteProps: gameState.voteProps,
        alerts: gameState.alerts,
        setGameState: setGameState,
        alivePlayers: gameFunctions.alivePlayers,
        aliveExceptMe: gameFunctions.aliveExceptMe,
        myTeamFree: gameFunctions.myTeamFree,
        voteFunctionName: gameState.voteFunctionName,
        turn: "",
        turnPlayer: "", 
        killableExceptTeam: gameFunctions.killableExceptTeam,
        aliveExceptTeam: gameFunctions.aliveExceptTeam,
        actionCallBack: (arg:any) => {},
        socket: socket
    }
    gameData.actionCallBack = function (player:any) {
        if(player.length === 0) socket.emit("action", gameData.turnPlayer, {action: false, turn: gameData.turn})
        else {
            let obj = {player: player}
            socket.emit("action", gameData.turnPlayer, {...obj, action: true, turn: gameData.turn});
        }
        setGameState((prevState:any) => ({...prevState, isVote: false}));
    }
    return gameData;
};
