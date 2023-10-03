import logo from "../assets/logo3.png";
import {Link, useNavigate} from "react-router-dom";
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
                {/*<a href="#" className="custom-link" onClick={handleClick}>*/}
                {/*    Klicka här*/}
                {/*</a>*/}
            </div>
        </div>
    )
}

function handleClick() {

}

const styles = {
    header: {
        backgroundColor: '#E2FFF8',
        borderBottom: '5px solid #52af66',
        display: 'flex',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        // marginLeft: "-40%",
        width: '320px',
        height: '160px',
    },
    menuButtons: {
        display: 'flex',
        color: '#000001',
        marginLeft: "15%",
    },
    btn: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '200px',
        height: '60px',
        fontWeight: 'normal',
    },
}