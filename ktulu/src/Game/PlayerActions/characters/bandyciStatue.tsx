import * as Interfaces from 'interfaces/interfaces'


export function bandyciStatue(socket: any,  gameData: any) {
    gameData.setGameState((prevState:Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteFunctionName: "myTeamFree",
        voteProps: {
            type: "giveStatue",
            callBack: gameData.actionCallBack
        }
    }))

    

}