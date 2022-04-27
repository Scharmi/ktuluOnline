import { killableExceptTeam } from "./gameFunctions/killableExceptTeam";
import { aliveExceptMe } from "./gameFunctions/aliveExceptMe";
import { aliveExceptTeam } from "./gameFunctions/aliveExceptTeam";
import { alivePlayers } from "./gameFunctions/alivePlayers";
import { myTeamFree } from "./gameFunctions/myTeamFree";

export const gameFunctions = {
    killableExceptTeam: killableExceptTeam,
    aliveExceptMe: aliveExceptMe,
    aliveExceptTeam: aliveExceptTeam,
    alivePlayers: alivePlayers,
    myTeamFree: myTeamFree
}