import { PlayerCard, ButtonProps } from './PlayerCard/PlayerCard'
import { FullInfoPlayer, Player } from '../../interfaces/interfaces'
import { templateFullInfoPlayer } from '../templates/templates'
import './PlayerTable.css'
interface SpecialOptions {
    extraButtons?: Array<ButtonProps>;
    id: number;
}
interface Props {
    socket: any;
    players: Array<Player>
    crewmates: Array<FullInfoPlayer>
    disclosedPlayers: Array<FullInfoPlayer>
    duelFunction?: Function
    inspectionFunction?: Function
    extraButtons?: Array<ButtonProps>
    specialButtons?: Array<SpecialOptions>
    myData: FullInfoPlayer
    prison: string,
    drunk: string,
    szulered: string
}
export function PlayerTable (props: Props) {
    let ifSpecialButtons: Array<number>= [];
    let specialButtonIndex: Array<number> = [];
    if(typeof(props.specialButtons) !== "undefined") {
        for(let i = 0; i < props.specialButtons.length; i++) {
            ifSpecialButtons[props.specialButtons[i].id] = 1;
            specialButtonIndex[props.specialButtons[i].id] = i;
        }
    }
    let isFullInfo: Array<number> = [];
    let indexTable: Array<number> = [];
    for(let i = 0; i < props.crewmates.length; i++) {
        isFullInfo[props.crewmates[i].id] = 1;
        indexTable[props.crewmates[i].id] = i;
    }
    let isFullInfoDisclosed: Array<number> = [];
    for(let i = 0; i < props.disclosedPlayers.length; i++) {
        isFullInfoDisclosed[props.disclosedPlayers[i].id] = 1;
        indexTable[props.disclosedPlayers[i].id] = i;
    }
    function compareFunction (a: Player, b: Player) {
        if((a.isAlive === true) && (b.isAlive === false)) return -1;
        if((b.isAlive === true) && (a.isAlive === false))  return 1;
        if(a.id > b.id) return -1;
        return 1;
    }
    function extraButtons(id: number) {
        if((ifSpecialButtons[id] === 1) && (typeof(props.specialButtons) !== "undefined")) 
            return props.specialButtons[specialButtonIndex[id]].extraButtons;
        if(typeof(props.extraButtons) !== "undefined")
            return props.extraButtons;
    }
    let players = props.players;
    players.sort(compareFunction);
    function fullInfoProps(id: number) {
        if(isFullInfo[id]) {
            return props.crewmates[indexTable[id]];
        }
        if(isFullInfoDisclosed[id]) {
            return props.disclosedPlayers[indexTable[id]];
        }
        if(id === props.myData.id) {
            return props.myData
        }
        return undefined;
    }
    function isPrison(name: any) {
        if(name === props.prison) return true;
        return false
    }
    function isDrunk(name: any) {
        if(name === props.drunk) return true;
        return false
    }
    function isSzulered(name: any) {
        if(name === props.szulered) return true;
        return false
    }
    let listPlayers = players.map((item) =>
        <PlayerCard 
            key = {item.name}
            socket={props.socket}
            prison={isPrison(item.name)} 
            drunk={isDrunk(item.name)} 
            szulered={isSzulered(item.name)} 
            player={item} 
            fullInfoPlayer={fullInfoProps(item.id)} 
            extraButtons={extraButtons(item.id)} 
            myId={props.myData.id}
        />
    );
    return (
        <div className="playerTable">{listPlayers}</div>
    )
}