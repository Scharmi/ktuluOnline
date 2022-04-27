import React, { useState, useMemo } from 'react'
import { FullInfoPlayer, GameState } from '../interfaces/interfaces'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { VotingInterface } from './VotingInterface/VotingInterface'
import { PlayerTable } from './PlayerTable/PlayerTable'
import { RequestAlertList } from './RequestAlert/RequestAlertList'
import { GameInfo } from './GameInfo/GameInfo'
import { Snackbar } from '@material-ui/core'
import { io } from "socket.io-client"
import './Game.css'
import { useEffect } from 'react'
import { Chat } from './Chat/Chat'
import { gameStateMaker } from './gameUtils/gameStateMaker'
import { gameFunctions } from './gameUtils/gameFunctions'
import { playerButtons } from './gameUtils/playerButtons'
import { playerActions, Actions } from './PlayerActions/playerActions'
interface Props {
    socket: any;
}
export function Game(props:Props) {  
    let socket = props.socket;
    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }   
    const [gameState, setGameState] = useState(gameStateMaker);
    const [votesNumber, setVotesNumber] = useState({votes: 0, allVotes:0 })
    const [allPlayers, setAllPlayers] = useState<Array<any>>([]);
    const [voteFunctionName, setVoteFunctionName] = useState<string>("MyTeamFree")
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarType, setSnackbarType] = useState<"success" | "info" | "warning" | "error">("success");
    const [isVote, setIsVote] = useState(false);
    const [messages, setMessages] = useState<Array<any>>([]);
    const [whoseTurn, setWhoseTurn] = useState("");
    const [gameTime, setGameTime] = useState({dayTime: "night", dayNumber: 2})
    const [statueTeam, setStatueTeam] = useState("bandyci");
    const [chatActive, setChatActive] = useState(false);
    const [alertArray, setAlertArray] = useState<Array<any>>([]);
    function renderChat() {
        if(chatActive) {
            return <div><Chat messageList={messages} socket={socket} myName={gameState.myData.characterName}/></div>
        }
        else return <></>
    }
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
    const gameData = useMemo(() => ({
        myData: gameState.myData,
        allPlayers: allPlayers,
        setAllPlayers: setAllPlayers,
        fullInfoPlayers: gameState.fullInfoPlayers,
        isVote: isVote,
        setIsVote: setIsVote,
        voteProps: voteProps,
        alertArray: alertArray,
        setAlertArray: setAlertArray,
        setVoteProps: setVoteProps,
        alivePlayers: gameFunctions.alivePlayers,
        aliveExceptMe: gameFunctions.aliveExceptMe,
        myTeamFree: gameFunctions.myTeamFree,
        voteFunctionName: voteFunctionName,
        setVoteFunctionName: setVoteFunctionName,
        turn: "",
        turnPlayer: "",
        killableExceptTeam: gameFunctions.killableExceptTeam,
        aliveExceptTeam: gameFunctions.aliveExceptTeam,
        actionCallBack: (arg:any) => {},
    }), [gameState.myData, alertArray, allPlayers, gameState.fullInfoPlayers,
         isVote, voteFunctionName, voteProps])

    gameData.actionCallBack = function (player:any) {
        if(player.length === 0) socket.emit("action", gameData.turnPlayer, {action: false, turn: gameData.turn})
        else {
            let obj = {player: player}
            socket.emit("action", gameData.turnPlayer, {...obj, action: true, turn: gameData.turn});
        }
        gameData.setIsVote(false);
    }
    useEffect(() => {
        socket.emit("Game loaded")
        socket.on("Player data", (data: FullInfoPlayer) => {
            setGameState((prevState: GameState) => ({...prevState, myData: data}));
        })
        return () => {
            socket.off("Player data")
        }
    }, [socket])
    useEffect(() => {
        socket.on("snackbar", (type: "success" | "info" | "warning" | "error", text: string) => {
            console.log("SNACKBAR", text)
            setSnackbarType(type);
            setSnackbarText(text);
        })
        return () => {
            socket.off("snackbar")
        }
    }, [socket])
    useEffect(() => {
        socket.on("votesNumber", (votes: number, allVotes: number) => {
            console.log("GOT VOTES")
            setVotesNumber({votes: votes, allVotes: allVotes});
        })
        return () => {
            socket.off("votesNumber");
        }
    }, [socket])
    useEffect(() => {
        socket.on("message", (sender: string, text:string) => {
            setMessages((prevMessages) => {
                let newArr = [...prevMessages];
                newArr.push({sender: sender, text: text});
                return newArr;
            })
        })
        return () => {
            socket.off("message")
        }
    }, [socket])
    useEffect(() => {
        socket.on("chatState", (state: boolean) => {
            setChatActive(state);
        })
        return () => {
            socket.off("chatState");
        }
    }, [socket])
    useEffect(() => {
        socket.on("callVote", (id: string, type: string, voteData: any, chosenNumber?: any) => {
            if(type === "duel") {
                setAlertArray((prevArr) => {
                    let newArr = [...prevArr];
                    for(let i = 0; i < newArr.length; i++) {
                        if(newArr[i].type === "duelInvite") newArr.splice(i,1);
                    }
                    return newArr;
                })
            }
            
            function voteCallBack(options:any) {
                console.log("VOTED", gameData.myData)
                socket.emit("vote", gameData.myData.characterName, id, options);
            }
            setIsVote(true);
            setVoteFunctionName("voteProps")
            let chosen = 1;
            if(type === "dailyInspection") chosen = chosenNumber;
            gameData.setVoteProps({
                type: type,
                optionList: [],
                votedObjects: voteData,
                votes: 0,
                allVotes: 0,
                minChosen: chosen,
                maxChosen: chosen,
                voteState: "choosing",
                callBack: voteCallBack
            })
            if(type === "no") setIsVote(false)
        })
        return () => {
            socket.off("callVote")
        }
    }, [socket, gameData])
    useEffect(() => {
        socket.on("turnInfo", (arg:string) => {
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
    }, [socket])
    useEffect(() => {
        socket.on("fullInfoPlayers", (fullInfoArr: any) => {
            setGameState((prevState: GameState) => {
                let newArr = [...prevState.fullInfoPlayers];
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
                console.log("NOWE FULLINFO", fullInfoArr);
                return {...prevState, fullInfoPlayers: newArr};
            })
        })
        return () => {
            socket.off("fullInfoPlayers")
        }
    }, [socket])
    useEffect (() => {
        socket.on("setTime", (number:number, time: "time") => {
            setGameTime({dayTime: time, dayNumber: number});
        })
        return () => {
            socket.off("setTime");
        }
    },[socket])
    useEffect(() => {
        socket.on("manualSkip", (turn:any, player:any) => {
            console.log("MANUAL SKIP")
            setAlertArray((prevArr:any) => {
                let newArr = [...prevArr];
                newArr.push({type:"turnSkip", name: player, turn: turn})
                return newArr;
            });
        })
        return () => {
            socket.off("manualSkip");
        }
    },[alertArray,setAlertArray, socket])
    useEffect(() => {
        socket.on("All players", (fullInfoArr: any) => {
            setAllPlayers((prevFull:any) => {
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
            socket.off("All players")
        }
    }, [socket])
    useEffect(() => {
            socket.on("start", (turn: any, player: string, data?: any) => {
                gameData.turn = turn;
                gameData.turnPlayer = player;
                console.log(turn, "TURN")
                if(player === gameState.myData.characterName) {
                    if(data === undefined)
                    playerActions[turn as keyof(Actions)](socket, io, gameData);
                    else 
                    playerActions[turn as keyof(Actions)](socket, io, gameData, data);
                }
            })
            return () => {
                socket.off("start");
            }

    },[gameData, socket, gameState.myData.characterName])
    useEffect(() => {
        socket.on("prison", (player: string) => {
            console.log("PRISON", player)
            setGameState((prevState) => ({...prevState, prison: player}));
        })
        return () => {
            socket.off("prison");
        }
    }, [gameState.prison, socket])
    useEffect(() => {
        socket.on("drunk", (player: string) => {
            setGameState((prevState) => ({...prevState, drunk: player}));
        })
        return () => {
            socket.off("drunk");
        }
    }, [socket])
    useEffect(() => {
        socket.on("statueTeam", (team: string) => {
            setStatueTeam(team);
        })
        return () => {
            socket.off("statueTeam");
        }
    }, [socket])
    useEffect(() => {
        socket.on("szulered", (player: string) => {
            setGameState((prevState) => ({...prevState, szulered: player}));
        })
        return () => {
            socket.off("szulered");
        }
    }, [socket])
    useEffect(() => {
        socket.on("alert", (props: any) => {
            console.log("ALERT", props)
            setAlertArray((prevArr) => {
                let newArr = [...prevArr];
                newArr.push(props);
                return newArr;
            });
        })
        return () => {
            socket.off("alert")
        }
    }, [socket])
    useEffect(() => {
        socket.on("voteResults", (type: string, results: any) => {
            console.log("GOT RESULTS")
            gameData.setIsVote(true)
            gameData.setVoteProps({
                type: type,
                optionList: results,
                votedObjects: [],
                votes: 0,
                allVotes: 0,
                minChosen: 1,
                maxChosen: 1,
                voteState: "gotResults",
                callBack: (arg) => {}
            })
        })
        return () => {
            socket.off("voteResults");
        }
    }, [socket, gameData])

    function vote(voteState: boolean) {
        let s:any = []        
        if(voteFunctionName === "myTeamFree") s = gameFunctions.myTeamFree(gameState)
        if(voteFunctionName === "voteProps") s = voteProps.votedObjects
        if(voteFunctionName === "aliveExceptMe") s = gameFunctions.aliveExceptMe(gameState);
        if(voteFunctionName === "killableExceptTeam") s = gameFunctions.killableExceptTeam(gameState);
        if(voteFunctionName === "aliveExceptTeam") s = gameFunctions.aliveExceptTeam(gameState);
        console.log("FUNKCJA W VOTE", voteFunctionName, gameFunctions.myTeamFree(gameState), gameState.fullInfoPlayers);
        if(voteState === true) return (
            <VotingInterface 
                optionList = {voteProps.optionList}
                votedObjects = {s}
                type={voteProps.type}
                votes={votesNumber.votes}
                allVotes={votesNumber.allVotes}
                minChosen={voteProps.minChosen}
                maxChosen={voteProps.maxChosen}
                callBack={voteProps.callBack}
                fullInfoPlayers={gameState.fullInfoPlayers}
                setIsVote={setIsVote}
                voteState={voteProps.voteState}
            />
        )
        else {
            return <></>
        }
    }
    return (
        <div className="game">
                <GameInfo whoseTurn={whoseTurn} gameTime={gameTime} whoHasStatue={statueTeam}/>
                <RequestAlertList socket={socket} alertArray={alertArray} setAlertArray={setAlertArray} gameData={gameData}/>
                {renderChat()}
                {vote(isVote)}
                <PlayerTable
                    socket={socket}
                    players={allPlayers}
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
                <Snackbar open={snackbarText === "" ? false : true} autoHideDuration={3000} onClose={() => setSnackbarText("")}>
                    <Alert onClose={() => setSnackbarText("")} severity={snackbarType}>
                        {snackbarText}
                    </Alert>
                </Snackbar>
        </div> 
    )
}