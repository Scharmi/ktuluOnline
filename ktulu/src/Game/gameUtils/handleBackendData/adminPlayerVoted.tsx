import * as Interfaces from 'interfaces/interfaces'
export const adminPlayerVoted = ((gameData:any, setGameState: Function, obj: any) => {
    setGameState((prevState: Interfaces.AdminGameState) => {
        console.log(prevState)
        let newArr = [...prevState.remainingVoters];
        for(let i = 0; i < newArr.length; i++) {
            if(newArr[i] === obj) newArr.splice(i, 1);
        }
        return {
            ...prevState,
            remainingVoters: newArr
        }
    });

});