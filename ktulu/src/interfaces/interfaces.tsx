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
    prison: string;
    fullInfoPlayers: Array<any>;
    votesNumber: any;
    whoseTurn: string;
    allPlayers: Array<Player>;
    alerts: Array<any>;
    statueTeam: string;
    gameTime: any;
    snackbar: {
        text: string;
        type: "success" | "info" | "warning" | "error";
    }
    chat: {
        messages: Array<any>;
        isActive: boolean;
    }
    voteProps: any;
}
