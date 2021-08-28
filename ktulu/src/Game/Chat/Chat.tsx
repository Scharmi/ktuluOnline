import {useState} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Chat.css'
interface Message {
    sender: string;
    text: string;
}
interface Props {
    messageList: Array<Message>
    myName: string;
    socket:any;
}
export function Chat(props: Props) {
    const [text, setText] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(text)
        setText(event.target.value);
    };
    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
            props.socket.emit("message", props.myName, text)
            setText("")
        }
    }
    function MessageList(messages: Array<Message>) {
        console.log(messages)
        return messages.map((item:any) => 
            <ListItem key = {item.sender + item.text}><span><b>{item.sender + ": "}</b>{item.text}</span></ListItem>
        );
    }
    console.log("XD", MessageList(props.messageList));
    return (
        <div className="wrapper">
            <div className="chat">
                <div className="list">
                    <List>
                        {MessageList(props.messageList)}
                    </List>
                </div>

            </div>
            <div className="textField">
                <TextField 
                    fullWidth 
                    variant="filled" 
                    placeholder="Wyślij wiadomość"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <Button>Wyślij</Button>
            </div>
        </div>
    )
}