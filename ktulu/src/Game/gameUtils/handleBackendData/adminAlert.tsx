import * as Interfaces from 'interfaces/interfaces'
export const adminAlert = ((gameData:any, setGameState: Function, props: any) => {
    if((props.type === "duelEnd") || (props.type === "nextVote")) {
        setGameState((prevState: Interfaces.AdminGameState) => {
            let newArr = [...prevState.alerts];
            for(let i = 0; i < newArr.length; i++) {
                if(newArr[i].type === "voteEnd") newArr.splice(i,1);
            }
            return {...prevState, alerts: newArr};
        });
    }
    setGameState((prevState: Interfaces.GameState) => ({...prevState, alerts: [...prevState.alerts, props]}));
});
