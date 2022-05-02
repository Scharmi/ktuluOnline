import { templateFullInfoPlayer } from  '../templates/templates'
import * as Interfaces from '../../interfaces/interfaces'

export const gameStateMaker = {
    drunk: "",
    szulered: "",
    allPlayers: [],
    myData: templateFullInfoPlayer,
    isVote: false,
    messages: [],
    prison: "",
    fullInfoPlayers: [],
    votesNumber: {votes: 0, allVotes: 0},
    chatActive: false,
    voteFunctionName: "MyTeamFree",
    whoseTurn: "",
    alerts: [],
    statueTeam: "bandyci"
} as Interfaces.GameState;