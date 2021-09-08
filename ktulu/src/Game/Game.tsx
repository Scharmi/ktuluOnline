import React, { useState } from 'react'
import { AlivePlayer, DeadPlayer, Player, FullInfoPlayer } from '../interfaces/interfaces'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { templatePlayers, 
        templateVoteResult, 
        templatePlayer, 
        templateCrewmates, 
        templateDisclosed, 
        templateActionButtons,
        templateSpecialButtons,
        templateGameState,
        templateFullInfoPlayer
} from './templates/templates'
import { VotingInterface } from './VotingInterface/VotingInterface'
import { PlayerTable } from './PlayerTable/PlayerTable'
import { RequestAlert } from './RequestAlert/RequestAlert'
import { RequestAlertList } from './RequestAlert/RequestAlertList'
import { GameState } from './GameState/GameState'
import { Paper, Divider, Snackbar } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { io } from "socket.io-client"
import { dziwka } from './PlayerActions/dziwka'
import { szeryf } from './PlayerActions/szeryf'
import { pastor } from './PlayerActions/pastor'
import { uwodziciel } from './PlayerActions/uwodziciel'
import { hazardzista } from './PlayerActions/hazardzista'
import { opoj } from './PlayerActions/opoj'
import { hazardzistaKilling } from './PlayerActions/hazardzistaKilling'
import { bandyciInspection } from './PlayerActions/bandyciInspection'
import { kat } from './PlayerActions/kat'
import { bandyciStatue } from './PlayerActions/bandyciStatue'
import { msciciel } from './PlayerActions/msciciel'
import { zlodziej } from './PlayerActions/zlodziej'
import { szuler } from './PlayerActions/szuler'
import { wojownik } from './PlayerActions/wojownik'
import { szantazysta } from './PlayerActions/szantazysta'
import { szamanka } from './PlayerActions/szamanka'
import { szaman } from './PlayerActions/szaman'
import { indianieKilling } from './PlayerActions/indianieKilling'
import { indianieStatue } from './PlayerActions/indianieStatue'
import './Game.css'
import { useEffect } from 'react'
import { samotnyKojot } from './PlayerActions/samotnyKojot'
import { lornecieOko } from './PlayerActions/lornecieOko'
import { plonacySzal } from './PlayerActions/plonacySzal'
import { sedzia } from './PlayerActions/sedzia'
import { burmistrz } from './PlayerActions/burmistrz'
import { Chat } from './Chat/Chat'
interface Props {
    socket: any;
}

