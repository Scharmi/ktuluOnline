import React from 'react'
export interface AlivePlayer {
    username: String;
    userId?: Number;
    playerId: Number;
    exposedCharacter?: String;
}
export interface DeadPlayer {
    username: String;
    userId?: Number;
    characterId: Number;
    name: String;
    team: String;
}
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
    allPlayers: Array<any>
    myData: FullInfoPlayer;
    isVote: boolean;
    messages: Array<any>
    prison: string;
    fullInfoPlayers: Array<any>;
    votesNumber: any;
    chatActive: boolean;
    whoseTurn: string;
}