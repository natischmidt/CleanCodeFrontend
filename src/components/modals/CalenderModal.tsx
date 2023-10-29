import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalenderModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    const [value, onChange] = useState<Value>(new Date());
    const [datePicked, setDatePicked] = useState(false)
    const [timeOfDay, setTimeOfDay] = useState('')

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
                <button onClick={() => setTimeOfDay("EIGHT")}>08:00</button>
                <button onClick={() => setTimeOfDay("NINE")}>09:00</button>
                <button onClick={() => setTimeOfDay("TEN")}>10:00</button>
                <button onClick={() => setTimeOfDay("ELEVEN")}>11:00</button>
                <button onClick={() => setTimeOfDay("TWELVE")}>12:00</button>
                <button onClick={() => setTimeOfDay("THIRTEEN")}>13:00</button>
                <button onClick={() => setTimeOfDay("FOURTEEN")}>14:00</button>
                <button onClick={() => setTimeOfDay("FIFTEEN")}>15:00</button>
                <button onClick={() => setTimeOfDay("SIXTEEN")}>16:00</button>
            </div> : <></>}
            <button
                onClick={onClose}> Go back
            </button>
            <button
                onClick={onClose}> Confirm
            </button>
            {/*{datePicked ? <div>*/}
            {/*    <p>Tid: {timeOfDay}</p>*/}
            {/*</div> : <></>*/}
            {/*}*/}
        </div>
    );
}
