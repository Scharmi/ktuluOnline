import { EnterNickname } from './EnterNickname/EnterNickname'
import { templatePlayers, 
    templateVoteResult, 
    templatePlayer, 
    templateCrewmates, 
    templateDisclosed, 
    templateActionButtons,
    templateSpecialButtons,
    templateGameState,
    templateFullInfoPlayer
} from '../Game/templates/templates'
import { ConnectedPlayers } from './ConnectedPlayers/ConnectedPlayers'
import { VotingInterface } from '../Game/VotingInterface/VotingInterface'
import { Chat } from '../Game/Chat/Chat'
import { Button } from '@material-ui/core'

import { useEffect, useState } from 'react'
interface Props {
    socket: any;
    setGameState: Function;
    gameState: any
}

export function PreGame(props: Props) {
    
    const [choosePlayers, setChoosePlayers] = useState(false);
    const [voteOptions, setVoteOptions] = useState([])
    const [myName, setMyName] = useState("");
    const [playerNames, setPlayerNames] = useState(["Ładowanie..."])
    const [enteredName, setEnteredName] = useState(false);
    const [adminSet, setAdminSet] = useState(false)
    const [adminState, setAdminState] = useState<boolean>(false);
    console.log("PREGAME RENDER", adminState)
    function St(arg:any) {
        return JSON.stringify(arg);
    }
    function submitName(name:string, isAdmin: boolean) {
        props.socket.emit("enterName", name, isAdmin);
        setMyName(name);
        setEnteredName(true);
    }
    useEffect(() => { 
        props.socket.on("Player names", (arg:any) => {
                setPlayerNames(arg);
                console.log("NAMES",arg, playerNames);
        });
        props.socket.on("Player left", (arg:any) => {
                setPlayerNames(arg);
                console.log("left",arg);
        });
        props.socket.once("Choose characters", (playersNumber: number, characters: any) => {
            let voteOptionsArr:any = [];
            for(let i = 0; i < characters.length; i++) {
                voteOptionsArr.push({name: characters[i].characterName, id: characters[i].characterId})
            }
            setChoosePlayers(true);
            setVoteOptions(voteOptionsArr);
            console.log("GOT OPTIONS", voteOptions, voteOptionsArr)            
        });

        return () => {
            props.socket.off("Player left")
        }
    }, []);
    useEffect(() => {
        props.socket.on("Game started", () => {
            props.socket.emit("Game started response");
            console.log("ADMIN:", adminState)
            if(adminState) props.setGameState("adminPanel")
            else props.setGameState("game")
        });
        return () => {
            props.socket.off("Game started")
        }
    }, [adminState])

    function choosePlayersCallback(players: any) {
        props.socket.emit("Chosen characters", players)
        setAdminState(true);
    }
    if(enteredName === false) {
        return (
            <div className="preGame">
                <EnterNickname submitNickNameCallback={submitName} socket={props.socket} setAdmin={setAdminState}/>
            </div>
        )
    }
    else { 
        if(choosePlayers === false) {
            if(adminState !== undefined) {
                return (
                    <div className="preGame">
                        <ConnectedPlayers playersList={playerNames} myNick={myName} socket={props.socket} admin={adminState}/>
                    </div>
                )
            }
            else {
                return <div>ERROR</div>
            }

        }
        else {
            return (
                <div className="preGame">
                    <VotingInterface 
                        votedObjects={voteOptions} 
                        type={"choosingCharacters"} 
                        callBack={choosePlayersCallback} 
                        minChosen={playerNames.length} 
                        maxChosen={playerNames.length}
                        fullInfoPlayers={[]}
                        voteState="choosing"
                        setIsVote={(arg:any) => {}}
                    />
                </div>
            )
        }

        
    }

}