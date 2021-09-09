import { useState } from 'react'
import { OptionArray } from "./VotingResults/VotingResults"
import { Player } from "../../interfaces/interfaces"
import { VotingResults } from "./VotingResults/VotingResults";
import { Button, Divider } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { ActionChoosingInterface } from "./ActionChoosingInterface/ActionChoosingInterface";
import './VotingInterface.css'
import { useEffect } from 'react';
interface Props {
    optionList?: Array <OptionArray>;
    type?: string
    votedObjects: any;
    votes?: number;
    allVotes?: number;
    callBack?: any;
    maxChosen?: number;
    minChosen?: number;
    fullInfoPlayers: any;
    voteState: string;
    setIsVote: Function;
    remainingVoters?: Array<string>;
}
function VotingCard (props:Props) {
    let voteState = props.voteState
    if(typeof(props.votedObjects) === "function") console.log("FUNKCJA")
    console.log(typeof(props.votedObjects), props.votedObjects)
    if ((voteState === "gotResults") && (typeof(props.type) !== "undefined") && (typeof(props.optionList) !== "undefined")){
        return (
            <div>
                <Button className="closeButton" onClick={() => {props.setIsVote(false)}}><Close /></Button>
                <VotingResults type={props.type} optionList={props.optionList}/>
            </div>
        )
    }
    if ((voteState === "choosing") && (typeof(props.type) !== "undefined") && (typeof(props.votedObjects) !== "undefined") && (typeof(props.callBack) !== "undefined")) {
        console.log(props.votedObjects, "S1")
        return (
            <div className="votingInterface">
                <ActionChoosingInterface
                    type={props.type}
                    votedObjects={props.votedObjects}
                    callBack={props.callBack}
                    votes={props.votes}
                    allVotes={props.allVotes}
                    maxChosen={props.maxChosen}
                    minChosen={props.minChosen}
                />
                <Divider variant="middle"/>
            </div>
        )
    }
    if(voteState === "closed") {
        return <div></div>
    }
    if(voteState === "adminRemainingVoters") {
        let remainingVoters:Array<string> = [""];
        if(props.remainingVoters !== undefined) {
            remainingVoters = [...props.remainingVoters];
        }
        let remainingVotersMap = remainingVoters.map((voter: string) => {
            return <div>{voter}</div>
        })
        return (
            <div>
                <h2>Nie zagłosowali jeszcze gracze:</h2>
                {remainingVotersMap}
            </div>
        )
    }
    return (<h2>{voteState}, {props.type}, {props.optionList}</h2>)
}
export function VotingInterface(props:Props) {
    return <div className={"votingInterface"}>{VotingCard(props)}</div>;
}