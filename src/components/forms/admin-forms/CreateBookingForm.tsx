import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

import Calendar from "react-calendar";
import admin from "../../../API/admin";

import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import HeaderComp from "../../layout/HeaderComp";
import {useUserType} from "../../context/UserTypeContext";

const CreateNewBooking: React.FC = () => {
    const [jobType, setJobType] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [squareMeters, setSquareMeters] = useState('');
    const [payment, setPayment] = useState('KLARNA');
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const [timeList, setTimeList] = useState([])
    const [message, setMessage] = useState("")
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const dayCorr = useRef(0)
    const dayToUse = useRef('')
    const dayString = useRef('')
    const monthCorr = useRef(0)
    const monthToUse = useRef('')
    const monthString = useRef('')
    const yearToUse = useRef(0)
    const dateToUse = useRef('')
    let times = ["EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "notbookable", "notbookable", "notbookable"]

    type Value = Date | null;
    const [date, setDate] = useState<Value>(new Date());

    const [customerData, setCustomerData] = useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');


    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        };

        axios.get('http://localhost:8080/api/customer/all', {headers: headers})
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    function handleJobType(jobType: string) {
        if (jobType == "BASIC") {
            setHours(1)
        } else if (jobType == "ADVANCED") {
            setHours(2)
        } else if (jobType == "DIAMOND") {

            setHours(3)
        } else if (jobType == "WINDOW") {
            setHours(2)
        }
        setJobType(jobType)
        setShowCalender(true)
        handleModal()
    }

    async function checkDay(day: any) {
        if (day) {

            yearToUse.current = day.getFullYear().valueOf()
            monthCorr.current = day.getMonth() + 1
            dayCorr.current = day.getDate();

            if (monthCorr.current < 10) {
                monthToUse.current = 0 + monthCorr.current.toString()
                monthString.current = '' + monthToUse.current
            } else {
                monthToUse.current = monthCorr.current.toString()
                monthString.current = monthToUse.current
            }

            if (dayCorr.current < 10) {
                dayToUse.current = 0 + dayCorr.current.toString()
                dayString.current = '' + dayToUse.current
            } else {
                dayToUse.current = dayCorr.current.toString()
                dayString.current = dayToUse.current
            }

            dateToUse.current = yearToUse.current + "-" + monthString.current + "-" + dayToUse.current;

            await admin.getAvailableEmp(dateToUse.current, hours).then(response => {
                if (response) {
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
    }

    const handleSelectTime = async (event: React.MouseEvent<HTMLButtonElement>, startTime: number) => {
        event.preventDefault();
        timeList.length = 0;
        const doTheLoop = (start: number) => {

            for (let i = 0; i < hours; i++) {
                // @ts-ignore
                timeList.push(times[i + start])
            }
        }

        switch (startTime) {
            case 8: {
                doTheLoop(startTime - 8)
                // @ts-ignore
                break
            }
            case 9: {
                doTheLoop(startTime - 8)
                break
            }
            case 10: {
                doTheLoop(startTime - 8)
                break
            }
            case 11: {
                doTheLoop(startTime - 8)
                break
            }
            case 12: {
                doTheLoop(startTime - 8)
                break
            }
            case 13: {
                doTheLoop(startTime - 8)
                break
            }
            case 14: {
                doTheLoop(startTime - 8)
                break
            }
            case 15: {
                doTheLoop(startTime - 8)
                break
            }
            case 16: {
                doTheLoop(startTime - 8)
                break
            }
            default: {
                break
            }
        }
    };

    const handleBooking = () => {

            admin.createBooking(jobType, dateToUse.current, timeList, squareMeters, payment, selectedCustomer, message)
        // try {
        //
        //
        //     admin.createBooking(jobType, dateToUse.current, timeList, squareMeters, payment, selectedCustomer, message).then(r => {
                goBackToBooking(("/booking"))
        //     })
        //
        // } catch (error) {
        //     console.error(error)
        // }
    }

    return (
        <>
            <HeaderComp/>

        <div style={styles.container}>
            {!isModalOpen && (
                <form style={styles.form} onSubmit={() => handleSelectTime}>
                    <h2>Create new booking</h2>
                    <select
                        value={jobType}
                        style={styles.select}
                        onChange={(e) => handleJobType(e.target.value)}
                    >
                        <option>Choose cleaning service:</option>
                        <option value="BASIC">Basic cleaning</option>
                        <option value="ADVANCED">Advanced cleaning</option>
                        <option value="DIAMOND">Diamond cleaner</option>
                        <option value="WINDOW">Window washing</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Date and time"
                        style={styles.input}
                        value={dateToUse.current}
                        onChange={(e) => setDateAndTime(e.target.value)}
                        onClick={() => handleJobType(jobType)}
                        readOnly
                        required
                    />
                    <input
                        type="text"
                        placeholder="Hours: "
                        style={styles.input}
                        value={"Estimated time for cleaning: " + hours + " hour"}
                        onChange={(e) => setDateAndTime(e.target.value)}
                        readOnly
                        required
                    />
                    <input
                        type="text"
                        placeholder="Square meters"
                        style={styles.input}
                        value={squareMeters}
                        onChange={(e) => setSquareMeters(e.target.value)}
                        required
                    />
                    <select
                        value={payment}
                        style={styles.select}
                        required
                        onChange={(e) => setPayment(e.target.value)}
                    >
                        <option value="KLARNA">Klarna</option>
                        {/*<option value="CASH">Cash</option>*/}
                    </select>
                    <select
                        style={styles.select}
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        required>
                        <option value="" disabled>Select a customer</option>
                        {customerData.map( (customer) => (
                            <option key={customer.id} value={customer.id}>{customer.firstName +" "+customer.lastName + " (" + customer.email +")"}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Write a message..."
                        style={styles.textarea}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button type="submit" style={styles.button}
                            onClick={() => handleBooking()}
                    >
                        Create new booking
                    </button>

                    <button type="submit" style={styles.button} onClick={() => {
                        {
                            goBackToBooking(("/booking"))
                        }
                    }}>
                        Go back
                    </button>

                </form>)}
            <div style={styles.calenderContainer}>
                {showCalender && isModalOpen ?
                    <Calendar
                        minDate={new Date()}
                        onClickDay={(day) => {
                            checkDay(day).then(r => {
                            })
                        }}
                        value={date}
                    /> : <></>}

                {isModalOpen && (
                    <>
                        <div style={styles.slotsContainer}>
                            {eight ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 8).then(r => {})
                                setShowConfirmButton(true)
                            }}>08.00</button> : <></>}
                            {nine ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 9).then(r => {})
                                setShowConfirmButton(true)
                            }}>09.00</button> : <></>}
                            {ten ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 10).then(r => {})
                                setShowConfirmButton(true)
                            }}>10.00</button> : <></>}
                            {eleven ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 11).then(r => {})
                                setShowConfirmButton(true)
                            }}>11.00</button> : <></>}
                            {twelve ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 12).then(r => {})
                                setShowConfirmButton(true)
                            }}>12.00</button> : <></>}
                            {thirteen ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 13).then(r => {})
                                setShowConfirmButton(true)
                            }}>13.00</button> : <></>}
                            {fourteen ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 14).then(r => {})
                                setShowConfirmButton(true)
                            }}>14.00</button> : <></>}
                            {fifteen ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 15).then(r => {})
                                setShowConfirmButton(true)
                            }}>15.00</button> : <></>}
                            {sixteen ? <button style={styles.slots} onClick={(e) => {
                                handleSelectTime(e, 16)
                                setShowConfirmButton(true)
                            }}>16.00</button> : <></>}

                        </div>

                        {showConfirmButton && <button type="submit" style={styles.button} onClick={() => {
                            handleModal()
                            setShowConfirmButton(false)
                        }}>Confirm</button>}
                        <button type="submit" style={styles.button} onClick={handleModal}>Close</button>
                    </>
                )}
            </div>
        </div>
        </>
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
        backgroundColor: '#b3d9e3',
        width: "500px",
        // height: '700px',
        marginTop: '2%',
        marginBottom: "2%"
    },
    input: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        width: "200px"
    },
    select: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '80%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    calenderContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        marginTop: "10rem",
    },
    slotsContainer: {
        display: 'flex' as 'flex',
        padding: 20,
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'center' as 'center'
    },
    slots: {
        margin: 10,
    },
    textarea: {
        padding: '12px 12px',
        marginTop: '10px',
        width: "23rem",
        height: "10rem",
        fontFamily: "PlomPraeng",
        fontSize: "0.9rem"
    }
}


