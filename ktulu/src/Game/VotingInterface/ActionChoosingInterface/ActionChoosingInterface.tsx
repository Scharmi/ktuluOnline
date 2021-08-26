import React, {useState} from 'react'
import { ChoosingInterface } from "./ChoosingInterface"
import { Player } from "../../../interfaces/interfaces"
import './ActionChoosingInterface.css'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
interface Crewmate {
    id: number;
    name: string;
    characterId: number;
    character: string;
    teamId: number;
    isAlive: boolean;
    isArrested?: number;
    isDrunk?: number;
}
interface myState {
    id: number;
    name: string;
    characterId: number;
    character: string;
    teamId: number;
    isAlive: boolean;
    isArrested?: boolean;
    isDrunk?: boolean;
}
interface Props {
    allPlayers?: Array <Player>;
    crewmates?: Array <Crewmate>;
    votedObjects?: any;
    myState?: myState;
    callBack: Function;
    type: string
    votes?: number;
    allVotes?: number;
    maxChosen?: number;
    minChosen?: number;
}
interface Item {
    id: number;
    text: string;
}
export function ActionChoosingInterface (props: Props) {
    function Alert(props: any) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event: React.SyntheticEvent, reason: any) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const [voted, setVoted] = useState <number> (0);
    function callBack(clickedQueue: Array <number>) {
        handleClick();
        setVoted(1);
        props.callBack(clickedQueue);
    }
    let items: Array<Item> = [];
    for(let i = 0; i < props.votedObjects.length; i++) {
        if(typeof(props.votedObjects[i].name) !== undefined)
        items.push(
            {
                text: props.votedObjects[i].name,
                id: props.votedObjects[i].id
            }
        )
    }
    let maxChosen = 1;
    let minChosen = 1;
    if (props.type === "dailyinspection") {
        minChosen = 2;
        maxChosen = 2;
    }
    if (typeof(props.maxChosen) != "undefined") maxChosen = props.maxChosen;
    if (typeof(props.minChosen) != "undefined") minChosen = props.minChosen;
    function upperText(type: string, vote: number, votes?: number, allVotes?: number) {
        if (vote === 1) {
            if((type === "duel") || (type === "isHanging") || (type === "hanging") || (type === "dailyinspection") || (type === "dailyinspection")){
                return "Oczekiwanie na resztę graczy, zagłosowało " + votes + "/" + allVotes + " uprawnionych";
            }
            return "Pomyślnie dokonano wyboru";
        }
        else {
            if(type === "duel") return "Kto ma zostać zabity w pojedynku?";
            if(type === "giveStatue") return "Kto ma mieć przy sobie posążek?";
            if(type === "character") return "Czyją tożsamość chcesz sprawdzić?";
            if(type === "isHanging") return "Czy wieszamy dzisiaj?";
            if(type === "hanging") return "Kogo wieszamy?";
            if(type === "dailyInspection") return "Kto ma zostać dzisiaj przeszukany?";
            if(type === "dailyinspectionPropositions") return "Czyją kandydaturę do przeszukania chcesz zgłosić?";
            if(type === "killing") return "Kogo chcesz zabić?";
            if(type === "inspection") return "Kogo chcesz przeszukać?";
            if(type === "herbs") return "Komu chcesz podać ziółka?";
            if(type === "drinking") return "Kogo chcesz upić?";
            if(type === "playing") return "Z kim chcesz zagrać";
            if(type === "dziwka") return "Kogo chcesz zdziwić?";
            if(type === "pastor") return "Kogo chcesz spasteryzować?";
            if(type === "szeryf") return "Kogo chcesz zamknąć w więzieniu?";
            if(type === "szantazysta") return "Kogo chcesz zaszantażować";
            if(type === "uwodziciel") return "Kogo chcesz uwieść";
            if(type === "choosingCharacters") return "Wybierz grające postaci (" + props.minChosen + ")";
        }
        
    }
    let abstainAllowed:number = (props.type === "duel") ? 1 : 0;
    function chooseInterfaceRender(voteState: number) {
        if(voteState) return <></>;
        return (
            <ChoosingInterface 
            items = {items} 
            callBack = {callBack} 
            maxChosen = {maxChosen}
            abstainAllowed = {abstainAllowed}
            minChosen={minChosen}
            />    
        )
    }
    return (
        <div className="actionInterfaceWrapper">
            <div className="actionInterface">
                    <div className="innerContentWrapper">
                        <h2>{upperText(
                            props.type,
                            voted, 
                            props.votes, 
                            props.allVotes
                            )}
                        </h2>
                    </div>
                    {chooseInterfaceRender(voted)}
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Głos został oddany pomyślnie
                        </Alert>
                     </Snackbar>
            </div>
        </div>
    )
}