import * as Interfaces from 'interfaces/interfaces'
//TODO
export const adminVoteResults = ((gameData:any, setGameState: Function, obj: any) => {
    setGameState((prevState: Interfaces.AdminGameState) => {
        let newState = {...prevState};
        newState.isVote = true;
        newState.voteFunctionName = "voteProps";
        newState.voteState = "gotResults";
        newState.voteProps = {
            type: obj.type,
            optionList: obj.results,
            votedObjects: [],
            votes: 0,
            allVotes: 0,
            minChosen: 1,
            maxChosen: 1,
            voteState: "gotResults",
            callBack: gameData.actionCallBack
        }
        newState.alerts = newState.alerts.filter((alert: any) => alert.type !== "voteEnd");
        return newState;
    });


});