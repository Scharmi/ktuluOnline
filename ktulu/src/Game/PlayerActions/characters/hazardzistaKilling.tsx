import * as Interfaces from 'interfaces/interfaces'

export function hazardzistaKilling(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "killableExceptTeam",
        voteProps: {
            type: "killing",
            votedObjects: gameData.aliveExceptMe(gameData.gameState),
            callBack: gameData.actionCallBack
        }
    }))
}