import logo from "../assets/logo3.png";
import {useNavigate} from "react-router-dom";
import React from "react";
export default function Header() {

    const goToBooking = useNavigate()
    const goToEmployees = useNavigate()
    const goToCustomers = useNavigate()
    const goToGDPR = useNavigate()
    const goToAddUser = useNavigate()
    const goToLogin = useNavigate()

    return (
        <div className="headerContainer" style={styles.header}>
            <div className="logo">
                <img id="logo3" src={logo} alt="logo3" style={styles.logo} />
            </div>
            <div className="menuButtons" style={styles.menuButtons}>
                <button id="Booking" style={styles.btn} onClick={() => {{goToBooking(("/Booking"))}}}>Booking</button>
                <button id="Employees" style={styles.btn} onClick={() => {{goToEmployees(("/Employees"))}}}>Employees</button>
                <button id="Customers" style={styles.btn} onClick={() => {{goToCustomers(("/Customers"))}}}>Customers</button>
                <button id="GDPR" style={styles.btn} onClick={() => {{goToGDPR(("/GDPR"))}}}>GDPR</button>
                <button id="AddUser" style={styles.btn} onClick={() => {{goToAddUser(("/AddUser"))}}}>Create New User</button>
                <button id="SignOut" style={styles.btn} onClick={() => {{goToLogin(("/"))}}}>Sign Out</button>
            </div>
        </div>
    )
}

const styles = {
    header: {
        backgroundColor: '#E2FFF8',
        borderBottom: '5px solid #52af66',
        display: 'flex',
        position: 'relative',
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    logo: {
        maxWidth: '200px',
        marginBottom: '10px',
    },
    menuButtons: {
        display: 'flex',
        color: '#000001',
        marginLeft: "7%",
        flexBasis: 'auto',
        flexGrow: 1,
        justifyContent: 'flex-end',
        marginTop: '10px',
    },
    btn: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '200px',
        height: '60px',
        fontWeight: 'normal',
    },
};
