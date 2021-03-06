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
            if((type === "duel") || (type === "isHanging") || (type === "hanging") || (type === "dailyInspection") || (type === "dailyinspection")){
                return "Oczekiwanie na reszt?? graczy, zag??osowa??o " + votes + "/" + allVotes + " uprawnionych";
            }
            return "Pomy??lnie dokonano wyboru";
        }
        else {
            if(type === "duel") return "Kto ma zosta?? zabity w pojedynku?";
            if(type === "giveStatue") return "Kto ma mie?? przy sobie pos????ek?";
            if(type === "character") return "Czyj?? to??samo???? chcesz sprawdzi???";
            if(type === "isHanging") return "Czy wieszamy dzisiaj?";
            if(type === "hanging") return "Kogo wieszamy?";
            if(type === "dailyInspection") return "Kto ma zosta?? dzisiaj przeszukany?";
            if(type === "dailyinspectionPropositions") return "Czyj?? kandydatur?? do przeszukania chcesz zg??osi???";
            if(type === "killing") return "Kogo chcesz zabi???";
            if(type === "inspection") return "Kogo chcesz przeszuka???";
            if(type === "herbs") return "Komu chcesz poda?? zi????ka?";
            if(type === "burmistrz") return "Czy chcesz u??askawi?? wieszanego gracza?";
            if(type === "drinking") return "Kogo chcesz upi???";
            if(type === "playing") return "Z kim chcesz zagra??";
            if(type === "dziwka") return "Kogo chcesz zdziwi???";
            if(type === "pastor") return "Kogo chcesz spasteryzowa???";
            if(type === "szeryf") return "Kogo chcesz zamkn???? w wi??zieniu?";
            if(type === "szantazysta") return "Kogo chcesz zaszanta??owa??";
            if(type === "uwodziciel") return "Kogo chcesz uwie????";
            if(type === "choosingCharacters") return "Wybierz graj??ce postaci (" + props.minChosen + ")";
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
                            G??os zosta?? oddany pomy??lnie
                        </Alert>
                     </Snackbar>
            </div>
        </div>
    )
}