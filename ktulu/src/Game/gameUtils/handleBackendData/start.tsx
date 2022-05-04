import { playerActions, Actions } from 'Game/PlayerActions/playerActions';
export const start = ((gameData:any, setGameState: Function, props: any) => {
    gameData.turn = props.turn;
    gameData.turnPlayer = props.player;
    if(props.player === gameData.myData.characterName) {
        if(props.data === undefined)
        playerActions[props.turn as keyof(Actions)](gameData.socket, gameData);
        else 
        playerActions[props as keyof(Actions)](gameData.socket, gameData, props.data);
    }
});