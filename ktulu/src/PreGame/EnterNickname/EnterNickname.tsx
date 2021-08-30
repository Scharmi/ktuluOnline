import { useState } from 'react'
import { TextField, Snackbar, Button, Switch, FormControlLabel } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import './EnterNickname.css'
interface Props {
    submitNickNameCallback: Function;
    socket: any;
    setAdmin: Function;
}
export function EnterNickname(props: Props) {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [tickState, setTickState] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }      
    function handleClose1() {
        setOpen(false);
    }
    function handleClose2() {
        setOpen(false);
    }
    function handleAdmin() {
        let s = tickState
        props.setAdmin(!s);
        setTickState((prevState) => {
            return !prevState
        });
    }
    function submitName(name: string, isAdmin: boolean) {
        let isTaken = true;
        props.socket.emit("isTaken", name, (response: any) => {
            isTaken = response.status;
            if(isTaken === true) setOpen(true)
            else {
                setOpen(false);
                props.submitNickNameCallback(name, isAdmin)
                setName("");
            }
        });
    }
    return (
        <div className="enterNickname">
            <h2>Wpisz swój nick</h2>
            <form noValidate autoComplete="off">
            <TextField
                id="outlined-basic"
                label="Nick"
                value={name}
                onChange={handleChange}
                variant="filled"
            />
            </form>
            <FormControlLabel
                control={<Switch size="medium" 
                checked={tickState} 
                onChange={handleAdmin} />}
                label="Admin"
            />
            <div className="confirmButton">
                <Button onClick={() => {submitName(name, tickState)}}>Zatwierdź</Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => {}}>
                <Alert onClose={handleClose2} severity="error">
                    Ta nazwa użytkownika jest zajęta
                </Alert>
            </Snackbar>
        </div>
    )
}