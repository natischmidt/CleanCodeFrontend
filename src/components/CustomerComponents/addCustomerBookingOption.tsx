import '../../App.css'
import BookingTable from "../tabels/BookingTable";
import BookingHistoryTable from "../tabels/BookingHistoryTable";
import React, {useRef, useState} from "react";
import Calendar from "react-calendar";
import admin from "../../API/admin";

const AddCustomerBookingOption = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hours, setHours] = useState(0)
    const [jobType, setJobType] = useState('');
    const [showCalender, setShowCalender] = useState(false)

    type Value = Date | null;
    const [date, setDate] = useState<Value>(new Date());
    const [timeList, setTimeList] = useState([])

    const monthCorr = useRef(0)
    const monthToUse = useRef('')
    const monthString = useRef('')
    const yearToUse = useRef(0)
    const dateToUse = useRef('')

    const [eight, setEight] = useState(false)
    const [nine, setNine] = useState(false)
    const [ten, setTen] = useState(false)
    const [eleven, setEleven] = useState(false)
    const [twelve, setTwelve] = useState(false)
    const [thirteen, setThirteen] = useState(false)
    const [fourteen, setFourteen] = useState(false)
    const [fifteen, setFifteen] = useState(false)
    const [sixteen, setSixteen] = useState(false)

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

            if (monthCorr.current < 10) {
                monthToUse.current = 0 + monthCorr.current.toString()
                monthString.current = '0' + monthToUse.current
            } else {
                monthToUse.current = monthCorr.current.toString()
                monthString.current = monthToUse.current
            }

            dateToUse.current = yearToUse.current + "-" + monthString.current + "-" + day.getDate()

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
        console.log("!#!#!#!#!#!#!!#!##!#!#!#!" + startTime)

        const doTheLoop = (start: number) => {

            for (let i = 0; i < hours; i++) {
                // @ts-ignore
                timeList.push(times[i + start])
            }
        }

        switch (startTime) {
            case 8: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                // @ts-ignore
                break
            }
            case 9: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 10: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 11: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 12: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 13: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 14: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 15: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            case 16: {
                doTheLoop(startTime - 8)
                console.log(timeList)
                break
            }
            default: {
                console.log("we shouldnt end up here")
                break
            }
        }
    };


    return (
        <>{!isModalOpen
            && (
                <div style={styles.container}>
                    <div style={styles.sectionTitle}>
                        <p>What cleaning are you interested in?</p>
                    </div>
                    <div style={styles.boxContainer}>
                        <div style={styles.box}>
                            <button onClick={() => handleJobType("BASIC")}>BASIC</button>
                        </div>
                        <div style={styles.box}>
                            <button onClick={() => handleJobType("ADVANCED")}>ADVANCED</button>
                        </div>
                        <div style={styles.box}>
                            <button onClick={() => handleJobType("DIAMOND")}>DIAMOND</button>
                        </div>
                        <div style={styles.box}>
                            <button onClick={() => handleJobType("WINDOW")}>WINDOW</button>
                        </div>
                    </div>
                    {jobType}
                </div>)}

            <div style={styles.container}>
                {showCalender && isModalOpen ? (
                    <div>
                        <div style={styles.sectionTitle}>
                            <p>Choose date and time</p>
                        </div>
                        <Calendar
                            onClickDay={(day) => {
                                checkDay(day).then(r => {
                                    // Your logic here
                                })
                            }}
                            value={date}
                        />

                    </div>
                ) : <></>}

                {isModalOpen && (
                    <>
                        <div style={styles.slotsContainer}>
                                {eight &&
                                    <button style={styles.slots} onClick={(e) => handleSelectTime(e, 8)}>08.00</button>}
                                {nine &&
                                    <button style={styles.slots} onClick={(e) => handleSelectTime(e, 9)}>09.00</button>}
                                {ten && <button style={styles.slots}
                                                onClick={(e) => handleSelectTime(e, 10)}>10.00</button>}
                                {eleven && <button style={styles.slots}
                                                   onClick={(e) => handleSelectTime(e, 11)}>11.00</button>}
                                {twelve && <button style={styles.slots}
                                                   onClick={(e) => handleSelectTime(e, 12)}>12.00</button>}
                                {thirteen && <button style={styles.slots}
                                                     onClick={(e) => handleSelectTime(e, 13)}>13.00</button>}
                                {fourteen && <button style={styles.slots}
                                                     onClick={(e) => handleSelectTime(e, 14)}>14.00</button>}
                                {fifteen && <button style={styles.slots}
                                                    onClick={(e) => handleSelectTime(e, 15)}>15.00</button>}
                                {sixteen && <button style={styles.slots}
                                                    onClick={(e) => handleSelectTime(e, 16)}>16.00</button>}

                            <div>
                                <button type="submit" style={styles.button} onClick={handleModal}>Confirm</button>
                                <button type="submit" style={styles.button} onClick={handleModal}>Close</button>
                            </div>
                        </div>

                    </>
                )}
            </div>
        </>
    );
};

export default AddCustomerBookingOption;

const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Create 4 columns
        gap: '0px', // Add spacing between grid items
        justifyContent: 'center', // Center the grid horizontally
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '10%'
    },
    sectionTitle: {
        fontWeight: 'bold',
        margin: '10px',
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        display: 'flex',
        width: '20%',
        height: '180px',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b3d9e3',
    },
    calenderContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
};
