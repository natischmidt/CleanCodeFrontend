import '../../App.css'
import React, {useRef, useState} from "react";
import Calendar from "react-calendar";
import admin from "../../API/admin";
import {useUserType} from "../context/UserTypeContext";
import customer from "../../API/customer";
import SetTempEmail from "./customer-modals/SetTempEmail";
import "../../styles/CustomerBooking.css"
import {useNavigate} from "react-router-dom";

const AddCustomerBookingOption = () => {

        const [showExtraInfo, setShowExtraInfo] = useState(false);
        const [showExtraInfoAdv, setShowExtraInfoAdv] = useState(false);
        const [showExtraInfoDia, setShowExtraInfoDia] = useState(false);
        const [showExtraInfoWin, setShowExtraInfoWin] = useState(false);
        const [squareMetersStyle, setSquareMetersStyle] = useState(styles.input)

        const [infoText, setInfoText] = useState('');
        const [infoTextAdv, setInfoTextAdv] = useState('');
        const [infoTextDia, setInfoTextDia] = useState('');
        const [infoTextWin, setInfoTextWin] = useState('');
        const {id, loggedIn} = useUserType();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isSquareModalOpen, setIsSquareModalOpen] = useState(false);
        const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
        const [isBookingDone, setIsBookingDone] = useState(false);
        const [hours, setHours] = useState(0)
        const [jobType, setJobType] = useState('');
        const [showCalender, setShowCalender] = useState(false)
        const [showTimeSlots, setShowTimeSlots] = useState(false)
        const squareMeters = useRef('');
        const [emailaddress, setEmailAddress] = useState('');
        const paymentOption = 'KLARNA'
        const [message, setMessage] = useState("")
        const [showCalNext, setShowCalNext] = useState(false)
        const navigate = useNavigate();

        type Value = Date | null;
        const [date, setDate] = useState<Value>(new Date());
        const [timeList, setTimeList] = useState([''])

        const dayCorr = useRef(0)
        const dayToUse = useRef('')
        const dayString = useRef('')
        const monthCorr = useRef(0)
        const monthToUse = useRef('')
        const monthString = useRef('')
        const yearToUse = useRef(0)
        const dateToUse = useRef('')

        const [showSetTempEmail, setShowSetTempEmail] = useState(false)

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


        const handleBooking = (email: string) => {
            customer.book(jobType, dateToUse.current, timeList, squareMeters.current, paymentOption, id, message, email);
        }

        const handleExtraInformation = (text: String) => {
            // @ts-ignore
            setInfoText(text);
            setShowExtraInfo(!showExtraInfo);
        }

        const handleExtraInformationAdv = (text: String) => {
            // @ts-ignore
            setInfoTextAdv(text);
            setShowExtraInfoAdv(!showExtraInfoAdv);
        }

        const handleExtraInformationDia = (text: String) => {
            // @ts-ignore
            setInfoTextDia(text);
            setShowExtraInfoDia(!showExtraInfoDia);
        }

        const handleExtraInformationWin = (text: String) => {
            // @ts-ignore
            setInfoTextWin(text);
            setShowExtraInfoWin(!showExtraInfoWin);
        }

        const settingTemporaryEmail = (value: string) => {
            setEmailAddress(value)
        }

        const continueToCalendar = (jobType: string) => {
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
            if (sessionStorage.getItem("jwt") === null ) {
                setShowSetTempEmail(true)
            } else {

                setShowCalender(true)
                handleModal()
            }

        }

        async function checkDay(day: Date) {
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
            // @ts-ignore
        }

        const isTheFieldOk = (input: string) => {
            switch (input) {
                case "size": {
                    if(squareMeters.current == '' || isNaN(Number(squareMeters.current))) {
                        setSquareMetersStyle(styles.invalidInput)
                    } else {
                        setSquareMetersStyle(styles.input)
                    }
                }
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

        return (
            <>{!isModalOpen
                && (
                    <div
                        className = "bookingBody"
                        style={styles.container1}>
                        <div
                            className = "sectionTitleDiv"
                            style={styles.sectionTitle}>
                            <h2>Which cleaning are you interested in?</h2>
                        </div>
                        {!showSetTempEmail ?
                        <div
                            className="boxContainer"
                            >
                            <div className="boxBasic" style={{
                                // backgroundImage: `url(${basic})`
                            }}>
                                <div className="bigDiv">
                                    <div className="btn">
                                        <button
                                            className="showInfo"
                                            onClick={() => {
                                                if(window.innerWidth > 900) {
                                                    handleExtraInformation(
                                                        "Our 'Basic Cleaning' service provides essential cleaning tasks such as " +
                                                        "surface cleaning, floor care, and bathroom and kitchen maintenance to maintain a " +
                                                        "clean and fresh living or working space.")
                                                } else if (window.innerWidth < 450) {
                                                    handleJobType("BASIC")
                                                } else {
                                                    handleExtraInformation("This our standard service, suitable for regular, recurring cleanings.")
                                                }
                                                }}>BASIC
                                        </button>
                                    </div>
                                    {showExtraInfo && (
                                        <div
                                            className="buttonTextContainer"
                                            style={styles.buttonTextContainer}>
                                            <div className="buttonText">
                                                {infoText}
                                                <div>
                                                    <br/>
                                                    <button
                                                        style={styles.bookNow}
                                                        onClick={() => handleJobType("BASIC")}>Book now!
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div className="boxAdvanced" style={{
                                // backgroundImage: `url(${advanced})`
                            }}>
                                <div className="bigDiv">
                                    <div className="btn">
                                        <button
                                            className="showInfo"
                                            onClick={() => {
                                                if (window.innerWidth > 900) {
                                                    handleExtraInformationAdv(
                                                        "Our 'Advanced Cleaning' service goes beyond the basics, offering a" +
                                                        " comprehensive and deep cleaning experience that includes thorough " +
                                                        "cleaning of hard-to-reach areas, detailed kitchen and bathroom " +
                                                        "cleaning, and a meticulous focus on all surfaces, ensuring a spotless " +
                                                        "environment.")
                                                } else if (window.innerWidth < 450) {
                                                    handleJobType("ADVANCED")
                                                }else {
                                                    handleExtraInformationAdv("A more thorough cleaning than basic.")
                                                }
                                                }}>ADVANCED
                                        </button>
                                    </div>
                                    {showExtraInfoAdv && (
                                        <div
                                            className="buttonTextContainer"
                                            style={styles.buttonTextContainer}>
                                            <div className="buttonText">
                                                {infoTextAdv}
                                                <div>
                                                    <br/>
                                                    <button
                                                        style={styles.bookNow}
                                                        onClick={() => handleJobType("ADVANCED")}>Book now!
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div className="boxDiamond" style={{
                                // backgroundImage: `url(${diamond})`
                            }}>
                                <div className="bigDiv">
                                    <div className="btn">
                                        <button
                                            className="showInfo"
                                            onClick={() => {
                                                if (window.innerWidth > 900) {
                                                    handleExtraInformationDia(
                                                        "Our 'Diamond Cleaning' service represents the pinnacle of " +
                                                        "cleanliness, providing a top-tier, comprehensive cleaning experience" +
                                                        " with meticulous attention to detail, specialized cleaning solutions," +
                                                        " and a commitment to delivering the highest standard of cleanliness" +
                                                        " and hygiene for your space.")
                                                } else if (window.innerWidth < 450) {
                                                    handleJobType("DIAMOND")
                                                }else {
                                                    handleExtraInformationDia("Our most luxurious service. Everything will be sparkling clean.")
                                                }
                                                }}>DIAMOND
                                        </button>
                                    </div>
                                    {showExtraInfoDia && (
                                        <div
                                            className="buttonTextContainer"
                                            style={styles.buttonTextContainer}>
                                            <div className="buttonText">
                                                {infoTextDia}
                                                <div>
                                                    <br/>
                                                    <button
                                                        style={styles.bookNow}
                                                        onClick={() => handleJobType("DIAMOND")}>Book now!
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div className="boxWindow" style={{
                                // backgroundImage: `url(${windowclean})`
                            }}>
                                <div className="bigDiv">
                                    <div className="btn">
                                        <button
                                            className="showInfo"
                                            onClick={() => {
                                                if(window.innerWidth > 900) {
                                                    handleExtraInformationWin(
                                                        "Our 'Window Cleaning' service is dedicated to ensuring" +
                                                        " crystal-clear, streak-free windows that allow natural light to flood " +
                                                        "your space, enhancing its overall cleanliness and appearance.")
                                                } else if (window.innerWidth < 450) {
                                                    handleJobType("WINDOW")
                                                }else {
                                                    handleExtraInformationWin("Your windows will be transparent again!")
                                                }

                                            }}>WINDOW
                                        </button>
                                    </div>
                                    {showExtraInfoWin && (
                                        <div
                                            className="buttonTextContainer"
                                            style={styles.buttonTextContainer}>
                                            <div className="buttonText">
                                                {infoTextWin}
                                                <div>
                                                    <br/>
                                                    <button
                                                        style={styles.bookNow}
                                                        onClick={() => handleJobType("WINDOW")}>Book now!
                                                    </button>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>

                         :
                            <SetTempEmail
                                jobType={jobType}
                            toCalendar = {continueToCalendar}
                             email={settingTemporaryEmail}/>

                    }

                    </div>
                            )}

                <div style={styles.container1}>
                    {showCalender && isModalOpen ? (
                        <div style={styles.cal}>
                            <div style={styles.calenderStyles}>
                                <div style={styles.sectionTitle}>
                                    <p>Choose date and time</p>
                                </div>
                                <Calendar
                                    minDate={new Date()}
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

                                {showCalender && (<div style={styles.calenderBox}>

                                    <button type="submit" style={styles.bookButton} onClick={handleModal}>Go back
                                    </button>

                                    {showCalNext && <button type="submit" style={styles.bookButton} onClick={() => {
                                        handleSquarePaymentModal();
                                        handleCalender();
                                        setShowTimeSlots(false);
                                    }}>Continue
                                    </button>}
                                </div>)}

                                {isSquareModalOpen &&
                                    <div style={styles.form}>
                                        <form style={styles.form} onSubmit={(e) => {
                                            e.preventDefault();
                                            handleConfirm();
                                            handleSquarePaymentModal();
                                        }}>
                                            <div style={styles.sectionTitle}>
                                                <h3>What is the size of your accommodation?</h3>
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="Square meters"
                                                style={squareMetersStyle}

                                                onFocus={() => {
                                                    isTheFieldOk("size")
                                                }}
                                                onChange={(e) => {
                                                    squareMeters.current = e.target.value
                                                    isTheFieldOk("size")

                                                }}
                                                required
                                            />

                                            <div style={styles.sectionTitle}>
                                                <h3>Is there anything you want to add? (optional)</h3>
                                            </div>
                                            <textarea
                                                placeholder="Write a message..."
                                                style={styles.textarea}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            {!loggedIn && (
                                                <div style={styles.sectionTitle}>
                                                    <h3>What is your email address?</h3>
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

                                                <button style={styles.bookButton} onClick={() => {
                                                    handleSquarePaymentModal()
                                                    handleCalender()
                                                }}>Go back
                                                </button>
                                                <button type="submit" style={styles.bookButton}>
                                                    Continue
                                                </button>

                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>
                            {isConfirmModalOpen &&
                                <div style={styles.confirm}>
                                    <div style={styles.sectionTitle}>
                                        <h2>Confirm your booking </h2>
                                    </div>
                                    {
                                        loggedIn ?

                                            <p>
                                                You want to have your accommodation cleaned
                                                on {date}, {timeList[0].toLowerCase()} o'clock.<br/>
                                                You have chosen our {jobType.toLowerCase()} service which
                                                takes {hours} hour(s)
                                                for completion.<br/>
                                                The size of your accommodation is {squareMeters.current} square meters.
                                            </p>
                                         :
                                            // JSX content when loggedIn is false
                                            <p>
                                                You want to have your accommodation cleaned
                                                on {date}, {timeList[0].toLowerCase()} o'clock.<br/>
                                                You have chosen our {jobType.toLowerCase()} service which
                                                takes {hours} hour(s)
                                                for completion.<br/>
                                                The size of your accommodation is {squareMeters.current} square meters.
                                            </p>

                                    }


                                    <div style={styles.button}>
                                        <button type="button" style={styles.bookButton} onClick={() => {
                                            handleConfirm();
                                            handleModal();
                                            navigate(("/"))

                                        }}>Cancel
                                        </button>

                                        <button type="button" style={styles.bookButton} onClick={() => {
                                            handleBooking(emailaddress);
                                            handleConfirm();
                                            handleBookingDone();
                                        }}>Confirm
                                        </button>
                                    </div>
                                </div>
                            }
                            {isBookingDone &&
                                <div style={styles.centered}>
                                    <h2>Your booking was successfully created. <br/>A confirmation email has been sent
                                        to you. <br/> Thank you!</h2>
                                </div>}
                        </>
                    )}
                </div>
            </>
        )
            ;
    }
;

export default AddCustomerBookingOption;

const styles: { [key: string]: React.CSSProperties } = {
    calenderBox: {
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    sectionTitle: {
        fontWeight: 'bold',
        margin: '10px',
        textAlign: 'center',
    },
    cal: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '4%',
    },
    // boxContainer: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     width: '100%',
    // },
    boxText: {
        display: 'flex',
    },
    calenderContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
    calenderStyles: {
        backgroundColor: "#b3d9e3",
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
        marginTop: "7%",
        padding: 30,
        fontSize: "1.2rem",
        textAlign: 'center',
    },
    buttonTextContainer: {
        backgroundColor: '#ffffff',

        padding: '10px',
        textAlign: 'center',
        marginTop: '2rem',
        border: "1px solid black"
    },
    bookNow: {
        border: "1px solid black"
    },
    slotsContainer: {
        textAlign: 'center',
    },
    slots: {
        // margin: 1,
        marginTop: "1.8%",
        border: "1px solid silver",
        marginLeft: "0.5%",
        marginRight: "0.5%"
    },
    confirm: {
        fontSize: "1.2rem",
        textAlign: 'center',
    },
    input: {
        // marginTop: '10px',
        // marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "0.9rem"
    },
    invalidInput: {

        padding: '10px',
        width: '75%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "0.9rem",
        backgroundColor: "#ffe4e4",
        border: "red 2px",
    },
    btn: {
        display: "flex",
        justifyContent: "center",
    }
};
