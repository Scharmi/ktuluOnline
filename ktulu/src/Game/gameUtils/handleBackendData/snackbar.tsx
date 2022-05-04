import * as Interfaces from 'interfaces/interfaces'
export const snackbar = ((gameData:any, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, snackbar: {type: props.type, text: props.text}}));
});