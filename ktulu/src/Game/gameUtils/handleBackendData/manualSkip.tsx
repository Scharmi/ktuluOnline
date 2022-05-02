import * as Interfaces from 'interfaces/interfaces'
export const manualSkip = ((gameState:Interfaces.GameState, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, alerts: [...prevState.alerts, {type:"turnSkip", name: props.player, turn: props.turn}]}));
});