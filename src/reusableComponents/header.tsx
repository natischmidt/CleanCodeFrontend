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
                <button id="AddUser" style={styles.btn} onClick={() => {{goToAddUser(("/AddUser"))}}}>CreateNewUser</button>
                <button id="SignOut" style={styles.btn} onClick={() => {{goToLogin(("/"))}}}>SignOut</button>
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
        width: '460px',
        height: '220px',
    },
    menuButtons: {
        display: 'flex',
        marginLeft: '30%',
        color: '#000001',
    },
    btn: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    // employees: {
    //     backgroundColor: '#53b067',
    //     marginLeft: '5%',
    //     width: '180px',
    //     height: '60px',
    //     fontSize: '1.2rem',
    //     fontWeight: 'normal',
    // },
    // customers: {
    //     backgroundColor: '#53b067',
    //     marginLeft: '5%',
    //     width: '180px',
    //     height: '60px',
    //     fontSize: '1.2rem',
    //     fontWeight: 'normal',
    // },
    // gdpr: {
    //     backgroundColor: '#53b067',
    //     marginLeft: '5%',
    //     width: '180px',
    //     height: '60px',
    //     fontSize: '1.2rem',
    //     fontWeight: 'normal',
    // },
    // signout: {
    //     backgroundColor: '#53b067',
    //     marginLeft: '5%',
    //     width: '180px',
    //     height: '60px',
    //     fontSize: '1.2rem',
    //     fontWeight: 'normal',
    // },
}