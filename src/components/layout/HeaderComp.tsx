import logo from "../../assets/stadaFint.png";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {UserTypeProvider, useUserType} from "../context/UserTypeContext";
import {GDPRModal} from "../customer-components/customer-modals/GDPRModal";
import {GDPRModal_employee} from "../modals/GDPRModal_employee";

export default function HeaderComp() {

    const gotoDashBoard = useNavigate()
    const goToBooking = useNavigate()
    const goToEmployees = useNavigate()
    const goToCustomers = useNavigate()
    const goToGDPR = useNavigate()
    const goToAddUser = useNavigate()
    const goToLogin = useNavigate()
    const {userType} = useUserType();

    const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

    const closeGDRPModal = () => {
        setIsGDPRModalOpen(false);
    };

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const headers = {
            //     'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            //     'Content-Type': 'application/json',
            // };
            //
            // const Url = 'http://localhost:8080/api/auth/logoutEmployee';
            //
            // const response = await axios.post(Url, {headers: headers});
            //
            // console.log('Employee/Admin has successfully logged out', response.data);

            goToLogin("/Employee")
        } catch (error) {
            console.error('Error signing out employee/admin', error);
        }
    }

    const goBackToDashboard = () => {
        console.log("Körs jag?")
        console.log("TYPE: " + userType);
        if (userType == "ADMIN") {
            gotoDashBoard(("/AdminHome"))
        } else if (userType == "EMPLOYEE") {
            gotoDashBoard(("/EmployeeHome"))
        }
    }

    return (
        <>
            <div className="headerContainer" style={styles.header}>
                <div className="logo">
                    <img id="logo3" src={logo} alt="logo3" style={styles.logo}/>
                </div>
                <div className="menuButtons" style={styles.menuButtons}>
                    <button id="Employees" style={styles.btn} onClick={() => {
                        goBackToDashboard()
                    }}>Home
                    </button>
                    {/*<button id="goBackToDashboard" style={styles.btn} onClick={() => goBackToDashboard()}>Home</button>*/}
                    <button id="Booking" style={styles.btn} onClick={() => {
                        {
                            goToBooking(("/Booking"));
                        }
                    }}>Bookings
                    </button>

                    {userType == "ADMIN" && <button id="Employees" style={styles.btn} onClick={() => {
                        {
                            goToEmployees(("/Employees"));
                        }
                    }}>Employees</button>}
                    <button id="Customers" style={styles.btn} onClick={() => {
                        {
                            goToCustomers(("/Customers"));
                        }
                    }}>Customers
                    </button>
                    <button id="AddUser" style={styles.btn} onClick={() => {
                        {
                            goToAddUser(("/AddUser"));
                        }
                    }}>Create New User
                    </button>
                    <button id="SignOut" style={styles.btn} onClick={handleLogout}>Sign Out</button>
                </div>
            </div>
            <div>
                {isGDPRModalOpen && (
                    <GDPRModal_employee onClose={closeGDRPModal}/>
                )}
            </div>
        </>
    )
}

const styles = {
    header: {
        backgroundColor: '#E2FFF8' as '#E2FFF8',
        borderBottom: '5px solid #729ca8',
        display: 'flex',
        position: 'relative' as 'relative',
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as 'wrap',
        // fontFamily: 'Childos',
        // fontSize: "1.2rem"
    },
    logo: {
        maxWidth: '200px',
        marginBottom: '10px',
    },
    menuButtons: {
        display: 'flex',
        color: '#000001',
        // marginLeft: "7%",
        flexBasis: 'auto',
        flexGrow: 1,
        justifyContent: 'flex-end',
        marginTop: '10px',
    },
    btn: {
        backgroundColor: '#b3d9e3',
        marginLeft: '1%',
        width: '200px',
        height: '60px',
        fontWeight: 'normal',
    },
};
