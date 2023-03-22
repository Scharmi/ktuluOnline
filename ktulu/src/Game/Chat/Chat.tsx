import {useState, useRef, useEffect} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Chat.css'
interface Message {
    sender: string;
    text: string;
    system?: boolean;
}
interface Props {
    messageList: Array<Message>;
    sending: boolean;
    myName: string;
    socket:any;
}
export function Chat(props: Props) {
    const [text, setText] = useState("");
    const messagesEndRef = useRef<any>(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    };
    useEffect(scrollToBottom, [props.messageList]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }
    function MessageList(messages: Array<Message>) {
        return messages.map((item:any) => {
            if((item.system === undefined) || (item.system === false))
                return <ListItem key = {item.sender + item.text}><span><b>{item.sender + ": "}</b>{item.text}</span></ListItem>
            return <ListItem key = {item.sender + item.text}><span className="systemMessage">{item.text}</span></ListItem>
        }
        );
    }
    function sendMessage() {
        props.socket.emit("message", props.myName, text)
        setText("")
    }
    function renderSending() {
        if(props.sending) return (
            <div className="textField">
            <TextField
                fullWidth
                variant="filled"
                placeholder="Wyślij wiadomość do członków swojej drużyny"
                value={text}
                onChange={handleChange}     
                onKeyDown={handleKeyDown}
            />
            <Button onClick={sendMessage}>Wyślij</Button>
        </div>
        )
        else return <></>
    }
    return (
        <div className="wrapper">
            <div>
                <div className="chat">
                    <div className="list">
                        <List>
                            {MessageList(props.messageList)}
                            <div ref={messagesEndRef} />
                        </List>
                    </div>
                </div>
                {renderSending()}
            </div>
        </div>
    )
}