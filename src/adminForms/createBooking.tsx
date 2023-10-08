import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
// import {CalenderModal} from "../components/CalenderModal";
import Calendar from "react-calendar";
import admin from "../API/admin";
import loginAdminOrEmployee from "../forms/loginAdminOrEmployee";

const CreateNewBooking: React.FC = () => {
    const [jobType, setJobType] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [timeSlotList, setTimeSlotList] = useState<string[]>([]);
    const [squareMeters, setSquareMeters] = useState ('');
    const [payment, setPayment] = useState('');
    const [customer, setCustomer] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableEmployeesMap, setAvailableEmployeesMap] = useState<Map<number, boolean>>()
    const [showCalender, setShowCalender] = useState(false)
    const [hours, setHours] = useState(0)
    const goBackToBooking = useNavigate();
    const [eight, setEight] = useState(false)
    const [nine, setNine] = useState(false)
    const [ten, setTen] = useState(false)
    const [eleven, setEleven] = useState(false)
    const [twelve, setTwelve] = useState(false)
    const [thirteen, setThirteen] = useState(false)
    const [fourteen, setFourteen] = useState(false)
    const [fifteen, setFifteen] = useState(false)
    const [sixteen, setSixteen] = useState(false)
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

    async function checkDay(day: Value) {
        setDate(day)
        console.log(day)

      await admin.getAvailableEmp(date, hours).then(response => {

          if (response) {
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(0))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(1))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(2))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(3))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(4))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(5))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(6))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(7))
              console.log(".-.-.-.-.-.-.-.-.-.-.-." + response.at(8))

              setEight(response.at(0))
              setNine(response.at(1))
              setTen(response.at(2))
              setEleven(response.at(3))
              setTwelve(response.at(4))
              setThirteen(response.at(5))
              setFourteen(response.at(6))
              setFifteen(response.at(7))
              setSixteen(response.at(8))
          }
      })
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
                    <Calendar onClickDay={(day) => {
                        checkDay(day)
                    }} value={date}/> : <></>}
                {eight ? <button>08.00</button> : <></>}
                {eight ? <button>09.00</button> : <></>}
                {nine ? <button>10.00</button> : <></>}
                {ten ? <button>11.00</button> : <></>}
                {eleven ? <button>12.00</button> : <></>}
                {twelve ? <button>13.00</button> : <></>}
                {thirteen ? <button>14.00</button> : <></>}
                {fifteen ? <button>15.00</button> : <></>}
                {sixteen ? <button>16.00</button> : <></>}
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
