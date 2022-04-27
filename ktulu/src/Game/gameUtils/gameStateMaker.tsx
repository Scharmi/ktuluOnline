import { templateFullInfoPlayer } from  '../templates/templates'
import * as Interfaces from '../../interfaces/interfaces'

export const gameStateMaker = {
    drunk: "",
    szulered: "",
    voteFunctionName: "MyTeamFree",
    allPlayers: [],
    myData: templateFullInfoPlayer,
    isVote: false,
    messages: [],
    prison: "",
    fullInfoPlayers: [],
    votesNumber: {votes: 0, allVotes: 0},
    chatActive: false,
    whoseTurn: ""
} as Interfaces.GameState;