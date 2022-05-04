import * as Interfaces from 'interfaces/interfaces'

export function indianieStatue(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "myTeamFree",
        voteProps: {
            type: "killing",
            callBack: gameData.actionCallBack
        }
    }))
}