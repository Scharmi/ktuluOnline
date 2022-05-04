import * as Interfaces from 'interfaces/interfaces'
export const drunk = ((gameData:any, setGameState: Function, player: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, drunk: player}));
});