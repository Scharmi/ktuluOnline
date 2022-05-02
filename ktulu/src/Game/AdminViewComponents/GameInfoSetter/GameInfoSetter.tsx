import { useState, ChangeEvent } from 'react'
import './GameInfoSetter.css'
import { Button, Select, Dialog, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { Close } from '@material-ui/icons'
interface Time {
    dayTime: string;
    dayNumber: number;

}
interface GameInfo {
    gameTime: Time;
    whoseTurn: string;
    whoHasStatue: string;
}
interface Props {
    GameInfo: GameInfo;
    callBack: Function;
}
export function GameInfoSetter(props: Props) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(
        {
            gameTime: {
                dayTime: props.GameInfo.gameTime.dayTime,
                dayNumber: props.GameInfo.gameTime.dayNumber,
            },
            whoseTurn: props.GameInfo.whoseTurn,
            whoHasStatue: props.GameInfo.whoHasStatue
        }
       );
    function confirmFunction(chosenState: GameInfo) {
        props.callBack(chosenState);
        setOpen(false);
    }
    const changeDay = (event: React.ChangeEvent<{ value: unknown }>) => {
        let newState = {...state};
        newState.gameTime = JSON.parse(event.target.value as string)
        setState(newState)
    };        
    let dayOrNight = (props.GameInfo.gameTime.dayTime === "day") ? 1 : 0;
    let timeValue = 2 * props.GameInfo.gameTime.dayNumber + dayOrNight;
    function optionValues(GameInfo: GameInfo) {
        let optionArray = []

        for(let i = 1; i <= timeValue; i++) {
            if(i % 2 === 1) {
                optionArray.push (<option value={JSON.stringify({dayTime: "night", dayNumber: Math.round(i/2-0.1)})}>{Math.round(i/2-0.1)}. noc</option>);
            }
            else {
                optionArray.push (<option value={JSON.stringify({dayTime: "day", dayNumber: Math.round(i/2)})}>{i/2}. dzień</option>);
            }
        } 
        return optionArray;
    }
    return (
        <div className="GameInfoSetter">
            <Button onClick={() => {setOpen(true)}}>Zmień czas gry</Button>
            <Dialog open={open}>
                <div className="dialogContent">

                    <div className="closeButtonWrapper">
                        <Button onClick={() => {setOpen(false);}}><Close /></Button>
                    </div>  
                    <div className="dialogTitleWrapper">
                        <h2 className="dialogTitle">Zmień czas w grze:</h2>
                    </div>
                    <div className="optionsWrapper">
                        <div className="selectWrapper">
                            <FormControl className="select">
                                <InputLabel>Czas:</InputLabel>
                                <Select
                                native
                                value={JSON.stringify(state.gameTime)}
                                onChange={changeDay}
                                inputProps={{
                                    name: "dayTime",
                                }}
                                >
                                {optionValues(props.GameInfo)}
                                </Select>
                            </FormControl> 
                        </div>
                        

                    </div>                        
                    <div className="confirmButtonWrapper">
                        <Button variant="contained" color="secondary" onClick={() => confirmFunction(state)}>Zmień</Button>
                    </div>
                </div>
            </Dialog>
        </div>
        
    )
}
 