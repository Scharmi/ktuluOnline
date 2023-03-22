
import { allPlayers } from './handleBackendData/allPlayers';
import { fullInfoPlayers } from './handleBackendData/fullInfoPlayers'
import { myData } from './handleBackendData/myData';
import { prison } from './handleBackendData/prison'
import { drunk } from './handleBackendData/drunk'
import { szulered } from './handleBackendData/szulered'
import { manualSkip } from './handleBackendData/manualSkip'
import { alert } from './handleBackendData/alert'
import { statueTeam } from './handleBackendData/statueTeam'
import { turnInfo } from './handleBackendData/turnInfo'
import { setTime } from './handleBackendData/setTime'
import { votesNumber } from './handleBackendData/votesNumber';
import { voteResults } from './handleBackendData/voteResults';
import { callVote } from './handleBackendData/callVote';
import { snackbar } from './handleBackendData/snackbar';
import { message } from './handleBackendData/message';
import { chatState } from './handleBackendData/chatState'
import { start } from './handleBackendData/start'
import { systemMessage } from './handleBackendData/systemMessage';

export interface HandlebackendData {
    fullInfoPlayers: Function;
    allPlayers: Function;
    prison: Function;
    szulered: Function;
    drunk: Function;
    alert: Function;
    manualSkip: Function;
    turnInfo: Function;
    statueTeam: Function;
    setTime: Function;
    snackbar: Function;
    votesNumber: Function;
    voteResults: Function;
    callVote: Function;
    chatState: Function;
    message: Function
    start: Function
}

export const handleBackendData = {
    fullInfoPlayers: fullInfoPlayers,
    allPlayers: allPlayers,
    myData: myData,
    prison: prison,
    drunk: drunk,
    szulered: szulered,
    alert: alert,
    manualSkip: manualSkip,
    statueTeam: statueTeam,
    turnInfo: turnInfo,
    setTime: setTime,
    votesNumber: votesNumber,
    voteResults: voteResults,
    callVote: callVote,
    snackbar: snackbar,
    message: message,
    chatState: chatState,
    start : start,
    systemMessage: systemMessage
} as HandlebackendData;