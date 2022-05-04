import * as Interfaces from 'interfaces/interfaces'

export function plonacySzal(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "killableExceptTeam",
        voteProps: {
            type: "killing",
            callBack: gameData.actionCallBack
        }
    }))
}