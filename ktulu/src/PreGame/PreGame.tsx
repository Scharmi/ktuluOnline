import { EnterNickname } from './EnterNickname/EnterNickname'
import { ConnectedPlayers } from './ConnectedPlayers/ConnectedPlayers'
import { VotingInterface } from '../Game/VotingInterface/VotingInterface'
import { TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
interface Props {
    socket: any;
    setGameState: Function;
    gameState: any
}

export function PreGame(props: Props) {
    
    const [choosePlayers, setChoosePlayers] = useState(false);
    const [voteOptions, setVoteOptions] = useState([]);
    const [myName, setMyName] = useState("");
    const [playerNames, setPlayerNames] = useState(["Ładowanie..."]);
    const [enteredName, setEnteredName] = useState(false);
    const [adminState, setAdminState] = useState<boolean>(false);
    const [pojedynki, setPojedynki] = useState("2");
    const [bandyci, setBandyci] = useState("3");
    const [przeszukania, setPrzeszukania] = useState("2");
    const [password, setPassword] = useState("");
    const handlePojedynkiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPojedynki(event.target.value);
    };
    const handleBandyciChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBandyci(event.target.value);
    };
    const handlePrzeszukaniaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrzeszukania(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    function submitName(name:string, isAdmin: boolean) {
        props.socket.emit("enterName", name, isAdmin, password);
        setMyName(name);
        setEnteredName(true);
    }
    useEffect(() => { 
        props.socket.on("Player names", (arg:any) => {
                setPlayerNames(arg);
        });
        props.socket.on("Player left", (arg:any) => {
                setPlayerNames(arg);
        });
        props.socket.once("Choose characters", (playersNumber: number, characters: any) => {
            let voteOptionsArr:any = [];
            for(let i = 0; i < characters.length; i++) {
                voteOptionsArr.push({name: characters[i].characterName, id: characters[i].characterId})
            }
            setChoosePlayers(true);
            setVoteOptions(voteOptionsArr);
        });

        return () => {
            props.socket.off("Player left");
            props.socket.off("Player names");
            props.socket.off("Choose characters");
        }
    }, [playerNames, props.socket, voteOptions]);
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
    }, [adminState, props])

    function choosePlayersCallback(players: any) {
        props.socket.emit("Chosen characters", players)
        props.socket.emit("gameProps", pojedynki, bandyci, przeszukania)
        setAdminState(true);
    }
    function passwordRender() {
        if(adminState) return   <TextField
        fullWidth
        variant="filled"
        placeholder=""
        type="password"
        label="Hasło"
        value={password}
        onChange={handlePasswordChange}      
        />
        else return <></>
    }
    if(enteredName === false) {
        return (
            <div className="preGame">
                <EnterNickname submitNickNameCallback={submitName} socket={props.socket} setAdmin={setAdminState}/>
                {passwordRender()}
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
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        placeholder=""
                        label="Liczba pojedynków w ciągu dnia"
                        value={pojedynki}
                        onChange={handlePojedynkiChange}     
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        placeholder=""
                        label="Poranek którego odpływają bandyci"
                        value={bandyci}
                        onChange={handleBandyciChange}     
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        placeholder=""
                        label="Liczba przeszukań w ciągu dnia"
                        value={przeszukania}
                        onChange={handlePrzeszukaniaChange}      
                    />
                </div>
            )
        }

        
    }

}