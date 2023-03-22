import { drunk } from './handleBackendData/drunk';
import { message } from './handleBackendData/message';
import { prison } from './handleBackendData/prison';
import { statueTeam } from './handleBackendData/statueTeam';
import { szulered } from './handleBackendData/szulered';
import { turnInfo } from './handleBackendData/turnInfo';
import { setTime } from './handleBackendData/setTime';
import { adminAlert } from './handleBackendData/adminAlert';
import { adminCallVote } from './handleBackendData/adminCallVote';
import { fullInfoPlayers } from './handleBackendData/fullInfoPlayers';
import { adminVoteResults } from './handleBackendData/adminVoteResults';
import { adminChooseVoted } from './handleBackendData/adminChooseVoted';
import { adminPlayerVoted } from './handleBackendData/adminPlayerVoted';
import { adminAllowedVoters } from './handleBackendData/adminAllowedVoters';
import { votesNumber } from './handleBackendData/votesNumber';
import { systemMessage } from './handleBackendData/systemMessage';
export interface adminHandlebackendData {
    message: Function
}

export const adminHandleBackendData = {
    message: message,
    statueTeam: statueTeam,
    drunk: drunk,
    szulered: szulered,
    prison: prison,
    turnInfo: turnInfo,
    setTime: setTime,
    alert: adminAlert,
    callvote: adminCallVote,
    fullInfoPlayers: fullInfoPlayers,
    voteResults: adminVoteResults,
    votesNumber: votesNumber,
    chooseVoted: adminChooseVoted,
    playerVoted: adminPlayerVoted,
    allowedVoters: adminAllowedVoters,
    systemMessage: systemMessage
} as adminHandlebackendData;