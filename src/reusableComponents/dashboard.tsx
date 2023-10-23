import React, {useContext, useEffect, useState} from 'react';
import BookingHistoryTable from "../components/tabels/BookingHistoryTable";
import BookingTable from "../components/tabels/BookingTable";
import updateBooking from "../adminForms/updateBooking";
import CustomerJobCheck from "../components/CustomerJobCheck";
import MyShifts from "../pages/EmployeePages/MyShifts";
import {UserTypeContext} from "../components/UserTypeContext";
import {DashboardUserData} from "./DashboardUserData";
import axios from 'axios';
import employee from "../API/employee";
import EditPersonalInformationComponent from "./EditPersonalInformationComponent";

interface DashboardProps {
    userType: 'customer' | 'employee' | 'admin';
    userData: {
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        address: string,
        SSnumber: string,
        phoneNumber: string,
    }
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
    const userTypeContext = useContext(UserTypeContext);
    const id = userTypeContext?.id;
    const contextUserType = userTypeContext?.userType;
    const [showPersonalInformationModal, setShowPersonalInformationModal] = useState(false)

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        SSnumber: "",
        phoneNumber: "",
    });

    useEffect(() => {
        if (contextUserType && id) {
            if (contextUserType === "EMPLOYEE" || contextUserType === "ADMIN") {
                fetchEmployeeData(id).then((data) => {
                    setUserData(data);
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", data)
                });
                }
            }

    }, [id, contextUserType]);

    const fetchEmployeeData = async (employeeId: string): Promise<DashboardUserData> => {
        try {
            const response = await employee.getEmployee(id.toString())
            return response;
        } catch (error) {
            throw new Error(`Error fetching employee ${error}`);
        }
    };

    const handleBookingUpdate = (jobId: number) => {
        console.log(`Booking ${jobId} was updated.`);
    };

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
        <div className="section" style={styles.timeSection}>
            {/*<div className="section-title" style={styles.sectionTitle}>*/}
            {/*    Today's Date and Time*/}
            {/*</div>*/}
            <div className="section-content">
                <div>Today's Date: {new Date().toLocaleDateString()}</div>
                <div>Time: {time.toLocaleTimeString()}</div>
            </div>
        </div>
        <div className="dashboard" style={styles.dashboard}>

                <div className="section" style={styles.section}>
                    {/*<p style={styles.sectionTitle}>My upcoming jobs</p>*/}
                    <div className="section-title" style={styles.sectionTitle}>
                        {userType === 'admin'
                            ? 'All Upcoming Bookings'
                            : userType === 'customer'
                                ? 'My Upcoming Bookings'
                                : /*'My Upcoming Shifts'*/ <MyShifts/>}
                    </div>
                    <div className="section-content">
                        {userType === "admin" && <BookingTable onUpdate={handleBookingUpdate}/>}
                        {userType === "customer" && <CustomerJobCheck/>}

                    </div>
                </div>


                <div className="section" style={styles.sectionUserData}>
                    <div className="section-title" style={styles.sectionTitle}>
                        My personal information
                    </div>
                    <div className="section-content" style ={styles.personalInformationDiv}>
                        <div>{userData.firstName} {userData.lastName}</div>

                        <div>{userData.email}</div>
                        {userData.address !== '' ? <div>{userData.address}</div> : <></>}
                        {/*{userData.SSnumber !== '' ? <div>Social Security Number: {userData.SSnumber}</div> : <></>}*/}
                        <div>{userData.phoneNumber}</div>
                        <button
                            style={styles.updatePersonalInformationButton}
                            onClick={() => setShowPersonalInformationModal(true)}
                        >Change my information</button>
                    </div>
                </div>
                </div>



                {/*<div className="section" style={styles.section}>*/}
                {/*    <div className="section-title" style={styles.sectionTitle}>*/}
                {/*        (Specific Content)*/}
                {/*    </div>*/}
                {/*    <div className="section-content">*/}
                {/*        {userType === 'admin' ? (*/}
                {/*            <div>Transaction Overview</div>*/}
                {/*        ) : userType === 'customer' ? (*/}
                {/*            <div>(Customer-specific content)</div>*/}
                {/*        ) : (*/}
                {/*            <div>(Employee-specific content)</div>*/}
                {/*        )}*/}
                {/*        <BookingHistoryTable />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            }
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
        border: '1px solid #ccc',
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',

    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: '10px',

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
        textAlign: 'left',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        width: "30%",
        height: "12rem",

    },
    updatePersonalInformationButton: {
        backgroundColor: "#729ca8",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        marginTop: "1rem",

    },

};
export default Dashboard;


