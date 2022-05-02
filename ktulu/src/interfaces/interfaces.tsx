import React from 'react'
export interface Player {
    id: number;
    name: string;
    isAlive: boolean;
    isArrested?: boolean;
}
export interface FullInfoPlayer {
    name: string;
    id: number;
    characterId: number;
    characterName: string;
    team: string;
    isAlive: boolean;
}
export interface GameState {
    drunk: string;
    szulered: string;
    voteFunctionName: string;
    myData: FullInfoPlayer;
    isVote: boolean;
    messages: Array<any>
    prison: string;
    fullInfoPlayers: Array<any>;
    votesNumber: any;
    chatActive: boolean;
    whoseTurn: string;
    allPlayers: Array<Player>;
    alerts: Array<any>;
    statueTeam: string;
}
export interface HandlebackendData {
    fullInfoPlayers: Function;
    allPlayers: Function;
    prison: Function;
    szulered: Function;
    drunk: Function;
    alert: Function;
    manualSkip: Function;
}