import '../../App.css'
import React, {useRef, useState} from "react";
import Calendar from "react-calendar";
import admin from "../../API/admin";
import diamond from "../../assets/diamond3.png";
import basic from "../../assets/basic2.png";
import advanced from "../../assets/advanced2.jpg";
import windowclean from "../../assets/www.png";
import {useUserType} from "../UserTypeContext";
import customer from "../../API/customer";


const AddCustomerBookingOption = () => {

    const {userType, id, loggedIn} = useUserType();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSquareModalOpen, setIsSquareModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isBookingDone, setIsBookingDone] = useState(false);
    const [hours, setHours] = useState(0)
    const [jobType, setJobType] = useState('');
    const [showCalender, setShowCalender] = useState(false)
    const [showTimeSlots, setShowTimeSlots] = useState(false)
    const [squareMeters, setSquareMeters] = useState('');
    const [emailaddress, setEmailAddress] = useState('');
    const [paymentOption, setPaymentOption] = useState("")
    const [message, setMessage] = useState("")
    const [showCalNext, setShowCalNext] = useState(false)
    // const [tempId, setTempId] = useState<any>(null);

    type Value = Date | null;
    const [date, setDate] = useState<Value>(new Date());
    const [timeList, setTimeList] = useState([])

    const dayCorr = useRef(0)
    const dayToUse = useRef('')
    const dayString = useRef('')
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

    const handleBookingDone = () => {
        setIsBookingDone(!isBookingDone);
    }


    const handleRegister = async (email: string) => {
        customer.register(email);
    }

    const handleBooking = (email: string) => {
        customer.book(email);
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
            // @ts-ignore

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
        // @ts-ignore
        setDate(dateToUse.current);
        setShowTimeSlots(true);
        console.log(dateToUse.current);
        // @ts-ignore

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
                        <h2>What cleaning are you interested in?</h2>
                    </div>
                    <div style={styles.boxContainer}>
                        <div style={{
                            ...styles.box,
                            backgroundImage: `url(${basic})`
                        }}>
                            <div>
                                <button onClick={() => handleJobType("BASIC")}>BASIC</button>
                            </div>
                        </div>
                        <div style={{...styles.box, backgroundImage: `url(${advanced})`}}>
                            <button onClick={() => handleJobType("ADVANCED")}>ADVANCED</button>
                        </div>
                        <div style={{...styles.box, backgroundImage: `url(${diamond})`}}>
                            <button onClick={() => handleJobType("DIAMOND")}>DIAMOND</button>
                        </div>
                        <div style={{...styles.box, backgroundImage: `url(${windowclean})`}}>
                            <button onClick={() => handleJobType("WINDOW")}>WINDOW</button>
                        </div>
                    </div>
                    {/*{jobType}*/}
                </div>)}

            <div style={styles.container}>
                {showCalender && isModalOpen ? (
                    <div style={styles.cal}>
                        <div style={styles.calenderStyles}>
                            <div style={styles.sectionTitle}>
                                <p>Choose date and time</p>
                            </div>
                            <Calendar
                                onClickDay={(day) => {
                                    setShowCalNext(false);
                                    checkDay(day).then(r => {
                                    })
                                }}
                                value={date}
                            />
                        </div>
                    </div>
                ) : <></>}

                {isModalOpen && (
                    <>
                        <div style={styles.slotsContainer}>
                            {showTimeSlots && (
                                <>
                                    {eight &&
                                        <button style={styles.slots} onClick={(e) => {
                                            handleSelectTime(e, 8).then(r => {
                                            });
                                            setShowCalNext(true);
                                        }}>
                                            08.00
                                        </button>
                                    }
                                    {nine &&
                                        <button style={styles.slots}
                                                onClick={(e) => {
                                                    handleSelectTime(e, 9).then(r => {
                                                    });
                                                    setShowCalNext(true)
                                                }}>09.00</button>}
                                    {ten && <button style={styles.slots}
                                                    onClick={(e) => {
                                                        handleSelectTime(e, 10).then(r => {
                                                        });
                                                        setShowCalNext(true)
                                                    }}>10.00</button>}
                                    {eleven && <button style={styles.slots}
                                                       onClick={(e) => {
                                                           handleSelectTime(e, 11).then(r => {
                                                           });
                                                           setShowCalNext(true)
                                                       }}>11.00</button>}
                                    {twelve && <button style={styles.slots}
                                                       onClick={(e) => {
                                                           handleSelectTime(e, 12).then(r => {
                                                           });
                                                           setShowCalNext(true)
                                                       }}>12.00</button>}
                                    {thirteen && <button style={styles.slots}
                                                         onClick={(e) => {
                                                             handleSelectTime(e, 13).then(r => {
                                                             });
                                                             setShowCalNext(true)
                                                         }}>13.00</button>}
                                    {fourteen && <button style={styles.slots}
                                                         onClick={(e) => {
                                                             handleSelectTime(e, 14).then(r => {
                                                             });
                                                             setShowCalNext(true)
                                                         }}>14.00</button>}
                                    {fifteen && <button style={styles.slots}
                                                        onClick={(e) => {
                                                            handleSelectTime(e, 15).then(r => {
                                                            });
                                                            setShowCalNext(true)
                                                        }}>15.00</button>}
                                    {sixteen && <button style={styles.slots}
                                                        onClick={(e) => {
                                                            handleSelectTime(e, 16).then(r => {
                                                            });
                                                            setShowCalNext(true)
                                                        }}>16.00</button>}
                                </>)}

                            {showCalender && (<div>

                                {showCalNext && <button type="submit" style={styles.bookButton} onClick={() => {
                                    handleSquarePaymentModal();
                                    handleCalender();
                                    setShowTimeSlots(false);
                                }}>Next
                                </button>}

                                <button type="submit" style={styles.bookButton} onClick={handleModal}>Go back
                                </button>
                            </div>)}

                            {isSquareModalOpen &&
                                <div style={styles.form}>
                                    <form style={styles.form} onSubmit={(e) => {
                                        e.preventDefault();
                                        handleConfirm();
                                        handleSquarePaymentModal();
                                    }}>
                                        <div style={styles.sectionTitle}>
                                            <p>Whats the size of your accommodation?</p>
                                        </div>
                                        <input
                                            type="number"
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
                                            required
                                        >
                                            <option value="">Choose payment option:</option>
                                            <option value="KLARNA">Klarna</option>
                                            <option value="CASH">Cash</option>
                                        </select>

                                        <div style={styles.sectionTitle}>
                                            <p>Is anything you want to add?</p>
                                        </div>
                                        <textarea
                                            placeholder="Write a message..."
                                            style={styles.textarea}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        {!loggedIn && (
                                            <div style={styles.sectionTitle}>
                                                <p>Whats your email address?</p>
                                            </div>)}

                                        {!loggedIn && (<input
                                                type="email"
                                                placeholder="Email address"
                                                style={styles.input}
                                                value={emailaddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                required
                                            />
                                        )}
                                        <div style={styles.button}>
                                            <button type="submit" style={styles.bookButton}>Next</button>

                                            <button style={styles.bookButton} onClick={() => {
                                                handleSquarePaymentModal()
                                                handleCalender()
                                            }}>Go back
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                        {isConfirmModalOpen &&
                            <div style={styles.confirm}>
                                <div style={styles.sectionTitle}>
                                    <p>Confirm your booking </p>
                                </div>
                                {
                                    loggedIn ? (
                                        <>
                                            You want to have your accommodation cleaned
                                            {/*on {date}, {timeList[0].toLowerCase()} a'clock.*/}
                                            You have chosen our {jobType.toLowerCase()} service which takes {hours} hour(s)
                                            for completion.<br/>
                                            The size of your accommodation is {squareMeters} square meters and you wish to
                                            pay with {paymentOption}.
                                        </>
                                    ) : (
                                        // JSX content when loggedIn is false
                                        <>
                                            You want to have your accommodation cleaned
                                            {/*on {date}, {timeList[0].toLowerCase()} a'clock.*/}
                                            You have chosen our {jobType.toLowerCase()} service which takes {hours} hour(s)
                                            for completion.<br/>
                                            The size of your accommodation is {squareMeters} square meters and you wish to
                                            pay with {paymentOption}.
                                        </>
                                    )
                                }


                                    <div style={styles.button}>
                                <button type="button" style={styles.bookButton} onClick={() => {
                                    handleBooking(emailaddress);
                                    handleConfirm();
                                    handleBookingDone();
                                }}>Confirm
                                </button>
                                <button type="button" style={styles.bookButton} onClick={() => {
                                    handleConfirm();
                                    handleModal();
                                }}>Cancel
                                </button>
                            </div>
                            </div>
                        }
                        {isBookingDone &&
                            <div style={styles.centered}>
                                <h3>Your booking was successfully created. <br/>You will have a confirmation email sent
                                    to you. Thank you!</h3>
                            </div>}
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
        fontSize: "1.2rem",
        marginTop: '0%',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        marginTop: '5%',
    },
    sectionTitle: {
        fontWeight: 'bold',
        margin: '10px',
    },
    cal: {
        marginTop: '4%',
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    box: {
        backgroundImage: `url(${diamond})`,
        display: 'flex',
        width: '15rem',
        height: '25rem',
        border: '3px solid #ccc',
        padding: '2rem',
        margin: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b3d9e3',
        backgroundSize: 'cover',
    },
    boxText: {
        display: 'flex',
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
    textarea: {
        width: "16rem",
        height: "4rem"
    },
    centered: {
        marginTop: "10%",
    }
};
