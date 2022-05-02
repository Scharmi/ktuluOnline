import { RequestAlert } from './RequestAlert'
import './RequestAlertList.css'
interface Props {
    socket: any;
    alertArray: any;
    setGameState: any;
    gameData: any;
}
export function RequestAlertList(props: Props) {
    let alertArray = props.alertArray;
    function deleteAlert(index: any) {
        props.setGameState((prevState:any) => {
            console.log("DELETE@")
            let newArr = [...prevState.alerts];
            newArr.splice(index, 1);
            return {...prevState, alerts: newArr};
        })
    }
    let AlertList = alertArray.map((item: any) => {
        let callBackNo = (item.callBackNo === undefined) ? null : item.callBackNo 
        let callBackYes = (item.callBackNo === undefined) ? null : item.callBackYes
        return (
            <div className="alert">
                <RequestAlert 
                    key = {item}
                    socket={props.socket} 
                    alertProps={item} 
                    alertArray={alertArray} 
                    setAlertArray={deleteAlert} 
                    id={alertArray.indexOf(item)}
                    callbackNo={callBackNo}
                    callbackYes={callBackYes}
                    gameData={props.gameData}
                />
            </div>
        )
    }
    )
    return (
        <div className="alertList">{AlertList}</div>
    )
}