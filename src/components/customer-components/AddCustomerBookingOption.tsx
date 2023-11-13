import '../../App.css'
import React, {useRef, useState} from "react";
import Calendar from "react-calendar";
import admin from "../../API/admin";
import diamond from "../../assets/diamond3.png";
import basic from "../../assets/basic2.png";
import advanced from "../../assets/advanced2.jpg";
import windowclean from "../../assets/www.png";
import {useUserType} from "../context/UserTypeContext";
import customer from "../../API/customer";
import SetTempEmail from "./customer-modals/SetTempEmail";

const AddCustomerBookingOption = () => {

        const [showExtraInfo, setShowExtraInfo] = useState(false);
        const [showExtraInfoAdv, setShowExtraInfoAdv] = useState(false);
        const [showExtraInfoDia, setShowExtraInfoDia] = useState(false);
        const [showExtraInfoWin, setShowExtraInfoWin] = useState(false);

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
        const [squareMeters, setSquareMeters] = useState('');
        const [emailaddress, setEmailAddress] = useState('');
        const [paymentOption, setPaymentOption] = useState("")
        const [message, setMessage] = useState("")
        const [showCalNext, setShowCalNext] = useState(false)
        // const [tempId, setTempId] = useState<any>(null);

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
        //
        // const handleRegister = async (email: string) => {
        //     await customer.register(email);
        // }

        const handleBooking = (email: string) => {
            customer.book(jobType, dateToUse.current, timeList, squareMeters, paymentOption, id, message, email);
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

                console.log(dateToUse.current + "........." + hours)
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
                        {!showSetTempEmail ?
                        <div style={styles.boxContainer}>
                            <div style={{
                                ...styles.box,
                                backgroundImage: `url(${basic})`
                            }}>
                                <div>
                                    <div>
                                        <button
                                            style={styles.showInfo}
                                            onClick={() => handleExtraInformation(
                                                "Our 'Basic Cleaning' service provides essential cleaning tasks such as " +
                                                "surface cleaning, floor care, and bathroom and kitchen maintenance to maintain a " +
                                                "clean and fresh living or working space.")}>BASIC
                                        </button>
                                    </div>
                                    {showExtraInfo && (
                                        <div style={styles.buttonTextContainer}>
                                            <div style={styles.buttonText}>
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
                            <div style={{
                                ...styles.box,
                                backgroundImage: `url(${advanced})`
                            }}>
                                <div>
                                    <div>
                                        <button
                                            style={styles.showInfo}
                                            onClick={() => handleExtraInformationAdv(
                                                "Our 'Advanced Cleaning' service goes beyond the basics, offering a" +
                                                " comprehensive and deep cleaning experience that includes thorough " +
                                                "cleaning of hard-to-reach areas, detailed kitchen and bathroom " +
                                                "cleaning, and a meticulous focus on all surfaces, ensuring a spotless " +
                                                "environment.")}>ADVANCED
                                        </button>
                                    </div>
                                    {showExtraInfoAdv && (
                                        <div style={styles.buttonTextContainer}>
                                            <div style={styles.buttonText}>
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
                            <div style={{
                                ...styles.box,
                                backgroundImage: `url(${diamond})`
                            }}>
                                <div>
                                    <div>
                                        <button
                                            style={styles.showInfo}
                                            onClick={() => handleExtraInformationDia(
                                                "Our 'Diamond Cleaning' service represents the pinnacle of " +
                                                "cleanliness, providing a top-tier, comprehensive cleaning experience" +
                                                " with meticulous attention to detail, specialized cleaning solutions," +
                                                " and a commitment to delivering the highest standard of cleanliness" +
                                                " and hygiene for your space.")}>DIAMOND
                                        </button>
                                    </div>
                                    {showExtraInfoDia && (
                                        <div style={styles.buttonTextContainer}>
                                            <div style={styles.buttonText}>
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
                            <div style={{
                                ...styles.box,
                                backgroundImage: `url(${windowclean})`
                            }}>
                                <div>
                                    <div>
                                        <button
                                            style={styles.showInfo}
                                            onClick={() => handleExtraInformationWin(

                                                "Our 'Window Cleaning' service is dedicated to ensuring" +
                                                " crystal-clear, streak-free windows that allow natural light to flood " +
                                                "your space, enhancing its overall cleanliness and appearance.")}>WINDOW
                                        </button>
                                    </div>
                                    {showExtraInfoWin && (
                                        <div style={styles.buttonTextContainer}>
                                            <div style={styles.buttonText}>
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
                        </div> :
                            <SetTempEmail
                                jobType={jobType}
                            toCalendar = {continueToCalendar}
                             email={settingTemporaryEmail}/>}
                    </div>)}

                <div style={styles.container}>
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

                                {showCalender && (<div>

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
                                                <h3>Whats the size of your accommodation?</h3>
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
                                                <h3>Choose payment method</h3>
                                            </div>
                                            <select
                                                value={paymentOption}
                                                style={styles.input}
                                                onChange={(e) => setPaymentOption(e.target.value)}
                                                required
                                            >
                                                <option value="">Choose payment option:</option>
                                                <option value="KLARNA">Klarna</option>
                                                {/*<option value="CASH">Cash</option>*/}
                                            </select>

                                            <div style={styles.sectionTitle}>
                                                <h3>Is anything you want to add?</h3>
                                            </div>
                                            <textarea
                                                placeholder="Write a message..."
                                                style={styles.textarea}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            {!loggedIn && (
                                                <div style={styles.sectionTitle}>
                                                    <h3>Whats your email address?</h3>
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
                                        loggedIn ? (
                                            <>
                                                You want to have your accommodation cleaned
                                                on {date}, {timeList[0].toLowerCase()} a'clock.
                                                You have chosen our {jobType.toLowerCase()} service which
                                                takes {hours} hour(s)
                                                for completion.<br/>
                                                The size of your accommodation is {squareMeters} square meters and you wish
                                                to
                                                pay with {paymentOption}.
                                            </>
                                        ) : (
                                            // JSX content when loggedIn is false
                                            <>
                                                You want to have your accommodation cleaned
                                                on {date}, {timeList[0].toLowerCase()} a'clock.
                                                You have chosen our {jobType.toLowerCase()} service which
                                                takes {hours} hour(s)
                                                for completion.<br/>
                                                The size of your accommodation is {squareMeters} square meters and you wish
                                                to
                                                pay with {paymentOption}.
                                            </>
                                        )
                                    }


                                    <div style={styles.button}>
                                        <button type="button" style={styles.bookButton} onClick={() => {
                                            handleConfirm();
                                            handleModal();
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
                                    <h2>Your booking was successfully created. <br/>You will have a confirmation email sent
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: "0.9rem",
        // marginTop: "2rem"
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        // marginTop: '2%',
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
        width: '12rem',
        height: '18rem',
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
        marginTop: "7%",
        padding: 30,
        fontSize: "1.2rem",
    },
    buttonText: {
        fontSize: '0.9rem',
        color: "#000000",
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
    showInfo: {
        border: "1px solid black"
    },
    slots: {
        margin: 10,
        marginTop: "4%",
        border: "1px solid silver",
    },
    confirm: {
        fontSize: "1.2rem"
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
};
