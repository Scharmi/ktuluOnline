import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Person from '@material-ui/icons/Person'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
import './VotingResults.css'


export interface OptionArray {
    optionName: string;
    voters: Array <string>;
    isChosen: number;
}
interface Props {
    type: string;
    optionList: Array <OptionArray>
}
export function VotingResults(props: Props) {
    let newOpenArray: Array<boolean> = [];
    for(let i = 0; i < props.optionList.length; i++) {
        newOpenArray.push(true);
    }
    const [open, setOpen] = React.useState(newOpenArray);
    function handleClick(i: number) {
        let newOpen = [...open];
        newOpen[i] = !newOpen[i];
        setOpen(newOpen);
    };
    function verdict (optionList: Array<OptionArray>, type: string) {
        let chosenArray = "";
        let chosenNumber = 0;
        for(let i = 0; i < optionList.length; i++) {
            if(optionList[i].isChosen === 1) {                
                if(chosenArray !== "") chosenArray += ", "
                chosenArray += optionList[i].optionName;
                chosenNumber++;

            } 
        }
        if(type === "duel") {
            if(chosenNumber === 1) return "W pojedynku zginąć ma " + chosenArray + " jeśli sędzia żyje to ma 5 sekund na ujawnienie się i zmianę wyniku pojedynku";
            if(chosenNumber === 2) return "W pojedynku zginąć mają " + chosenArray + " jeśli sędzia żyje to ma 5 sekund na ujawnienie się i zmianę wyniku pojedynku";
        }
        if(type === "dailyRummage") {
            if(chosenNumber === 1) return "Przeszukany zostaje " + chosenArray;
            if(chosenNumber > 1) return "Przeszukani zostają " + chosenArray;
        }
        if(type === "hanging") {
            if(chosenNumber === 1) return "Powieszony ma zostać " + chosenArray;
        }
        if(type === "isHanging") {
            return chosenArray;
        }
    }
    let listItems = [];
    for (let i = 0; i < props.optionList.length; i++) {
        listItems.push(
            props.optionList[i].voters.map((item) => 
            <ListItem>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItem>
            )
        )
    }
    let listVotedOptions = [];
    function Icon (ifChosen: number) {
        if(ifChosen === 1) return <Check />
        if(ifChosen === 0) return <Clear />
        return <HelpOutline />
    }
    for (let i = 0; i < props.optionList.length; i++) {
        listVotedOptions.push(
            <>
                <ListItem button onClick={() => {handleClick(i)}} color="primary" selected>
                <ListItemIcon>
                    {Icon(props.optionList[i].isChosen)}
                </ListItemIcon>
                <ListItemText primary={props.optionList[i].optionName + ": " + props.optionList[i].voters.length + " głosów"}/>
                    {open[i] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[i]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {listItems[i]}
                    </List>
                </Collapse>
            </>
        );
    }
    return (
    <div className={"votingResults"}>
        <h2 className="verdict">{verdict(props.optionList, props.type)}</h2>
        <List
        component="nav"
        >
        {listVotedOptions}
        
        </List>
    </div>
    )
}