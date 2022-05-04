import * as Interfaces from 'interfaces/interfaces'
//TODO
export const voteResults = ((gameData:any, setGameState: Function, obj: any) => {
    setGameState((prevState: Interfaces.GameState) => ({
        ...prevState,
        isVote: true,
        voteProps: {
            type: obj.type,
            optionList: obj.results,
            votedObjects: [],
            votes: 0,
            allVotes: 0,
            minChosen: 1,
            maxChosen: 1,
            voteState: "gotResults",
            callBack: (arg:any) => {}
        }
    }))
});