import '../../App.css'
import React, {useRef, useState} from "react";
import Calendar from "react-calendar";
import admin from "../../API/admin";

const AddCustomerBookingOption = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSquareModalOpen, setIsSquareModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [hours, setHours] = useState(0)
    const [jobType, setJobType] = useState('');
    const [showCalender, setShowCalender] = useState(false)
    const [showTimeSlots, setShowTimeSlots] = useState(false)
    const [squareMeters, setSquareMeters] = useState('');
    const [paymentOption, setPaymentOption] = useState("")

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
    let times = ["EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "notbookable", "notbookable", "notbookable"]

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSquarePaymentModal = () => {
        setIsSquareModalOpen(!isSquareModalOpen);
    }

    const handleCalender = () => {
        setShowCalender(!showCalender);
    }

    const handleConfirm = () => {
        setIsConfirmModalOpen(!isConfirmModalOpen)
    }

    const handleTimeSlots = () => {
        setShowTimeSlots(!showTimeSlots)
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
        setShowTimeSlots(true);
        console.log(dateToUse.current);
        // @ts-ignore
        setDate(dateToUse.current);
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


    // @ts-ignore
    // @ts-ignore
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
                    {/*{jobType}*/}
                </div>)}

            <div style={styles.container}>
                {showCalender && isModalOpen ? (
                    <div style={styles.calenderStyles}>
                        <div style={styles.sectionTitle}>
                            <p>Choose date and time</p>
                        </div>
                        <Calendar
                            onClickDay={(day) => {
                                checkDay(day).then(r => {
                                })
                            }}
                            value={date}
                        />
                    </div>
                ) : <></>}

                {isModalOpen && (
                    <>
                        <div style={styles.slotsContainer}>
                            {showTimeSlots && (
                                <>
                                    {eight &&
                                        <button style={styles.slots}
                                                onClick={(e) => handleSelectTime(e, 8)}>08.00</button>}
                                    {nine &&
                                        <button style={styles.slots}
                                                onClick={(e) => handleSelectTime(e, 9)}>09.00</button>}
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
                                </>)}

                            {showCalender && (<div>
                                <button type="submit" style={styles.bookButton} onClick={() => {
                                    handleSquarePaymentModal();
                                    handleCalender();
                                    setShowTimeSlots(false);
                                }}>Next
                                </button>
                                <button type="submit" style={styles.bookButton} onClick={handleModal}>Go back
                                </button>
                            </div>)}

                            {isSquareModalOpen &&
                                <div style={styles.form}>
                                    <form style={styles.form} onSubmit={() => {
                                    }}>
                                        <div style={styles.sectionTitle}>
                                            <p>Whats the size of your accommodation?</p>
                                        </div>
                                        <input
                                            type="square"
                                            placeholder="Square meters"
                                            style={styles.input}
                                            value={squareMeters}
                                            onChange={(e) => setSquareMeters(e.target.value)}
                                            required
                                        />
                                        <div style={styles.sectionTitle}>
                                            <p>Choose payment method</p>
                                        </div>
                                        <select
                                            value={paymentOption}
                                            style={styles.input}
                                            onChange={(e) => setPaymentOption(e.target.value)}
                                        >
                                            <option value="">Choose payment option:</option>
                                            <option value="KLARNA">Klarna</option>
                                            <option value="CASH">Cash</option>
                                        </select>
                                    </form>
                                    <div style={styles.button}>
                                        <button type="submit" style={styles.bookButton} onClick={() => {
                                            handleConfirm();
                                            handleSquarePaymentModal();
                                        }}>Next
                                        </button>
                                        <button type="submit" style={styles.bookButton} onClick={() => {
                                            handleSquarePaymentModal()
                                            handleCalender()
                                        }}>Go back
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        {isConfirmModalOpen &&
                            <div>
                                <div style={styles.sectionTitle}>
                                    <p>Confirm your booking </p>
                                </div>
                                {
                                    <div>
                                        You want to have your accommodation cleaned on {date}, {timeList.toString().toLowerCase()} a'clock.
                                        You have chosen our {jobType.toLowerCase()} service which takes {hours} hour(s) for completion.<br />
                                        The size of your accommodation is {squareMeters} square meters and you wish to pay with {paymentOption}.
                                    </div>
                                }

                                <div style={styles.button}>
                                    <button type="submit" style={styles.bookButton} onClick={() => {
                                    }}>Confirm
                                    </button>
                                    <button type="submit" style={styles.bookButton} onClick={() => {
                                        handleConfirm();
                                        handleModal();
                                    }}>Cancel
                                    </button>
                                </div>
                            </div>
                        }
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
    form: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column'
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
    calenderStyles: {
        backgroundColor: "#b3d9e3"
    },
    bookButton: {
        padding: '8px 16px',
        backgroundColor: '#b3d9e3',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginBottom: '16px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        margin: 25,
    },
};
