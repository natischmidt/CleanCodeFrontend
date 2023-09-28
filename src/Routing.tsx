import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginpage";
import Home from "./pages/home";
import BookingPage from "./pages/bookingoverview";
import EmployeePage from "./pages/employeeoverview";
import CustomerPage from "./pages/customeroverview";
import logo from "./assets/logo3.png";
import {GDPR} from "./pages/gdpr";
//import OverviewPage from "./pages/overviewpage";
//import TransactionPage from "./pages/transactionoverview";

function Routing() {
    return (
        <Router>
            <div className="headerContainer" style={styles.header}>
                <div className="logo">
                    <img id="logo3" src={logo} alt="logo3" style={styles.logo}/>
                </div>

                <div className="menuButtons" style={styles.menuButtons}>
                <Link to="/" style={styles.home}>Home</Link>
                <Link to="/booking" style={styles.booking}>Booking</Link>
                <Link to="/employees" style={styles.employees}>Employees</Link>
                <Link to="/customers" style={styles.customers}>Customers</Link>
                <Link to="/gdpr" style={styles.gdpr}>GDPR</Link>
                    {/* <Link to="/overview" className="nav-link">Overview</Link>
                <Link to="/transaction" className="nav-link">Transaction</Link>*/}
                <Link to="/login" style={styles.signout}>Login</Link>
            </div>

            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Booking" element={<BookingPage/>}/>
                <Route path="/Employees" element={<EmployeePage/>}/>
                <Route path="/Customers" element={<CustomerPage/>}/>
                <Route path="/GDPR" element={<GDPR/>}/>
                {/* <Route path="/Overview" element={<OverviewPage/>}/>
                <Route path="/Transaction" element={<TransactionPage/>}/>*/}
                <Route path="/Login" element={<LoginPage/>}/>
            </Routes>
        </Router>
    );
}

const styles = {
    header: {
        backgroundColor: '#E2FFF8',
        borderBottom: '5px solid #52af66',
        display: 'flex',
        padding: '10px',
        alignItems: 'center',
    },
    logo: {
        width: '460px',
        height: '220px',
    },
    menuButtons: {
        display: 'flex',
        marginLeft: '10%',
        color: '#000001',
    },
    home: {
        backgroundColor: '#53b067',
        borderRadius: '5px',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    booking: {
        backgroundColor: '#53b067',
        borderRadius: '5px',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    employees: {
        backgroundColor: '#53b067',
        borderRadius: '5px',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    customers: {
        backgroundColor: '#53b067',
        borderRadius: '5px',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    gdpr: {
        backgroundColor: '#53b067',
        borderRadius: '5px',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    signout: {
        backgroundColor: '#53b067',
        color: 'black',
        borderRadius: '5px',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
}
export default Routing;