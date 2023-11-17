import React, {useContext, useEffect, useState} from 'react';
import BookingTable from "../tables/BookingTable";
import CustomerJobCheck from "../customer-components/CustomerJobCheck";
import {UserTypeContext} from "../context/UserTypeContext";
import {DashboardUserData} from "./DashboardUserData";
import employee from "../../API/employee";
import EditEmployee from "../forms/EditEmployeeForm";
import EmployeeShiftCont from "../../pages/employee-pages/ShiftDashboard";
import EditBookingForm from "../forms/EditBookingForm";
import customer from "../../API/customer";
import EditCustomerForm from "../forms/EditCustomerForm";
import "../../styles/Dashboard.css";

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
    const [showEmployeePersonalInformationComponent, setShowEmployeePersonalInformationComponent] = useState(false)
    const [showCustomerPersonalInformationComponent, setShowCustomerPersonalInformationComponent] = useState(false)
    const [showSalary, setShowSalary] = useState(false)
    const [workedHours, setWorkedHours] = useState(0)
    const [hourlySalary, setHourlySalary] = useState(0)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
    const [change, setChange] = useState(0)
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
            if (contextUserType === "EMPLOYEE" || contextUserType === "ADMIN") {
                fetchEmployeeData(id).then((data) => {
                    setData(data);
                    setUsername(data.firstName + " " +data.lastName)
                });
            }
            if (contextUserType === "CUSTOMER") {
                fetchCustomerData(id).then((data) => {
                    setData(data)
                    setUsername(data.firstName + " " +data.lastName)
                })
            }
        }

    }, [id, contextUserType, change]);

    const fetchEmployeeData = async (id: string): Promise<DashboardUserData> => {
        try {
            const response = await employee.getEmployee(id.toString())
            return response;
        } catch (error) {
            throw new Error(`Error fetching employee ${error}`);
        }
    };

    const fetchCustomerData = async (id: string): Promise<DashboardUserData> => {
        try {
            const response = await customer.fetchData(id.toString())
            return response;
        } catch (error) {
            throw new Error(`Error fetching employee ${error}`);
        }
    };

    const handleBookingUpdate = (jobId: number) => {
        setSelectedJobId(jobId)
        setShowEdit(true)
    }
    const handleDoneEdit = () => {
        setShowEdit(false)
    }

    const handleEmployeeUpdate = () => {
        setShowEmployeePersonalInformationComponent(!showEmployeePersonalInformationComponent)
        setChange(x => x +1)
    }

    const handleCustomerUpdate = () => {
        setShowCustomerPersonalInformationComponent(!showCustomerPersonalInformationComponent)
        setChange(x => x +1)
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
                    <div>
                        <div className="section timeSection">
                            <div className="section-content hidewelcome">
                                <div>Welcome {username}! </div>
                                <div>Today's Date: {new Date().toLocaleDateString()}</div>
                                <div>Time: {time.toLocaleTimeString()}</div>
                            </div>
                        </div>
                        <div className="dashboard">

                            <div className="section" style={styles.section}>
                                <div className="section-title" style={styles.sectionTitle}>
                                    {userType === 'admin'
                                        ? 'All upcoming bookings' :
                                        userType === 'customer' && !showCustomerPersonalInformationComponent
                                            ? '' :
                                            userType === 'employee' && !showEmployeePersonalInformationComponent
                                            ? 'My Upcoming Shifts' : 'Edit Information'}
                                </div>
                                <div className="section-content" style={styles.sectionContent}>
                                    {userType === "admin" && !showEdit ?
                                        <BookingTable onUpdate={handleBookingUpdate}/> : <></> }
                                    {userType === "admin" && showEdit ?
                                        <EditBookingForm jobId={selectedJobId}  doneWithEdit={handleDoneEdit}/>: <></> }

                                    {userType === "customer" && !showCustomerPersonalInformationComponent && <CustomerJobCheck/>}
                                    {userType === "customer" && showCustomerPersonalInformationComponent && <EditCustomerForm
                                        cusId={id || null}
                                        doneWithEdit={handleCustomerUpdate}
                                    /> }
                                    {userType === "employee" && !showEmployeePersonalInformationComponent && <EmployeeShiftCont/>}
                                    {userType === "employee" && showEmployeePersonalInformationComponent && <EditEmployee
                                        empId={id ? parseInt(id, 10) : undefined}
                                        doneWithEdit={handleEmployeeUpdate}
                                    /> }
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
                                        onClick={() => setShowEmployeePersonalInformationComponent(!showEmployeePersonalInformationComponent)}
                                    >Change my data
                                    </button>
                                    </div>
                                </div>
                            </div>
                             }
                            { userType == "customer" &&
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
                                        <div style = {styles.buttonDiv}>
                                            <button
                                                style={styles.updatePersonalInformationButton}
                                                onClick={() => setShowCustomerPersonalInformationComponent(!showCustomerPersonalInformationComponent)}
                                            >Change my data
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
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
        justifyContent: "space-evenly",
    },
    test: {
        display: "flex",
        justifyContent: "left",
    }
};
export default Dashboard;
