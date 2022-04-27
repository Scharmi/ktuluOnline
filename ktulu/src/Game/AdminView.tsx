import React, { useState, useEffect } from 'react'

import { FullInfoPlayer } from '../interfaces/interfaces'
import { 
        templateCrewmates, 
        templateAdminActionButtons,
        templateGameInfo,
        templateAdminData
} from './templates/templates'
import { VotingInterface } from './VotingInterface/VotingInterface'
import { PlayerTable } from './PlayerTable/PlayerTable'
import { RequestAlertList } from './RequestAlert/RequestAlertList'
import { GameInfo } from './GameInfo/GameInfo'
import { Paper } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { GameInfoSetter } from './AdminViewComponents/GameInfoSetter/GameInfoSetter'
import './AdminView.css'
import { transmitter } from './CharacterActions/transmitter'
import { Chat } from './Chat/Chat'
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
    const [messages, setMessages] = useState<Array<any>>([]);
    const [drunk, setDrunk] = useState("")
    const [szulered, setSzulered] = useState("")
    const [whoseTurn, setWhoseTurn] = useState("");
    const [gameTime, setGameTime] = useState({dayTime: "night", dayNumber: 2})
    const [statueTeam, setStatueTeam] = useState("XD");
    const [votesNumber, setVotesNumber] = useState({votes: 0, allVotes:0 })
    const [remainingVoters, setRemainingVoters] = useState<Array<string>>([]);
    const [voteState, setVoteState] = useState("choosing");
    const [voteProps, setVoteProps] = useState({
        type: "duel",
        optionList: [],
        votedObjects: [{}],
        votes: 21,
        allVotes: 37,
        minChosen: 1,
        maxChosen: 2,
        callBack: (arg:any) => {}
    });
    useEffect(() => {
        props.socket.on("message", (sender: string, text:string) => {
            setMessages((prevMessages) => {
                let newArr = [...prevMessages];
                newArr.push({sender: sender, text: text});
                return newArr;
            })
        })
        return () => {
            socket.off("message")
        }
    }, [])
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
        actionCallBack: (arg:any) => {socket.emit("votedPlayers", arg)},
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

    }, [socket])
    useEffect(() => {
        props.socket.on("allowedVoters", (voters: Array<string>) => {
            console.log("GOT VOTERS")
            setRemainingVoters(voters);
            setVoteState("adminRemainingVoters");
            setIsVote(true);
        })
        return () => {
            socket.off("allowedVoters");
        }
    }, [])
    useEffect(() => {
        props.socket.on("playerVoted", (player: string) => {
            console.log("GOT PLAYER VOTED", player);
            setRemainingVoters((prevPlayers: Array<string>) => {
                let newArr = [...prevPlayers];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i] === player) newArr.splice(i, 1);
                }
                return newArr;
            })
        })
        return () => {
            socket.off("playerVoted")
        }
    })
    useEffect(() => {
        socket.on("turnInfo", (arg:string) => {
            console.log("GOT TURN INFO")
            if(arg.substring(0,15) !== "Tura pojedynków") {
                setAlertArray((prevArr) => {
                    let newArr = [...prevArr];
                    for(let i = 0; i < newArr.length; i++) {
                        if(newArr[i].type === "duelInvite") newArr.splice(i,1);
                    }
                    return newArr;
                })
            }
            setWhoseTurn(arg);
        })
        return () => {
            socket.off("turnInfo")
        }
    }, [])
    useEffect (() => {
        socket.on("setTime", (number:number, time: "time") => {
            console.log("GOT SET TIME")
            setGameTime({dayTime: time, dayNumber: number});
        })
        return () => {
            socket.off("setTime");
        }
    })
    useEffect(() => {
        socket.on("statueTeam", (team: string) => {
            console.log("GOT STATUE TEAM")
            const teams = ["bandyci", "indianie", "ufoki", "miastowi"]
            if(!teams.includes(team))
            setStatueTeam(team);
        })
        return () => {
            socket.off("statueTeam");
        }
    }, [])
    useEffect(() => {
        function endListener(arg: any) {
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
    }, [gameData])
    useEffect(() => {
        function listener(turn:string) {
            if(turn === "duelsTurn") {
                setAlertArray((prevArr) => {
                    let newArr = [...prevArr];
                    for(let i = 0; i < newArr.length; i++) {
                        if(newArr[i].type === "duelsTurnEnd") newArr.splice(i,1);
                    }
                    return newArr;
                });
            }
        }
        socket.on("end", listener)  
        return (() => {
            socket.off("end", listener)
        })
    }, [socket])
    useEffect(() => {
        socket.on("herbsKill", () => {
            setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i].type === "herbsKill") newArr.splice(i,1);
                }
                return newArr;
            });
            socket.emit("herbsKill");
        })
        return () => {
            socket.off("herbsKill")
        }
    }, [socket])
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
    }, [socket])
    useEffect(() => {
        socket.on("prison", (player: string) => {
            setPrison(player);
        })
        return () => {
            socket.off("prison");
        }
    }, [prison, setPrison, socket])
    useEffect(() => {
        socket.on("drunk", (player: string) => {
            setDrunk(player);
        })
        return () => {
            socket.off("drunk");
        }
    }, [socket])
    useEffect(() => {
        socket.on("szulered", (player: string) => {
            setSzulered(player);
        })
        return () => {
            socket.off("szulered");
        }
    }, [socket])
    useEffect(() => {
        props.socket.on("alert", (props: any) => {
            if(props.type === "isHangingEnd") console.log("GOT HNG END")
            if((props.type === "duelEnd") || (props.type === "nextVote"))
                setAlertArray((prevArr) => {
                    let newArr = [...prevArr];
                    for(let i = 0; i < newArr.length; i++) {
                        if(newArr[i].type === "voteEnd") newArr.splice(i,1);
                    }
                    return newArr;
                });
            setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                newArr.push(props);
                console.log("NEW ARRY", newArr)
                return newArr;
            });
        })
        return () => {
            props.socket.off("alert")
        }
    }, [socket])
    useEffect(() => {
        socket.on("voteResults", (type: string, results: any) => {
            console.log("GOT VOTE RESULTS", type, results);
            setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i].type === "voteEnd") newArr.splice(i,1);
                }
                return newArr;
            });
            setIsVote(true);
            setVoteState("gotResults");
            setVoteProps({
                type: type,
                optionList: results,
                votedObjects: [],
                votes: 0,
                allVotes: 0,
                minChosen: 1,
                maxChosen: 1,
                callBack: (arg:any) => {},
            })
            
        })
        return () => {
            socket.off("voteResults");
        }
    }, [socket])
    useEffect(() => {
        socket.on("chooseVoted", () => {
            console.log("GOT CHOOSE VOTED")
            setIsVote(true)
            setVoteFunctionName("alivePlayers")
            setVoteState("choosing");
            setVoteProps({
                type: "inspection",
                optionList: [],
                votedObjects: [],
                votes: 0,
                allVotes: 0,
                minChosen: 1,
                maxChosen: 500,
                callBack: (arg:any) => {socket.emit("votedPlayers", arg); setIsVote(false)},
            })
        })
        return () => {
            socket.off("chooseVoted");
        }
    }, [])
    useEffect(() => {
        socket.on("callVote", (id: number, type: string, votedObjects: any) => {
            console.log("GOT CALLVOTE")
            setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                for(let i = 0; i < newArr.length; i++) {
                    if(newArr[i].type === "voteEnd") newArr.splice(i,1);
                }
                newArr.push({type: "voteEnd", callback: () => {socket.emit("voteEnd", id)}, voteType: type, votedObjects: votedObjects});
                return newArr;
            });
        })
        return () => {
            socket.off("callVote")
        }
    }, [])


    function timeChangeCallback(arg: Object) {
        console.log(arg);
    }
    function vote(isVote: boolean) {
        let s:any = []        
        if(voteFunctionName === "voteProps") s = voteProps.votedObjects
        if(voteFunctionName === "allPlayers") {
            s = players;
            console.log("FUNC", s)
        } 
        if(voteFunctionName === "alivePlayers") {
            for(let i = 0; i < players.length; i++) {
                if(players[i].isAlive === true) s.push({...players[i]})
            }
        }
        if(isVote === true) return (
            <VotingInterface 
                optionList = {voteProps.optionList}
                votedObjects = {s}
                type={voteProps.type}
                votes={voteProps.votes}
                allVotes={voteProps.allVotes}
                minChosen={voteProps.minChosen}
                maxChosen={voteProps.maxChosen}
                callBack={voteProps.callBack}
                fullInfoPlayers={players}
                setIsVote={setIsVote}
                voteState={voteState}
                remainingVoters={remainingVoters}
            />
        )
        else {
            return <></>
        }
    }
    return (
        <div className="adminView">
            <Paper elevation={4}>
                <GameInfo whoseTurn={whoseTurn} gameTime={gameTime} whoHasStatue={statueTeam}/>
                {vote(isVote)}
                <RequestAlertList socket={socket} alertArray={alertArray} setAlertArray={setAlertArray} gameData={gameData}/>
                <div><Chat messageList={messages} socket={socket} myName={""}/></div>
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
            <div className="endGame"><Button variant="contained" color="primary" onClick={() => {props.socket.emit("forceEnd")}}>Wymuś koniec kolejki</Button></div>
            <div className="endGame"><Button variant="contained" color="primary" onClick={() => {props.socket.emit("GAME OVER")}}>Wymuś koniec gry</Button></div>
        </div>
    )
}