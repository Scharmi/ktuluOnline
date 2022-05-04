import * as Interfaces from 'interfaces/interfaces'
export const setTime = ((gameData:any, setGameState: Function, gameTime: any) => {
    setGameState((prevState:Interfaces.GameState) => ({...prevState, gameTime: gameTime}))
});