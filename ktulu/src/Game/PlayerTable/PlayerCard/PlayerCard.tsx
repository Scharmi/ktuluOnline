import  { Card, Divider, Button }  from '@material-ui/core'
import { Player, FullInfoPlayer } from '../../../interfaces/interfaces'
import { Lock, LocalBar } from '@material-ui/icons'
import szulerImage from './icons/szuler.png';
import './PlayerCard.css'
export interface ButtonProps {
    text: string;
    function: Function;
    isEnabled: boolean;
    
}
interface Props {
    player: Player;
    fullInfoPlayer?: FullInfoPlayer;
    extraButtons?: Array <ButtonProps>
    myId: number;
    socket: any;
    prison?: boolean;
    drunk?: boolean;
    szulered?: boolean;
}
export function PlayerCard(props: Props) {
    function innerWrapperName(isAlive: boolean) {
        if(isAlive === true) return "cardInnerWrapperAlive";
        return "cardInnerWrapperDead";
    }
    let team = (typeof(props.fullInfoPlayer) === "undefined") ? "" : props.fullInfoPlayer.team;
    function prisonIcon() {
        if(props.prison !== undefined) {
            if(props.prison === true) {
                return <Lock/>
            }
            return "";
        }
        return "";
    }
    function szuleredIcon() {
        if(props.szulered !== undefined) {
            if(props.szulered === true) {
                return <img src={szulerImage}  className="szuler"/>
            }
            return "";
        }
        return "";
    }
    function drunkIcon() {
        if(props.drunk !== undefined) {
            if(props.drunk === true) {
                return <LocalBar/>
            }
            return "";
        }
        return "";
    }
    let name = "";
    let isAlive = false;
    if(typeof(props.player) !== "undefined")  name = props.player.name;
    if(typeof(props.fullInfoPlayer) !== "undefined")  name = props.fullInfoPlayer.name;
    function extraButtonsComponent(extraButtons: Array<ButtonProps>) {
        function actionButton(button: ButtonProps) {
            if((button.isEnabled) && (isAlive === true)) return <Button onClick={() => {button.function(name)}}><h5 className={team + "ButtonText"}>{button.text}</h5></Button>
            return <Button disabled><h5 className={team + "Disabled"}>{button.text}</h5></Button>
        }
        return extraButtons.map((item) =>
            <div className="cardButtonWrapper">
                <Divider />
                {actionButton(item)}
            </div>
        )
    }
    function isMyself(id: number) {
        if(id === props.myId) return "Me";
        return ""; 
    }
    let extraButtons:Array<ButtonProps> = [];
    if(typeof(props.extraButtons) !== "undefined") extraButtons = props.extraButtons;
    if(typeof(props.fullInfoPlayer) !== "undefined") {
        if (typeof(props.fullInfoPlayer.isAlive) !== "undefined") isAlive = props.fullInfoPlayer.isAlive;
        let playerName = isAlive ? "playerAlive" : "playerDead";
        return (
                <div className={"cardOuterWrapper"}>
                    <div className={isMyself(props.fullInfoPlayer.id)}>
                        <Card>
                            <div className={innerWrapperName(isAlive)}>
                                <div className={props.fullInfoPlayer.team + "Wrapper"}>
                                    <div className="heightControl">
                                        {prisonIcon()}
                                        {drunkIcon()}
                                        {szuleredIcon()}
                                        <b><h3 className={playerName}>{props.fullInfoPlayer.name}</h3></b>
                                        <h5 className={playerName}>{props.fullInfoPlayer.characterName}</h5>
                                        <Divider />
                                        {extraButtonsComponent(extraButtons)}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
        );     
    }
    if(typeof(props.player) !== "undefined") {
        if (typeof(props.player.isAlive) !== "undefined") isAlive = props.player.isAlive;
        let playerName = isAlive ? "playerAlive" : "playerDead";
        return (
                <div className="cardOuterWrapper">
                    <Card>
                        <div className={innerWrapperName(isAlive)}>
                            <div className="noTeamWrapper">
                                <div className="heightControl">
                                    {prisonIcon()}
                                    <b><h3 className={playerName}>{props.player.name}</h3></b>
                                    <h5 className={playerName}>?</h5>
                                    <Divider />
                                    {extraButtonsComponent(extraButtons)}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
        );      
    }
    return <div></div>;

}