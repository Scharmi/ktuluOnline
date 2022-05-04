import * as Interfaces from 'interfaces/interfaces'
export const myData = ((gameData:any, setGameState: Function, myData: Interfaces.FullInfoPlayer) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, myData: myData}));
});