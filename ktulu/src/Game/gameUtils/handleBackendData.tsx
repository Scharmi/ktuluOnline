import { HandlebackendData } from 'interfaces/interfaces'
import { allPlayers } from './handleBackendData/allPlayers';
import { fullInfoPlayers } from './handleBackendData/fullInfoPlayers'
import { myData } from './handleBackendData/myData';
import { prison } from './handleBackendData/prison'
import { drunk } from './handleBackendData/drunk'
import { szulered } from './handleBackendData/szulered'
import { manualSkip } from './handleBackendData/manualSkip'
import { alert } from './handleBackendData/alert'
import { statueTeam } from './handleBackendData/statueTeam'

export const handleBackendData = {
    fullInfoPlayers: fullInfoPlayers,
    allPlayers: allPlayers,
    myData: myData,
    prison: prison,
    drunk: drunk,
    szulered: szulered,
    alert: alert,
    manualSkip: manualSkip,
    statueTeam: statueTeam
} as HandlebackendData;