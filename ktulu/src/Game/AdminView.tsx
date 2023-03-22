import React, { useState, useEffect, useMemo } from 'react'

import { FullInfoPlayer, AdminGameState } from '../interfaces/interfaces'
import { 
        templateCrewmates, 
        templateAdminActionButtons,
        templateAdminData
} from './templates/templates'
import { VotingInterface } from './VotingInterface/VotingInterface'
import { PlayerTable } from './PlayerTable/PlayerTable'
import { RequestAlertList } from './RequestAlert/RequestAlertList'
import { GameInfo } from './GameInfo/GameInfo'
import { Paper } from '@material-ui/core'
import { Button } from '@material-ui/core'
import './AdminView.css'
import { transmitter } from './CharacterActions/transmitter'
import { Chat } from './Chat/Chat'
import { adminGameStateMaker } from './gameUtils/adminGameStateMaker';
import { adminGameDataMaker } from './gameUtils/adminGameDataMaker';
import { adminHandlebackendData, adminHandleBackendData } from './gameUtils/adminHandleBackendData';
import { gameFunctions } from './gameUtils/gameFunctions'

interface Props {
    adminGameState: "started" | "notStarted";
    socket: any;
}

export function AdminView(props:Props) {
    //TODO dostosować do nowej struktury danych
    //TODO wysyłać wiadomości dotyczące przebiegu gry

    let socket = props.socket;
    const [gameState, setGameState] = useState<AdminGameState>(adminGameStateMaker);
    const gameData = useMemo(() => (adminGameDataMaker(socket, gameState, setGameState, gameFunctions)), [gameState, socket]);
    //const [players, setPlayers] = useState<Array<FullInfoPlayer>>([])
    const setIsVote = (value: boolean) => setGameState((prevState) => ({...prevState, isVote: value}));
    useEffect(() => {
        socket.on("message", (sender: string, text:string) => {
            console.log("Old Data Type: message");
        })
        return () => {
            socket.off("message")
        }
    }, [socket])
    useEffect(() => {
        socket.emit("Game loaded")
        socket.on("Full Players Info", (fullInfo: Array<FullInfoPlayer>, namesArray: Array<string>) => {
            console.log("Old Data Type: Full Players Info");
            if(fullInfo.length === namesArray.length) {
                    setGameState((prevState: AdminGameState) => ({...prevState, players: fullInfo}));
                    socket.emit("allPlayersConnected")
                }
        })
        socket.on("reconnection", (player:any) => {
            socket.emit("reconnection", player)
        })

    }, [socket])
    useEffect(() => {
        console.log("Old Data Type: allowedVoters");
        socket.on("allowedVoters", (voters: Array<string>) => {
            console.log("Old Data Type: allowedVoters")
            /*setRemainingVoters(voters);
            setVoteState("adminRemainingVoters");
            setGameState((prevGameState: GameState) => ({...prevGameState, isVote: true}))*/
        })
        return () => {
            socket.off("allowedVoters");
        }
    }, [socket])
    useEffect(() => {
        socket.on("playerVoted", (player: string) => {
            console.log("Old Data Type: playerVoted")
            /*setRemainingVoters((prevPlayers: Array<string>) => {
                let newArr = [...prevPlayers];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i] === player) newArr.splice(i, 1);
                }
                return newArr;
            })*/
        })
        return () => {
            socket.off("playerVoted")
        }
    },[socket])
    useEffect (() => {
        socket.on("setTime", (number:number, time: "time") => {
            console.log("Old Data Type: setTime")
        })
        return () => {
            socket.off("setTime");
        }
    },[socket])
    useEffect(() => {
        socket.on("statueTeam", (team: string) => {
            console.log("Old Data Type: statueTeam")
        })
        return () => {
            socket.off("statueTeam");
        }
    }, [socket])
    useEffect(() => {
        //Dwa różne listenery na end
        function endListener(arg: any) {
            console.log("GOT END INFO")
            socket.emit("end", arg);
        }
        transmitter(socket, endListener);
        return (() => {
            socket.off("action");
            socket.off("end", endListener);
            socket.off("duelInvite");
            socket.off("duelAccept");
            socket.off("duelDecline");
            socket.off("vote");
            socket.off("voteEnd");
            socket.off("hangingEnd");
            socket.off("herbsKill");
            socket.off("GAME OVER")
        })
    }, [socket, gameData])
    useEffect(() => {
        function listener(turn:string) {
            console.log("Old Data Type: end")
            if(turn === "duelsTurn") {
                setGameState((prevGameState: AdminGameState) => {
                    let newArr = [...prevGameState.alerts];
                    for(let i = 0; i < newArr.length; i++) {
                        if(newArr[i].type === "duelsTurnEnd") newArr.splice(i,1);
                    }
                    return {...prevGameState, alertArray: newArr}
                });
                /*setAlertArray((prevArr) => {
                    let newArr = [...prevArr];
                    for(let i = 0; i < newArr.length; i++) {
                        if(newArr[i].type === "duelsTurnEnd") newArr.splice(i,1);
                    }
                    return newArr;
                });*/
            }
        }
        socket.on("end", listener)  
        return (() => {
            socket.off("end", listener)
        })
    }, [socket])
    useEffect(() => {
        socket.on("herbsKill", () => {
            console.log("Old Data Type: herbsKill")
            setGameState((prevGameState: AdminGameState) => {
                let newArr = [...prevGameState.alerts];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i].type === "herbsKill") newArr.splice(i,1);
                }
                return {...prevGameState, alertArray: newArr}
            });
            /*setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i].type === "herbsKill") newArr.splice(i,1);
                }
                return newArr;
            });*/
            socket.emit("herbsKill");
        })
        return () => {
            socket.off("herbsKill")
        }
    }, [socket])
    useEffect(() => {
        socket.on("fullInfoPlayers", (fullInfoArr: any) => {
            console.log("Old Data Type: fullInfoPlayers")
            setGameState((prevGameState: AdminGameState) => {
                let newArr = [...prevGameState.fullInfoPlayers];
                for(let i = 0; i < fullInfoArr.length; i++) {
                    let newPlayer = {...fullInfoArr[i]};
                    let isUpdate = false;
                    for(let j = 0; j < newArr.length; j++) {
                        if(newArr[j].name === newPlayer.name) {
                            isUpdate = true;
                            newArr[j] = {...newPlayer};
                            break;
                        }
                    }
                    if(isUpdate === false) newArr.push({...newPlayer});
                }
                return {...prevGameState, fullInfoPlayers: newArr}
            }
        );
        /*setPlayers((prevFull:any) => {
            let newArr = [...prevFull];
            for(let i = 0; i < fullInfoArr.length; i++) {
                let newPlayer = {...fullInfoArr[i]};
                let isUpdate = false;
                for(let j = 0; j < newArr.length; j++) {
                    if(newArr[j].name === newPlayer.name) {
                        isUpdate = true;
                        newArr[j] = {...newPlayer};
                        break;
                    }
                }
                if(isUpdate === false) newArr.push({...newPlayer});
            }
            return newArr;
        });*/
        })
        return () => {
            socket.off("fullInfoPlayers")
        }
    }, [socket])
    useEffect(() => {
        socket.on("prison", (player: string) => {
            console.log("Old Data Type: prison")
        })
        return () => {
            socket.off("prison");
        }
    }, [socket])
    useEffect(() => {
        socket.on("drunk", (player: string) => {
            console.log("Old Data Type: drunk")
        })
        return () => {
            socket.off("drunk");
        }
    }, [socket])
    useEffect(() => {
        socket.on("szulered", (player: string) => {
            console.log("Old Data Type: szulered")
        })
        return () => {
            socket.off("szulered");
        }
    }, [socket])
    useEffect(() => {
        socket.on("alert", (props: any) => {
            console.log("Old Data Type: alert")
        })
        return () => {
            socket.off("alert")
        }
    }, [socket])
    useEffect(() => {
        socket.on("voteResults", (type: string, results: any) => {
            console.log("Old Data Type: voteResults")
        })
        return () => {
            socket.off("voteResults");
        }
    }, [socket])
    useEffect(() => {
        socket.on("chooseVoted", () => {
            console.log("Old Data Type: chooseVoted")
        })
        return () => {
            socket.off("chooseVoted");
        }
    }, [socket])
    useEffect(() => {
        socket.on("callVote", (id: number, type: string, votedObjects: any) => {
            console.log("Old Data Type: callVote")
        })
        return () => {
            socket.off("callVote")
        }
    }, [socket])
    useEffect(() => {
        socket.on("backendData", (type: string, object: any) => {
            console.log("Backend Data: ", type, object);
            if(adminHandleBackendData[type as keyof(adminHandlebackendData)] === undefined) console.log("No function for type: ", type);
            else adminHandleBackendData[type as keyof(adminHandlebackendData)](gameData, setGameState, object);
        });
        return () => {
            socket.off("backendData")
        }
    }, [socket])

    function vote(isVote: boolean) {
        let s:any = []        
        if(gameState.voteFunctionName === "voteProps") s = gameState.voteProps.votedObjects
        if(gameState.voteFunctionName === "allPlayers") {
            s = gameState.fullInfoPlayers;
        } 
        if(gameState.voteFunctionName === "alivePlayers") {
            for(let i = 0; i < gameState.fullInfoPlayers.length; i++) {
                if(gameState.fullInfoPlayers[i].isAlive === true) s.push({...gameState.fullInfoPlayers[i]})
            }
        }
        if(isVote === true) return (
            <VotingInterface 
                optionList = {gameState.voteProps.optionList}
                votedObjects = {s}
                type={gameState.voteProps.type}
                votes={gameState.voteProps.votes}
                allVotes={gameState.voteProps.allVotes}
                minChosen={gameState.voteProps.minChosen}
                maxChosen={gameState.voteProps.maxChosen}
                callBack={gameState.voteProps.callBack}
                fullInfoPlayers={gameState.fullInfoPlayers}
                setIsVote={setIsVote}
                voteState={gameState.voteState}
                remainingVoters={gameState.remainingVoters}
            />
        )
        else {
            return <></>
        }
    }
    return (
        <div className="adminView">
            <Paper elevation={4}>
                <div className="paperContainer">
                    <GameInfo whoseTurn={gameState.whoseTurn} gameTime={gameState.gameTime} whoHasStatue={gameState.statueTeam}/>
                    {vote(gameState.isVote)}
                    <RequestAlertList socket={socket} alertArray={gameState.alerts} setGameState={setGameState} gameData={gameData}/>
                    <div><Chat sending={true} messageList={gameState.chat.messages} socket={socket} myName={""}/></div>
                    <h2>Gracze biorący udział w rozgrywce:</h2>
                    <PlayerTable
                        socket={socket}
                        players={gameState.fullInfoPlayers}
                        crewmates={templateCrewmates}
                        disclosedPlayers={gameState.fullInfoPlayers}
                        duelFunction={() => {}}
                        inspectionFunction={() => {}}
                        extraButtons={templateAdminActionButtons}
                        specialButtons={[]}
                        myData={templateAdminData}
                        prison={gameState.prison}
                        drunk={gameState.drunk}
                        szulered={gameState.szulered}
                    />
                </div>
            </Paper>
            <div className="endGame"><Button variant="contained" color="primary" onClick={() => {props.socket.emit("forceEnd")}}>Wymuś koniec kolejki</Button></div>
            <div className="endGame"><Button variant="contained" color="primary" onClick={() => {props.socket.emit("GAME OVER")}}>Wymuś koniec gry</Button></div>
        </div>
    )
}