import { Player } from '../../interfaces/interfaces'
import { Button } from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'
import './RequestAlert.css'
interface Props {
    gameData: any;
    alertProps: any;
    callbackYes?: Function;
    callbackNo?: Function;
    alertArray: any;
    setAlertArray: any;
    id: number;
    socket: any;
}
export function RequestAlert(props: Props) {
    function callBackYes()  {
        if(props.alertProps.type === "duelInvite") {
            props.socket.emit("duelAccept", props.gameData.myData.name, props.alertProps.player);
            props.setAlertArray(props.id)
        }
        else {
            if(typeof(props.callbackYes) !== "undefined")
            props.callbackYes();
        }
    }
    function callBackNo()  {
        if(props.alertProps.type === "duelInvite") {
            props.socket.emit("duelDecline", props.gameData.myData.name, props.alertProps.player);
            props.setAlertArray(props.id)
        }
        else {
            if(typeof(props.callbackNo) !== "undefined")
            props.callbackNo();
        }
    }
    function header() {
        if(props.alertProps.type === "duelInvite") return "Gracz " + props.alertProps.player + " wyzwał Cię na pojedynek";
        if(props.alertProps.type === "inspection") return "Gracz " + props.alertProps.player + " zgłosił Cię do przeszukania ";
        if(props.alertProps.type === "dziwkaActive") return "Dziwisz gracza " + props.alertProps.player.name;
        if(props.alertProps.type === "dziwkaPassive") return "Zostałeś zdziwiony";
        if(props.alertProps.type === "pastor") return "Spasteryzowałeś gracza " + props.alertProps.name;
        if(props.alertProps.type === "turnSkip") return "Gracz " + props.alertProps.name + " został upity, zamknięty w więzieniu lub zużył swoją umiejętność";
        if(props.alertProps.type === "szeryfPassive") return "Zostałeś zamknięty w więzieniu";
        if(props.alertProps.type === "isAction") return "Czy chcesz użyć swojej umiejętności?";
        if(props.alertProps.type === "isHangingEnd") return "Zakończyło się głosowanie dotyczące tego czy wieszamy";
        if(props.alertProps.type === "nextVote") return "Zakończyło się głosowanie";
        if(props.alertProps.type === "duelsTurnEnd") return "Jeśli chcesz zakończyć turę pojedynków kliknij przycisk poniżej";
        if(props.alertProps.type === "duelEnd") return "Zakończył się pojedynek graczy " + props.alertProps.p1 + " i " + props.alertProps.p2;
        if(props.alertProps.type === "hangingEnd") return "Powieszony ma zostać " + props.alertProps.p1;
        if(props.alertProps.type === "herbsKill") return "Graczowi " + props.alertProps.player + " zostały podłożone ziółka";
        if(props.alertProps.type === "voteEnd") {
            let s = "";
            if(props.alertProps.voteType === "duel") s = " w pojedynku między graczami " + props.alertProps.votedObjects[0].name + " i " + props.alertProps.votedObjects[1].name
            return "Trwa głosowanie " + s;
        }
        if(props.alertProps.type === "nonClosing") return props.alertProps.header;
        if(props.alertProps.type === "default") return props.alertProps.header;
        return "UNKNOWN TYPE"
    }
    function bottomText() {
        if(props.alertProps.type === "duelInvite") return "Z racji tego że szyeryf jest żywy możesz odmówić"
        if(props.alertProps.type === "dziwkaActive") return "Gracz ten należy do frakcji " + props.alertProps.player.team + " a jego postać to " + props.alertProps.player.characterName
        if(props.alertProps.type === "dziwkaPassive") return "Dziwką okazał się gracz " + props.alertProps.player.name;
        if(props.alertProps.type === "pastor") return "Pochodzi on z frakcji " + props.alertProps.team;
        if(props.alertProps.type === "turnSkip") return "Żeby nie zdradzać jaką postacią jest ta osoba przez natychmiastowe pominięcie tury kliknij poniższy przycisk po czasie symulującym turę gracza";
        if(props.alertProps.type === "szeryfPassive") return "Nie możesz wykonywać akcji w tej nocy, ale nie możesz też być zabity";
        if(props.alertProps.type === "duelEnd") return "Kliknij żeby zakończyć zapoznawanie się graczy z wynikami głosowania oraz 5 sekund dla sędziego"
        if(props.alertProps.type === "voteEnd") return "Jeśli chcesz wymusić jego koniec kliknij poniższy przycisk";
        if(props.alertProps.type === "nextVote") return "Nie dało ono jedna ostatecznego rozstrzygnięcie, więc potrzebne będzie kolejne z pewnym podzbiorem opcji. Daj graczom czas na zapoznanie się z wynikiem głosowania a następnie przejdź do 'dogrywki'";
        if(props.alertProps.type === "duelsTurnEnd") return "Zrób to jeśli gracze nie chcą wykorzystać dziennego limitu pojedynków, w innym wypadku tura skończy się automatycznie po jego wyczrpaniu";
        if(props.alertProps.type === "isHangingEnd") return "Daj graczom czas na zapoznanie się z wynikiem głosowania a następnie kliknij przycisk poniżej";
        if(props.alertProps.type === "herbsKill") return "Aby go zabić kliknij poniższy przycisk w odpowiednim momencie";
        if(props.alertProps.type === "hangingEnd") return "Kliknij żeby zakończyć zapoznawanie się graczy z wynikami głosowania oraz 5 sekund dla burmistrza";
        if(props.alertProps.type === "default") return props.alertProps.bottomText;
        if(props.alertProps.type === "nonClosing") return props.alertProps.bottomText;
        return ""
    }
    function closeAlert() {
        let notClosing = ["nonClosing", "duelInvite", "isAction", "duelEnd", "nextVote", "isHangingEnd", "herbsKill", "duelsTurnEnd"]
        if(!notClosing.includes(props.alertProps.type))
        return (<Button onClick={() => {
            props.setAlertArray(props.id)
        }}><Clear /></Button>)
        else { 
            return <></>
        }
    }
    function buttons() {
        if(props.alertProps.type === "duelInvite") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {callBackYes()}}>Przyjmij</Button>
                </div>
                <div className="buttonWrapper">
                    <Button variant="contained" color="secondary" onClick={() => {callBackNo()}}>Odrzuć</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "isAction") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {callBackYes(); props.setAlertArray(props.id)}}>Tak</Button>
                </div>
                <div className="buttonWrapper">
                    <Button variant="contained" color="secondary" onClick={() => {callBackNo(); props.setAlertArray(props.id)}}>Nie</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "turnSkip") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {props.socket.emit("turnSkip", props.alertProps.turn, props.gameData.myData.characterName); props.setAlertArray(props.id)}}>Pomiń turę</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "duelEnd") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {props.socket.emit("duelEnd"); props.setAlertArray(props.id)}}>Zakończ pojedynek</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "hangingEnd") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {props.socket.emit("hangingEnd"); props.setAlertArray(props.id)}}>Zakończ wieszanie</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "herbsKill") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {props.socket.emit("herbsKill"); props.setAlertArray(props.id)}}>Zabij gracza z ziółkami</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "duelsTurnEnd") return (
            <div className="buttonsWrapper2">
            <div className="buttonsWrapper">
                <div className="buttonWrapper">
                    <Button variant="contained" color="primary" onClick={() => {props.socket.emit("end", "duelsTurn"); props.setAlertArray(props.id)}}>Zakończ turę pojedynków</Button>
                </div>
            </div>
            </div>
        )
        if(props.alertProps.type === "voteEnd") {
            const callback = () => {
                props.setAlertArray(props.id)
                props.alertProps.callback();
                
            }
            return (
                <div className="buttonsWrapper2">
                    <div className="buttonsWrapper">
                        <div className="buttonWrapper">
                            <Button variant="contained" color="primary" onClick={() => callback()}>Wymuś zakończenie głosowania</Button>
                        </div>
                    </div>
                </div>
            ) 
        }
        if(props.alertProps.type === "nextVote") {
            const callback = () => {
                props.setAlertArray(props.id)
                props.socket.emit("nextVote");
            }
            return (
                <div className="buttonsWrapper2">
                    <div className="buttonsWrapper">
                        <div className="buttonWrapper">
                            <Button variant="contained" color="primary" onClick={() => callback()}>Przejdź do kolejnego głosowania</Button>
                        </div>
                    </div>
                </div>
            ) 
        }
        if(props.alertProps.type === "isHangingEnd") {
            const callback = () => {
                props.setAlertArray(props.id)
                props.socket.emit("isHangingEnd");
            }
            return (
                <div className="buttonsWrapper2">
                    <div className="buttonsWrapper">
                        <div className="buttonWrapper">
                            <Button variant="contained" color="primary" onClick={() => callback()}>Zakończ fazę zapoznawania się z wynikami</Button>
                        </div>
                    </div>
                </div>
            ) 
        }
        return <></>
    }
    return (
        <div className="Wrapper">
        <div className="requestAlertWrapper">
                <div className="requestAlert">
                    <div>
                        <div className="closeButton"><div className="closeButtonInner">{closeAlert()}</div></div>
                            <div className="content">
                            <h2>{header()}</h2>
                            <h4>{bottomText()}</h4>
                            {buttons()}
                            </div>
                    </div>
            </div>
        </div>
        </div>
    )
    return <div></div>

}