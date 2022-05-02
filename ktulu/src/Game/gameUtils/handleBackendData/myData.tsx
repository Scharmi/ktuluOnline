import * as Interfaces from 'interfaces/interfaces'
export const myData = ((gameState:Interfaces.GameState, setGameState: Function, myData: Interfaces.FullInfoPlayer) => {
    setGameState((prevState: Interfaces.GameState) => ({...prevState, myData: myData}));
});