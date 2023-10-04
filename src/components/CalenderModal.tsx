import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalenderModal: React.FC<{ onClose: () => void }> = ({onClose}) => {
    const [value, onChange] = useState<Value>(new Date());
    const [datePicked, setDatePicked] = useState(false)
    const [timeOfDay, setTimeOfDay] = useState("Morning")

    const onClick = (e: Value) => {
        onChange(e)
        console.log(e)
        setDatePicked(true)
    }

    return (
        <div>
            <Calendar onChange={(e) => {
                onClick(e)
            }} value={value}/>
            {datePicked ? <div>
                <button onClick={() => setTimeOfDay("Morning")}>Morning</button>
                <button onClick={() => setTimeOfDay("Noon")}>Noon</button>
                <button onClick={() => setTimeOfDay("Afternoon")}>Afternoon</button>
                <button onClick={() => setTimeOfDay("Evening")}>Evening</button>
            </div> : <></>}
            <button
                onClick={onClose}> Close
            </button>
            <button
                onClick={onClose}> Confirm
            </button>
            {datePicked ? <div>
                <p>Tid: {timeOfDay}</p>
            </div> : <></>
            }
        </div>
    );
}
