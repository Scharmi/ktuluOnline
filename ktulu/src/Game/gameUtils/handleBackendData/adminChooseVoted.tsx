import * as Interfaces from 'interfaces/interfaces'
export const adminChooseVoted = ((gameData:any, setGameState: Function, props: any) => {
    setGameState((prevState: Interfaces.AdminGameState | Interfaces.GameState) => (
        {
            ...prevState,
            isVote: true,
            voteFunctionName: "alivePlayers",
            voteState: "choosing",
            voteProps: {
                type: "inspection",
                optionList: [],
                votedObjects: [],
                votes: 0,
                allVotes: 0,
                minChosen: 1,
                maxChosen: 500,
                callBack: (arg:any) => {gameData.socket.emit("votedPlayers", arg); setGameState((prevState: Interfaces.GameState) => ({...prevState, isVote: false}))},
            }
        }
    ));
});
