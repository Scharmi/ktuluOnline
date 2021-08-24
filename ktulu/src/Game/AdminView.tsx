import React, { useState, useEffect } from 'react'

import { Player, FullInfoPlayer } from '../interfaces/interfaces'
import { templatePlayers, 
        templateVoteResult, 
        templatePlayer, 
        templateCrewmates, 
        templateDisclosed, 
        templateAdminActionButtons,
        templateSpecialButtons,
        templateGameState,
        templateAdminData
} from './templates/templates'
import { VotingInterface } from './VotingInterface/VotingInterface'
import { PlayerTable } from './PlayerTable/PlayerTable'
import { RequestAlertList } from './RequestAlert/RequestAlertList'
import { GameState } from './GameState/GameState'
import { Paper, Divider } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { GameStateSetter } from './AdminViewComponents/GameStateSetter/GameStateSetter'
import './AdminView.css'
import { transmitter } from './CharacterActions/transmitter'
//import { szeryf } from './CharacterActions/szeryf'
//import { msciciel } from './CharacterActions/msciciel'

interface Props {
    adminGameState: "started" | "notStarted";
    socket: any;
}

export function AdminView(props:Props) {
    let socket = props.socket;
    const [players, setPlayers] = useState<Array<FullInfoPlayer>>([])
    const [alertArray, setAlertArray] = useState<Array<any>>([]);
    const [myData, setMyData] = useState({});
    const [allPlayers, setAllPlayers] = useState<Array<any>>([]);
    const [isVote, setIsVote] = useState(false)
    const [prison, setPrison] = useState("")
    const [drunk, setDrunk] = useState("")
    const [szulered, setSzulered] = useState("")
    const [voteProps, setVoteProps] = useState({
        type: "duel",
        optionList: [],
        votedObjects: [{}],
        votes: 21,
        allVotes: 37,
        minChosen: 1,
        voteState: "choosing",
        maxChosen: 2,
        callBack: (arg:any) => {}
    });
    const [voteFunctionName, setVoteFunctionName] = useState<string>("MyTeamFree")
    const [fullInfoPlayers, setFullInfoPlayers] = useState<Array<any>>([]);
    let gameData = {
        myData: myData,
        setMyData: setMyData,
        allPlayers: allPlayers,
        setAllPlayers: setAllPlayers,
        fullInfoPlayers: fullInfoPlayers,
        setFullInfoPlayers: setFullInfoPlayers,
        alertArray: alertArray,
        setAlertArray: setAlertArray,
        voteFunctionName: voteFunctionName,
        setVoteFunctionName: setVoteFunctionName,
        turn: "",
        turnPlayer: "",
        actionCallBack: (arg:any) => {},
    }
    useEffect(() => {
        socket.emit("Game loaded")
        socket.on("Full Players Info", (fullInfo: Array<FullInfoPlayer>, namesArray: Array<string>) => {
            if(fullInfo.length === namesArray.length) {
                    setPlayers(fullInfo);
                    socket.emit("allPlayersConnected")
                }
        })
        socket.on("reconnection", (player:any) => {
            console.log("reconnection", player)
            socket.emit("reconnection", player)
        })

    }, [])
    useEffect(() => {
        transmitter(socket);
        return (() => {
            socket.off("action");
            socket.off("end");
            socket.off("duelInvite");
            socket.off("duelAccept");
            socket.off("duelDecline");
            socket.off("vote");
            socket.off("voteEnd");
            socket.off("disclose");
        })
    }, [gameData])
    useEffect(() => {
        socket.on("fullInfoPlayers", (fullInfoArr: any) => {
            setPlayers((prevFull:any) => {
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
            });
        })
        return () => {
            socket.off("fullInfoPlayers")
        }
    }, [])
    useEffect(() => {
        socket.on("prison", (player: string) => {
            setPrison(player);
        })
        return () => {
            socket.off("prison");
        }
    }, [prison, setPrison])
    useEffect(() => {
        socket.on("drunk", (player: string) => {
            setDrunk(player);
        })
        return () => {
            socket.off("drunk");
        }
    }, [])
    useEffect(() => {
        socket.on("szulered", (player: string) => {
            setSzulered(player);
        })
        return () => {
            socket.off("szulered");
        }
    }, [])
    useEffect(() => {
        props.socket.on("alert", (props: any) => {
            setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                newArr.push(props);
                return newArr;
            });
        })
        return () => {
            props.socket.off("alert")
        }
    }, [])
    useEffect(() => {
        socket.on("voteResults", (type: string, results: any) => {
            console.log("GOT RESULTS")
            setIsVote(true)
            setVoteProps({
                type: type,
                optionList: results,
                votedObjects: [],
                votes: 0,
                allVotes: 0,
                minChosen: 1,
                maxChosen: 1,
                voteState: "gotResults",
                callBack: (arg:any) => {}
            })
        })
        return () => {
            socket.off("voteResults");
        }
    })



    function timeChangeCallback(arg: Object) {
        console.log(arg);
    }
    return (
        <div className="adminView">
            <Paper elevation={4}>
                <RequestAlertList socket={socket} alertArray={alertArray} setAlertArray={setAlertArray} gameData={gameData}/>
                <h2>Gracze biorący udział w rozgrywce:</h2>
                <PlayerTable
                    socket={socket}
                    players={players}
                    crewmates={templateCrewmates}
                    disclosedPlayers={players}
                    duelFunction={() => {}}
                    inspectionFunction={() => {}}
                    extraButtons={templateAdminActionButtons}
                    specialButtons={[]}
                    myData={templateAdminData}
                    prison={prison}
                    drunk={drunk}
                    szulered={szulered}
                />
            </Paper>
            <GameStateSetter gameState={templateGameState} callBack={timeChangeCallback}/>
        </div>
    )
}