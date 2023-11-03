import React, {useContext, useEffect, useState} from 'react';
import BookingTable from "../tables/BookingTable";
import CustomerJobCheck from "../customer-components/CustomerJobCheck";
import MyShifts from "../../pages/employee-pages/MyShifts";
import {UserTypeContext} from "../context/UserTypeContext";
import {DashboardUserData} from "./DashboardUserData";
import employee from "../../API/employee";
import EditEmployee from "../forms/EditEmployeeForm";
import EmployeeShiftCont from "../../pages/employee-pages/EmployeeShiftCont";

interface DashboardProps {
    userType: 'customer' | 'employee' | 'admin';
    userData: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        address: string,
        postalCode: string,
        city: string,
        SSnumber: string,
        phoneNumber: string,
    }
}

const Dashboard: React.FC<DashboardProps> = ({userType,userData}) => {
    const lala = userData.address;
    const userTypeContext = useContext(UserTypeContext);
    const id = userTypeContext?.id;
    const contextUserType = userTypeContext?.userType;
    const [showPersonalInformationComponent, setShowPersonalInformationComponent] = useState(false)
    const [showSalary, setShowSalary] = useState(false)
    const [workedHours, setWorkedHours] = useState(0)
    const [hourlySalary, setHourlySalary] = useState(0)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        postalCode: "",
        city: "",
        SSnumber: "",
        phoneNumber: "",
    });
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (contextUserType && id) {
            // @ts-ignore
            if (contextUserType === "EMPLOYEE" || contextUserType === "ADMIN") {
                fetchEmployeeData(id).then((data) => {
                    // @ts-ignore
                    setData(data);
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", data)
                    setUsername(data.firstName + " " +data.lastName)
                });
            }
            // else if(contextUserType === "Customer"){
            //     console.log("OHHH" +userData.lastName);
            //     setUsername(userData.firstName + " " +userData.lastName)
            // }
        }

    }, [id, contextUserType]);

    const fetchEmployeeData = async (id: string): Promise<DashboardUserData> => {
        try {
            // @ts-ignore
            const response = await employee.getEmployee(id.toString())
            return response;
        } catch (error) {
            throw new Error(`Error fetching employee ${error}`);
        }
    };

    const handleBookingUpdate = (jobId: number) => {
        console.log(`Booking ${jobId} was updated.`);
    }

    const handleUpdate = () => {
        setShowPersonalInformationComponent(!showPersonalInformationComponent)
    }

    const handleKlarna = () => {
        setShowPersonalInformationComponent(!showPersonalInformationComponent)
    }

    const goToSalary = () => {
        if(!showSalary) {
            employee.getSalary(id).then(response => {
                setHourlySalary(response.hourlySalary)
                setWorkedHours(response.workedHours)
            })
        }
        setShowSalary(!showSalary)
    }

    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        setTime(new Date())

        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <div>
                {showPersonalInformationComponent ? <EditEmployee
                    empId={id ? parseInt(id, 10) : undefined}
                    doneWithEdit={handleUpdate}

                    /> :
                    <div>
                        <div className="section" style={styles.timeSection}>
                            {/*<div className="section-title" style={styles.sectionTitle}>*/}
                            {/*    Today's Date and Time*/}
                            {/*</div>*/}
                            <div className="section-content">
                                <div>Welcome {username}! </div>
                                <div>Today's Date: {new Date().toLocaleDateString()}</div>
                                <div>Time: {time.toLocaleTimeString()}</div>
                            </div>
                        </div>
                        <div className="dashboard" style={styles.dashboard}>

                            <div className="section" style={styles.section}>
                                {/*<p style={styles.sectionTitle}>My upcoming jobs</p>*/}
                                <div className="section-title" style={styles.sectionTitle}>
                                    {userType === 'admin'
                                        ? 'All upcoming bookings'
                                        : userType === 'customer'
                                            ? ''
                                            : 'My Upcoming Shifts'}
                                </div>
                                <div className="section-content">
                                    {userType === "admin" && <BookingTable onUpdate={handleBookingUpdate} onKlarna={handleKlarna}/>}
                                    {userType === "customer" && <CustomerJobCheck/>}
                                    {userType === "employee" && <EmployeeShiftCont />}

                                </div>

                            </div>
                            { userType == "employee" &&
                            <div className="section" style={styles.sectionUserData}>
                                <div className="section-title" style={styles.sectionTitle}>
                                    My personal information
                                </div>
                                <div className="section-content" style={styles.personalInformationDiv}>
                                    <div>{data.firstName} {data.lastName}</div>

                                    <div>{data.email}</div>
                                    {data.address !== '' ? <div>{data.address}</div> : <></>}
                                    {/*{data.SSnumber !== '' ? <div>Social Security Number: {data.SSnumber}</div> : <></>}*/}
                                    <div>{data.postalCode}</div>
                                    <div>{data.city}</div>
                                    <div>{data.phoneNumber}</div>
                                    {!showSalary ?
                                    <div
                                        onClick={() => goToSalary()}>
                                        This months hours worked and earned salary: Click
                                    </div>
                                        :
                                        <div
                                            onClick={() => goToSalary()}>
                                            You have worked: {workedHours} hours this month <br/>
                                            Your salary this month: {workedHours * hourlySalary} kr.
                                        </div>
                                    }
                                    <div style = {styles.buttonDiv}>

                                    <button
                                        style={styles.updatePersonalInformationButton}
                                        onClick={() => setShowPersonalInformationComponent(true)}
                                    >Change my data
                                    </button>
                                    </div>
                                </div>
                            </div>
                             }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    dashboard: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        color: 'black',
    },
    section: {
        flex: 1,
        // border: '1px solid #ccc',
        margin: '-0%',
        padding: '10px',
        textAlign: 'center',
        // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: '1%',
        fontSize: "2rem",
        marginTop: "-50px",
        // fontSize: "1.5rem",
        // borderBottom: "2px solid black"
    },
    timeSection: {
        flex: 1,
        // border: '1px solid #ccc',
        margin: '10px',
        padding: '1px',
        textAlign: 'right',
        // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
    sectionUserData: {
        // flex: 1,
        border: '1px solid #ccc',
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        width: "17%",
        height: "80%",
    },
    updatePersonalInformationButton: {
        backgroundColor: "#729ca8",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        margin: "1rem",
    },
    buttonDiv: {
        display: "flex",
        justifyContent: "space-evenly"
    }
};
export default Dashboard;
