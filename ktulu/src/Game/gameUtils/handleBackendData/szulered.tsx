import * as Interfaces from 'interfaces/interfaces'
export const szulered = ((gameData:any, setGameState: Function, player: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, szulered: player}));
});