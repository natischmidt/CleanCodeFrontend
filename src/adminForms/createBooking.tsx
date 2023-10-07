import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
// import {CalenderModal} from "../components/CalenderModal";
import Calendar from "react-calendar";
import admin, {getAvailableEmp} from "../API/admin";

const CreateNewBooking: React.FC = () => {
    const [jobType, setJobType] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [timeSlotList, setTimeSlotList] = useState<string[]>([]);
    const [squareMeters, setSquareMeters] = useState ('');
    const [payment, setPayment] = useState('');
    const [customer, setCustomer] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showCalender, setShowCalender] = useState(false)

    const [hours, setHours] = useState(0)

    const goBackToBooking = useNavigate();

    const handleDateAndTimeClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    type Value = Date | null;

    const [date, setDate] = useState<Value>(new Date());

    function handleJobType(jobType: string) {
        if (jobType == "BASIC") {
            setHours(1)
        }
        else if (jobType == "ADVANCED") {
            setHours(2)
        }
        else if (jobType == "DIAMOND") {
            setHours(3)
        }
        else if (jobType == "WINDOW") {
            setHours(2)
        }
        setJobType(jobType)
        setShowCalender(true)
    }

    function checkDay(day: Value) {
        setDate(day)
        console.log(day)

        admin.getAvailableEmp(date, hours).then(r => {})
    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            await admin.createBooking(jobType, dateAndTime, timeSlotList, squareMeters, payment, customer);

        } catch (error) {
            console.error('Error creating booking', error);
        }
    };

    return (
        <div style={styles.container}>
            {/*{!isModalOpen && (*/}
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Create new Booking</h2>
                <select
                    value={jobType}
                    style={styles.select}
                    onChange={(e) => handleJobType(e.target.value)}
                >
                    <option >Choose Cleaning Service:</option>
                    <option value="BASIC">Basic Cleaning</option>
                    <option value="ADVANCED">Advanced Cleaning</option>
                    <option value="DIAMOND">Diamond Cleaner</option>
                    <option value="WINDOW">Window Washing</option>
                </select>

                {/*<button onClick={handleDateAndTimeClick}>Calender</button>*/}

                <input
                    type="text"
                    placeholder="Square Meters"
                    style={styles.input}
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    required
                />
                <select
                    value={payment}
                    style={styles.select}
                    onChange={(e) => setPayment(e.target.value)}
                >
                    <option >Choose payment option:</option>
                    <option value="KLARNA">Klarna</option>
                    <option value="CASH">Cash</option>
                </select>
                <input
                    type="number"
                    placeholder="Customer ID"
                    style={styles.input}
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                />

                <button type="submit" style={styles.button}>
                    Create new Booking
                </button>
                <button type="submit" style={styles.button} onClick={() => {{goBackToBooking(("/Booking"))}}}>
                    Go Back
                </button>

                {showCalender ?
                    <Calendar onChange={(day) => {
                        checkDay(day)
                    }} value={date}/> : <></>}

                {/*{checkDay(date)}*/}
            </form>
        </div>
    );
};

export default CreateNewBooking;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#53af67',
        width: "500px",
        height: '630px',
        marginTop: '6%'
    },
    input: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
    },
    select: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '80%',
        borderRadius: '5px',
    }
}
