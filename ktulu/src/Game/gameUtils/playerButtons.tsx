import * as Interfaces from '../../interfaces/interfaces'

const actionButtons = ((gameState: Interfaces.GameState, socket: any) => {
    if(gameState.whoseTurn === "Tura pojedynków")
    return (
        [{
            text: "Wyzwij na pojedynek",
            function: (name: string) => {socket.emit("duelInvite", gameState.myData.name, name);},
            isEnabled: true
        }]
    )
    return (
        [{
            text: "Wyzwij na pojedynek",
            function: (name: string) => {socket.emit("duelInvite", gameState.myData.name, name);},
            isEnabled: false
        }]
    )
})
function specialButtons(gameState: Interfaces.GameState, socket: any)  {
    let specialButtons = []
    if((gameState.myData.characterName === "sędzia") || (gameState.myData.characterName === "pijany sędzia") || (gameState.myData.characterName === "burmistrz")) {
        specialButtons.push(
            {
                id: gameState.myData.id,
                extraButtons: [{
                    text: "Ujawnij się",
                    function: (name: string) => {socket.emit("disclose", gameState.myData.characterName)},
                    isEnabled: true
                }]
            }
        )
    }
    return specialButtons;
}
export const playerButtons = {
    actionButtons: actionButtons,
    specialButtons: specialButtons
}