export function Game(props:Props) {  
    let playerActions:any = {
        dziwka: dziwka,
        pastor: pastor,
        szeryf: szeryf,
        opoj: opoj,
        hazardzista: hazardzista,
        hazardzistaKilling: hazardzistaKilling,
        bandyciInspection: bandyciInspection,
        bandyciStatue: bandyciStatue,
        msciciel: msciciel,
        zlodziej: zlodziej,
        szuler: szuler,
        wojownik: wojownik,
        szamanka: szamanka,
        szaman: szaman,
        samotnyKojot: samotnyKojot,
        lornecieOko: lornecieOko,
        plonacySzal: plonacySzal,
        indianieKilling: indianieKilling,
        indianieStatue: indianieStatue,
        szantazysta: szantazysta,
        uwodziciel: uwodziciel,
        kat: kat,
        sedzia: sedzia,
        burmistrz: burmistrz
    }  
    let socket = props.socket;
    function alivePlayers() {
        let newArr = [];
        for(let i = 0; i < allPlayers.length; i++) {
            if(allPlayers[i].isAlive === true) newArr.push(allPlayers[i]);
            
        }
        return newArr;
    }
    function aliveExceptMe() {
        let newArr = [];
        for(let i = 0; i < allPlayers.length; i++) {
            if((allPlayers[i].isAlive === true) && (allPlayers[i].name !== myData.name)) newArr.push(allPlayers[i]);
            
        }
        return newArr;

    }
    
    function blank() {
        return [];
    }
    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }   
    const [votesNumber, setVotesNumber] = useState({votes: 0, allVotes:0 })
    const [myData, setMyData] = useState(templateFullInfoPlayer);
    const [allPlayers, setAllPlayers] = useState<Array<any>>([]);
    const [voteFunctionName, setVoteFunctionName] = useState<string>("MyTeamFree")
    const [fullInfoPlayers, setFullInfoPlayers] = useState<Array<any>>([]);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarType, setSnackbarType] = useState<"success" | "info" | "warning" | "error">("success");
    function myTeamFree() {
        let newArr = [];
        for(let i = 0; i < fullInfoPlayers.length; i++) {
            console.log("TEAM MEMBER:", fullInfoPlayers[i]);
            if((fullInfoPlayers[i].isAlive === true) && (fullInfoPlayers[i].team === myData.team) && (fullInfoPlayers[i].name !== prison)) newArr.push(fullInfoPlayers[i]);
        }
        console.log("MY TEAM:", newArr)
        return newArr;
    }
    const [isVote, setIsVote] = useState(false)
    const [prison, setPrison] = useState("")
    const [messages, setMessages] = useState<Array<any>>([]);
    const [drunk, setDrunk] = useState("")
    const [szulered, setSzulered] = useState("")
    const [whoseTurn, setWhoseTurn] = useState("");
    const [gameTime, setGameTime] = useState({dayTime: "night", dayNumber: 2})
    const [statueTeam, setStatueTeam] = useState("bandyci");
    const [chatActive, setChatActive] = useState(false);
    function renderChat() {
        if(chatActive) {
            return <div><Chat messageList={messages} socket={socket} myName={myData.characterName}/></div>
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
    const [alertArray, setAlertArray] = useState<Array<any>>([]);
    function actionButtons(){
        if(whoseTurn === "Tura pojedynków")
        return (
            [{
                text: "Wyzwij na pojedynek",
                function: (name: string) => {socket.emit("duelInvite", myData.name, name); console.log("INVITE")},
                isEnabled: true
            }]
        )
        return (
            [{
                text: "Wyzwij na pojedynek",
                function: (name: string) => {socket.emit("duelInvite", myData.name, name); console.log("INVITE")},
                isEnabled: false
            }]
        )
    } 
    function specialButtons()  {
        let specialButtons = []
        if((myData.characterName === "sędzia") || (myData.characterName === "pijany sędzia") || (myData.characterName === "burmistrz")) {
            specialButtons.push(
                {
                    id: myData.id,
                    extraButtons: [{
                        text: "Ujawnij się",
                        function: (name: string) => {socket.emit("disclose", myData.characterName)},
                        isEnabled: true
                    }]
                }
            )
        }
        return specialButtons;
    }
    function killableExceptTeam() {
        let newArr = [];
        for(let i = 0; i < allPlayers.length; i++) {
            let team = "X"
            for(let j = 0; j < fullInfoPlayers.length; j++) {
                if(fullInfoPlayers[j].name === allPlayers[i].name) {
                    team = fullInfoPlayers[j].team;
                }
            }
            if((team !== myData.team) && (prison !== allPlayers[i].name) && (allPlayers[i].isAlive === true)) newArr.push(allPlayers[i]);
        }
        return newArr;
    }
    function aliveExceptTeam() {
        let newArr = [];
        for(let i = 0; i < allPlayers.length; i++) {
            let team = ""
            for(let j = 0; j < fullInfoPlayers.length; j++) {
                if(fullInfoPlayers[j].name === allPlayers[i].name) {
                    team = fullInfoPlayers[j].team;
                }
            }
            if((team !== myData.team) && (allPlayers[i].isAlive === true)) newArr.push(allPlayers[i]);
            return newArr;
        }
    }
    let gameData = {
        myData: myData,
        setMyData: setMyData,
        allPlayers: allPlayers,
        setAllPlayers: setAllPlayers,
        fullInfoPlayers: fullInfoPlayers,
        setFullInfoPlayers: setFullInfoPlayers,
        isVote: isVote,
        setIsVote: setIsVote,
        voteProps: voteProps,
        alertArray: alertArray,
        setAlertArray: setAlertArray,
        setVoteProps: setVoteProps,
        alivePlayers: alivePlayers,
        aliveExceptMe: aliveExceptMe,
        myTeamFree: myTeamFree,
        voteFunctionName: voteFunctionName,
        setVoteFunctionName: setVoteFunctionName,
        turn: "",
        turnPlayer: "",
        killableExceptTeam: killableExceptTeam,
        aliveExceptTeam: aliveExceptTeam,
        actionCallBack: (arg:any) => {},
    }

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
        props.socket.on("Player data", (data: FullInfoPlayer) => {
            setMyData(data);
        })
        return () => {
            socket.off("Player data")
        }
    }, [])
    useEffect(() => {
        props.socket.on("snackbar", (type: "success" | "info" | "warning" | "error", text: string) => {
            console.log("SNACKBAR", text)
            setSnackbarType(type);
            setSnackbarText(text);
        })
        return () => {
            socket.off("snackbar")
        }
    }, [])
    useEffect(() => {
        props.socket.on("votesNumber", (votes: number, allVotes: number) => {
            setVotesNumber({votes: votes, allVotes: allVotes});
        })
        return () => {
            socket.off("votesNumber");
        }
    }, [])
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
    useEffect(() => {
        props.socket.on("chatState", (state: boolean) => {
            setChatActive(state);
        })
        return () => {
            props.socket.off("chatState");
        }
    }, [])
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
    })
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
    }, [])
    useEffect(() => {
        socket.on("fullInfoPlayers", (fullInfoArr: any) => {
            setFullInfoPlayers((prevFull:any) => {
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
    useEffect (() => {
        socket.on("setTime", (number:number, time: "time") => {
            setGameTime({dayTime: time, dayNumber: number});
        })
        return () => {
            socket.off("setTime");
        }
    })
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
    },[alertArray,setAlertArray])
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
    }, [])
    useEffect(() => {
            socket.on("start", (turn: string, player: string, data?: any) => {
                gameData.turn = turn;
                gameData.turnPlayer = player;
                console.log(turn, "TURN")
                if(player === myData.characterName) {
                    if(data === undefined)
                    playerActions[turn](socket, io, gameData)
                    else 
                    playerActions[turn](socket, io, gameData, data)
                }
            })
            return () => {
                socket.off("start");
            }

    },[gameData])
    useEffect(() => {
        socket.on("prison", (player: string) => {
            console.log("PRISON", player)
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
        socket.on("statueTeam", (team: string) => {
            setStatueTeam(team);
        })
        return () => {
            socket.off("statueTeam");
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
            console.log("ALERT", props)
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
    })

    function vote(voteState: boolean) {
        let s:any = []        
        if(voteFunctionName === "myTeamFree") s = myTeamFree()
        if(voteFunctionName === "voteProps") s = voteProps.votedObjects
        if(voteFunctionName === "aliveExceptMe") s = aliveExceptMe()
        if(voteFunctionName === "killableExceptTeam") s = killableExceptTeam();
        if(voteFunctionName === "aliveExceptTeam") s = aliveExceptTeam();
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
                fullInfoPlayers={fullInfoPlayers}
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
                <GameState whoseTurn={whoseTurn} gameTime={gameTime} whoHasStatue={statueTeam}/>
                <RequestAlertList socket={socket} alertArray={alertArray} setAlertArray={setAlertArray} gameData={gameData}/>
                {renderChat()}
                {vote(isVote)}
                <PlayerTable
                    socket={socket}
                    players={allPlayers}
                    crewmates={[]}
                    disclosedPlayers={fullInfoPlayers}
                    duelFunction={() => {}}
                    inspectionFunction={() => {}}
                    extraButtons={actionButtons()}
                    specialButtons={specialButtons()}
                    myData={myData}
                    prison={prison}
                    drunk={drunk}
                    szulered={szulered}
                />
                <Snackbar open={snackbarText === "" ? false : true} autoHideDuration={6000} onClose={() => {}}>
                    <Alert onClose={() => setSnackbarText("")} severity={snackbarType}>
                        {snackbarText}
                    </Alert>
                </Snackbar>
        </div> 
    )
}