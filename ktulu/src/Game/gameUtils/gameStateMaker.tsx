import { templateFullInfoPlayer } from  '../templates/templates'
import * as Interfaces from '../../interfaces/interfaces'

export const gameStateMaker = {
    drunk: "",
    szulered: "",
    allPlayers: [],
    myData: templateFullInfoPlayer,
    isVote: false,
    prison: "",
    fullInfoPlayers: [],
    votesNumber: {votes: 0, allVotes: 0},
    voteFunctionName: "MyTeamFree",
    whoseTurn: "",
    alerts: [],
    statueTeam: "bandyci",
    gameTime: {
        dayTime: "night",
        dayNumber: 0
    },
    snackbar: {
        text: "",
        type: "success"
    },
    voteProps: {
        type: "duel",
        optionList: [],
        votedObjects: [{}],
        votes: 21,
        allVotes: 37,
        minChosen: 1,
        voteState: "choosing",
        maxChosen: 2,
        callBack: (arg:any) => {}
    },
    chat: {
        messages: [],
        isActive: false
    }
} as Interfaces.GameState;
