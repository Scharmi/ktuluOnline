import * as Interfaces from 'interfaces/interfaces'
export const prison = ((gameState:Interfaces.GameState, setGameState: Function, player: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, prison: player}));
});