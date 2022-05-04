import * as Interfaces from 'interfaces/interfaces'
export const statueTeam = ((gameData:any, setGameState: Function, team: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, statueTeam: team}));
});