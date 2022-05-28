import './Game.css'
import { Chat } from './Chat/Chat'
import { gameDataMaker} from './gameUtils/gameDataMaker'
import { gameFunctions } from './gameUtils/gameFunctions'
import { GameInfo } from './GameInfo/GameInfo'
import { GameState } from '../interfaces/interfaces'
import { gameStateMaker } from './gameUtils/gameStateMaker'
import { handleBackendData, HandlebackendData } from './gameUtils/handleBackendData';
import { playerButtons } from './gameUtils/playerButtons'
import { PlayerTable } from './PlayerTable/PlayerTable'
import { RequestAlertList } from './RequestAlert/RequestAlertList'
import { Snackbar } from '@material-ui/core'
import { useEffect } from 'react'
import { VotingInterface } from './VotingInterface/VotingInterface'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState, useMemo } from 'react'
interface Props {
    socket: any;
}
export function Game(props:Props) {  
    let socket = props.socket;
    const [gameState, setGameState] = useState<GameState>(gameStateMaker);
    const gameData = useMemo(() => (gameDataMaker(socket, gameState, setGameState, gameFunctions)), [gameState, socket]);
    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }   

    function renderChat() {
        if(gameState.chat.isActive) {
            return <div><Chat messageList={gameState.chat.messages} socket={socket} myName={gameState.myData.characterName}/></div>
        }
        else return <></>
    }

    useEffect(() => {
        socket.emit("Game loaded")
    }, [socket])
    
    useEffect(() => {
        socket.on("backendData", (type: string, object: any) => {
            handleBackendData[type as keyof(HandlebackendData)](gameData, setGameState, object);
        });
        return () => {
            socket.off("backendData")
        }
    }, [socket, gameState, gameData])

    function vote(voteState: boolean) {
        let s:any = []        
        if(gameState.voteFunctionName === "myTeamFree") s = gameFunctions.myTeamFree(gameState)
        if(gameState.voteFunctionName === "voteProps") s = gameState.voteProps.votedObjects
        if(gameState.voteFunctionName === "aliveExceptMe") s = gameFunctions.aliveExceptMe(gameState);
        if(gameState.voteFunctionName === "killableExceptTeam") s = gameFunctions.killableExceptTeam(gameState);
        if(gameState.voteFunctionName === "aliveExceptTeam") s = gameFunctions.aliveExceptTeam(gameState);
        if(voteState === true) return (
            <VotingInterface 
                optionList = {gameState.voteProps.optionList}
                votedObjects = {s}
                type={gameState.voteProps.type}
                votes={gameState.votesNumber.votes}
                allVotes={gameState.votesNumber.allVotes}
                minChosen={gameState.voteProps.minChosen}
                maxChosen={gameState.voteProps.maxChosen}
                callBack={gameState.voteProps.callBack}
                fullInfoPlayers={gameState.fullInfoPlayers}
                setIsVote={(value: boolean) => setGameState((prevState) => ({...prevState, isVote: value}))}
                voteState={gameState.voteProps.voteState}
            />
        )
        else {
            return <></>
        }
    }
    
    return (
        <div className="game">
                <GameInfo whoseTurn={gameState.whoseTurn} gameTime={gameState.gameTime} whoHasStatue={gameState.statueTeam}/>
                <RequestAlertList socket={socket} alertArray={gameState.alerts} setGameState={setGameState} gameData={gameData}/>
                {renderChat()}
                {vote(gameState.isVote)}
                <PlayerTable
                    socket={socket}
                    players={gameState.allPlayers}
                    crewmates={[]}
                    disclosedPlayers={gameState.fullInfoPlayers}
                    duelFunction={() => {}}
                    inspectionFunction={() => {}}
                    extraButtons={playerButtons.actionButtons(gameState, socket)}
                    specialButtons={playerButtons.specialButtons(gameState, socket)}
                    myData={gameState.myData}
                    prison={gameState.prison}
                    drunk={gameState.drunk}
                    szulered={gameState.szulered}
                />
                <Snackbar open={gameState.snackbar.text === "" ? false : true} autoHideDuration={3000} onClose={() => {setGameState((prevState) => ({...prevState, snackbar: {...prevState.snackbar, text: ""}}))}}>
                    <Alert onClose={() => {setGameState((prevState) => ({...prevState, snackbar: {...prevState.snackbar, text: ""}}))}} severity={gameState.snackbar.type}>
                        {gameState.snackbar.text}
                    </Alert>
                </Snackbar>
        </div> 
    )
}