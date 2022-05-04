import * as Interfaces from 'interfaces/interfaces'
export const alert = ((gameData:any, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, alerts: [...prevState.alerts, props]}));
});