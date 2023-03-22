import * as Interfaces from 'interfaces/interfaces'
export const adminCallVote = ((gameData:any, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.AdminGameState) => {
        let newArr = [...prevState.alerts];
        for(let i = 0; i < newArr.length; i++) {
            if(newArr[i].type === "voteEnd") newArr.splice(i,1);
        }
        newArr.push({type: "voteEnd", callback: () => {gameData.socket.emit("voteEnd", props.id)}, voteType: props.type, votedObjects: props.votedObjects});
        return {...prevState, alerts: newArr};
    });
});
