import React, {useState} from 'react'
import Button from "@material-ui/core/Button"
import './ChoosingInterface.css'
interface Item {
    id: number;
    text: string;
}
interface Props {
    items: Array<Item>;
    maxChosen? : number;
    minChosen? : number;
    callBack: Function;
    abstainAllowed?: number;
}
const defaultProps = {
    items: [],
    maxChosen: 1,
    callBack: () => {},
}
export function ChoosingInterface (props:Props = defaultProps) {
    
    const [clickedQueue, setClickedQueue] = useState<Array <Item> >([]);
    const [interfaceClassName, setInterfaceClassName] = useState<string>("interfaceOpen");
    const abstainAllowed = (typeof(props.abstainAllowed) === "undefined") ? 0 : props.abstainAllowed;
    let items = [...props.items];
    if( abstainAllowed ) {
        items.push(
            {
                id: 2050,
                text: "Wstrzymuję się od głosu"
            }
        )        
    }
    let initialClicked:Array<number> = [];
    let index: Array<number> = [];
    for(let i = 0; i < items.length; i++) {
        initialClicked.push(0);
        index[items[i].id] = i;
    }
    const [ifButtonClicked, setIfButtonClicked] = useState<Array <number> >(initialClicked);
    function buttonOnClick(item: Item, ifClicked: number) {
        let maxChosen = (typeof(props.maxChosen) === "undefined") ? 1 : props.maxChosen;

        let newClickedQueue = [...clickedQueue];
        let newIfClickedArray = [...ifButtonClicked];
        if ( ifClicked ) {
            newIfClickedArray[index[item.id]] = 0;
            let deleteIndex = newClickedQueue.indexOf(item);
            newClickedQueue.splice(deleteIndex,1);
        }
        else {
            if ( newClickedQueue.length < maxChosen) {
                newClickedQueue.push(item);
                newIfClickedArray[index[item.id]] = 1;
            }
            else { 
                let firstlyClicked = newClickedQueue[0].id;
                newIfClickedArray[index[firstlyClicked]] = 0;
                newClickedQueue.shift();
                newIfClickedArray[index[item.id]] = 1;
                newClickedQueue.push(item);
            }
        }
        setIfButtonClicked(newIfClickedArray);
        setClickedQueue(newClickedQueue);
    }
    function buttonColor (ifClicked:number) : any {
        return ifClicked ? "secondary" : "default";
    }
    function isAbstain(item: Item) {
        if(item.id === 2050) return "Abstain";
        return "";
    }
    let listItems = items.map((item) =>
        <div className = {"ButtonWrapper"+ isAbstain(item)} key = {item.id}>
            <Button variant="contained" color={ buttonColor(ifButtonClicked[index[item.id]]) } onClick={() => {buttonOnClick(item, ifButtonClicked[index[item.id]])}}>
                {item.text}
            </Button>
        </div>
    );
    let buttonList = <div>{listItems}</div>;
    function confirmButton (clickedNumber: number) {
        let minChosen = (typeof(props.minChosen) === "undefined") ? 1 : props.minChosen;
        minChosen = Math.min(minChosen, props.items.length);
        if(clickedNumber >= minChosen) {
            return (
                <div className="ButtonWrapper">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            setInterfaceClassName("interfaceClosed");
                            props.callBack(clickedQueue);
                        }}>
                        Zatwierdź
                    </Button>
                </div>
            )
        }
        else {
            return (
                <div className="ButtonWrapper">
                    <Button 
                        variant="contained" 
                        disabled
                        onClick={() => {
                            setInterfaceClassName("interfaceClosed");
                            props.callBack(clickedQueue);
                        }}>
                        Zatwierdź
                    </Button>
                </div>
            )
        }
    }


    return (
    <div className = "interfaceWrapper">
        <div className={interfaceClassName}>
              {buttonList}{confirmButton(clickedQueue.length)}                
        </div>            
    </div>
    )
}