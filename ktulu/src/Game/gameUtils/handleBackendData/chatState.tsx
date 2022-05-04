import * as Interfaces from 'interfaces/interfaces'
export const chatState = ((gameData:any, setGameState: Function, isActive: boolean) => {
    setGameState((prevState:Interfaces.GameState) => ({
        ...prevState, 
        chat: {
            ...prevState.chat, 
            isActive: isActive
        }
    }))
});