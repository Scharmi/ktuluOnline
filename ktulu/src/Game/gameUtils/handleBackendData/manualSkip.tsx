import * as Interfaces from 'interfaces/interfaces'
export const manualSkip = ((gameData:any, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, alerts: [...prevState.alerts, {type:"turnSkip", name: props.player, turn: props.turn}]}));
});