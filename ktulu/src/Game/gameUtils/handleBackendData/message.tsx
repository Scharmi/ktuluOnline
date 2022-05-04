import * as Interfaces from 'interfaces/interfaces'
export const message = ((gameData:any, setGameState: Function, message: any) => {
    setGameState((prevState:Interfaces.GameState) => ({
        ...prevState, 
        chat: {
            ...prevState.chat, 
            messages:[...prevState.chat.messages, message]
        }
    }))
});