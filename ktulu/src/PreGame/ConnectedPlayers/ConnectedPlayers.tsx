import './ConnectedPlayers.css'
import { Button } from '@material-ui/core'
interface Props {
    playersList: Array<string>;
    myNick: string;
    admin: boolean;
    socket: any;
}
export function ConnectedPlayers(props: Props) {
    function startGame() {
        props.socket.emit("Game start")
    }
    function listElement(name: string) {
        if(name === props.myNick) return <h2 className="myName">{name}</h2>
        return <h2 className="name">{name}</h2>
    }
    let list = props.playersList.map((item) => 
        <div>{listElement(item)}</div>
    );
    if(props.admin === false) {
        return (
            <div>
                <h1>Dołączyli gracze:</h1>
                <div>{list}</div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Dołączyli gracze:</h1>
                <div>{list}</div>
                <Button variant="contained" color="primary" onClick={() => {startGame()}}>Zacznij grę</Button>
            </div>
        )
    }

}