import React, {useContext, useEffect, useState} from 'react';
import BookingHistoryTable from "../components/tabels/BookingHistoryTable";
import BookingTable from "../components/tabels/BookingTable";
import updateBooking from "../adminForms/updateBooking";
import CustomerJobCheck from "../components/CustomerJobCheck";
import MyShifts from "../pages/EmployeePages/MyShifts";
import {UserTypeContext} from "../components/UserTypeContext";
import {DashboardUserData} from "./DashboardUserData";
import axios from 'axios';

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

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        address: "",
        SSnumber: "",
        phoneNumber: "",
    });

    // useEffect(() => {
    //     if (contextUserType && id) {
    //         if (contextUserType === "Customer") {
    //             fetchCustomerData(id).then((data) => {
    //                 setUserData(data);
    //             });
    //         } else if (contextUserType === "Employee") {
    //             fetchEmployeeData(id).then((data) => {
    //                 setUserData(data);
    //             });
    //         }
    //     }
    // }, [id, contextUserType]);

    const handleBookingUpdate = (jobId: number) => {
        console.log(`Booking ${jobId} was updated.`);
    };

    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        setTime(new Date())

        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 60000);

        return () => {
            clearInterval(intervalId)
        }
    })

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
                    {userType === "customer" && <CustomerJobCheck />}

                </div>
            </div>

            <div className="section" style={styles.section}>
                <div className="section-title" style={styles.sectionTitle}>
                    User Data
                </div>
                <div className="section-content">
                    <div>First Name: {userData.firstname}</div>
                    <div>Last Name: {userData.lastname}</div>
                    <div>Email: {userData.email}</div>
                    {userData.address !== '' ?<div>Address: {userData.address}</div>: <></>}
                    {userData.SSnumber !== '' ? <div>Social Security Number: {userData.SSnumber}</div> : <></>}
                    <div>Phone Number: {userData.phoneNumber}</div>
                </div>
            </div>



            <div className="section" style={styles.section}>
                <div className="section-title" style={styles.sectionTitle}>
                    (Specific Content)
                </div>
                <div className="section-content">
                    {userType === 'admin' ? (
                        <div>Transaction Overview</div>
                    ) : userType === 'customer' ? (
                        <div>(Customer-specific content)</div>
                    ) : (
                        <div>(Employee-specific content)</div>
                    )}
                    <BookingHistoryTable />
                </div>
            </div>
            </div>
        </div>
    );
};





const fetchEmployeeData = async (employeeId: string): Promise<DashboardUserData> => {
    try {
        const response = await axios.post(`http://localhost:8080/api/getEmployee`, null, {
            headers: { empId: employeeId }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching employee ${error}`);
    }
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
    }
};
export default Dashboard;


