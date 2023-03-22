import * as Interfaces from 'interfaces/interfaces';

export const adminGameDataMaker = (socket:any, gameState:Interfaces.GameState, setGameState: Function, gameFunctions:any) => {
    let gameData = {
        gameState: gameState,
        myData: gameState.myData,
        allPlayers: gameState.allPlayers,
        fullInfoPlayers: gameState.fullInfoPlayers,
        alerts: gameState.alerts,
        voteFunctionName: gameState.voteFunctionName,
        turn: "",
        turnPlayer: "",
        actionCallBack: (arg:any) => {socket.emit("votedPlayers", arg)},
        socket: socket
    }
    return gameData;
};
