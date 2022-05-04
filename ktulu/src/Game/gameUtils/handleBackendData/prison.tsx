import * as Interfaces from 'interfaces/interfaces'
export const prison = ((gameData:any, setGameState: Function, player: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, prison: player}));
});