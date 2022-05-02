import * as Interfaces from 'interfaces/interfaces'
export const szulered = ((gameState:Interfaces.GameState, setGameState: Function, player: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, szulered: player}));
});