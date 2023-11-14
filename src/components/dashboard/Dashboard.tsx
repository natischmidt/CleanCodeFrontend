import React, {useContext, useEffect, useState} from 'react';
import BookingTable from "../tables/BookingTable";
import CustomerJobCheck from "../customer-components/CustomerJobCheck";
import {UserTypeContext} from "../context/UserTypeContext";
import {DashboardUserData} from "./DashboardUserData";
import employee from "../../API/employee";
import EditEmployee from "../forms/EditEmployeeForm";
import EmployeeShiftCont from "../../pages/employee-pages/ShiftDashboard";
import EditBookingForm from "../forms/EditBookingForm";

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
    const [showEdit, setShowEdit] = useState(false)
    const[selectedJobId, setSelectedJobId] = useState<number | null>(null)
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
        setSelectedJobId(jobId)
        setShowEdit(true)
    }
    const handleDoneEdit = () => {
        setShowEdit(false)
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

    return (
        <div>
            <div>
                {showPersonalInformationComponent ? <EditEmployee
                    empId={id ? parseInt(id, 10) : undefined}
                    doneWithEdit={handleUpdate}

                    /> :
                    <div>
                        <div className="section" style={styles.timeSection}>
                            <div className="section-content">
                                <div>Welcome {username}! </div>
                                <div>Today's Date: {new Date().toLocaleDateString()}</div>
                                <div>Time: {time.toLocaleTimeString()}</div>
                            </div>
                        </div>
                        <div className="dashboard" style={styles.dashboard}>

                            <div className="section" style={styles.section}>
                                <div className="section-title" style={styles.sectionTitle}>
                                    {userType === 'admin'
                                        ? 'All upcoming bookings'
                                        : userType === 'customer'
                                            ? ''
                                            : 'My Upcoming Shifts'}
                                </div>
                                <div className="section-content" style={styles.sectionContent}>
                                    {userType === "admin" && !showEdit ?
                                        <BookingTable onUpdate={handleBookingUpdate}/> : <></> }
                                    {userType === "admin" && showEdit ?
                                        <EditBookingForm jobId={selectedJobId}  doneWithEdit={handleDoneEdit}/>: <></> }

                                    {userType === "customer" && <CustomerJobCheck/>}
                                    {userType === "employee" && <EmployeeShiftCont />}
                                </div>

                            </div>
                            { userType == "employee" &&
                            <div className="section" style={styles.sectionUserData}>
                                <div className="section-title" style={styles.sectionTitle2}>
                                    My personal information
                                </div>
                                <div className="section-content" style={styles.personalInformationDiv}>
                                    <div>{data.firstName} {data.lastName}</div>

                                    <div>{data.email}</div>
                                    {data.address !== '' ? <div>{data.address}</div> : <></>}
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
        marginTop: '3rem',
        padding: '10px',
        textAlign: 'center',
    },
    sectionContent: {
        flex: 1,
        marginTop: '2rem',
        padding: '10px',
        textAlign: 'center',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: "2.3rem",
        marginTop: "-7%",
        marginBottom: "-2rem",
        paddingLeft: "4%",
        textDecoration: "underline",
    },
    sectionTitle2: {
        fontWeight: 'bold',
        fontSize: "1.5rem",
        // marginTop: "-6%",
        paddingLeft: "4%",
        textDecoration: "underline",
    },
    timeSection: {
        flex: 1,
        margin: '10px',
        padding: '1px',
        textAlign: 'right',
    },
    sectionUserData: {
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
