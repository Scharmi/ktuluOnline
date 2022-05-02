import * as Interfaces from 'interfaces/interfaces'
export const drunk = ((gameState:Interfaces.GameState, setGameState: Function, player: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, drunk: player}));
});