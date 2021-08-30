import './GameState.css'
interface Time {
    dayTime: string;
    dayNumber: number;
}
interface Props {
    gameTime: Time;
    whoseTurn: string;
    whoHasStatue: string;
}
export function GameState(props: Props) {
    function timeMessage () {
        let dayTimeMessage = (props.gameTime.dayTime === "day") ? "dzień" : "noc";
        return props.gameTime.dayNumber + ". " + dayTimeMessage;
    }
    function whoseTurn() {
        return "Aktualna tura: " + props.whoseTurn;
    }
    function whoHasStatue() {
        if(props.whoHasStatue === "indianie") return "Posążek mają indianie";
        if(props.whoHasStatue === "bandyci") return "Posążek mają bandyci";
        if(props.whoHasStatue === "miastowi") return "Posążek mają dobrzy miastowi";
        if(props.whoHasStatue === "ufoki") return "Posążek mają ufoki";
        return "Posążek ma " + props.whoHasStatue;
    }
    return (
        <div className="gameState">
            <h2 className="gameTime">{timeMessage()}</h2>
            <h2 className="whoseTurn">{whoseTurn()}</h2>
            <h2 className="whoHasStatue">{whoHasStatue()}</h2>
        </div>
    )
}