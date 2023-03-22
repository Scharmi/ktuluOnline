import { playerActions, Actions } from 'Game/PlayerActions/playerActions';
export const start = ((gameData:any, setGameState: Function, props: any) => {
    gameData.turn = props.turn;
    gameData.turnPlayer = props.player;
    let name = gameData.myData.characterName;
    if(gameData.myData.characterName === "sędzia") name = "sedzia";
    if(gameData.myData.characterName === "pijany sędzia") name = "sedzia";
    if((props.player === name)) {
        if(props.data === undefined) {
            playerActions[props.turn as keyof(Actions)](gameData.socket, gameData);
        }
        else {
            playerActions[props.turn as keyof(Actions)](gameData.socket, gameData, props.data);
        }
    }
});