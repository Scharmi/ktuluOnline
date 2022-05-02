import * as Interfaces from 'interfaces/interfaces'
export const statueTeam = ((gameState:Interfaces.GameState, setGameState: Function, team: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, statueTeam: team}));
});