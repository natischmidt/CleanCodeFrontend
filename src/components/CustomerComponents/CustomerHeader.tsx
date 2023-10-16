import React, { useState } from 'react';
import {Link} from "react-router-dom";

const styles = {
    header: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    navbar: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 10px',
        color: 'black',
        fontWeight: 'bold',
        marginRight : '35px',
    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
    },
    button: {
        color: 'black',
        backgroundColor: '#b3d9e3',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        fontWeight: 'bold',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
        margin: '0 5px',
    },
};

const CustomerHeader: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>Städafint AB</div>
            <ul style={styles.navbar}>
                <li style={styles.navItem}>
                    <Link to="/CustomerHome" style={styles.link}>Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/CustomerMyPages" style={styles.link}>My Pages</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/CustomerBooking" style={styles.link}>Book</Link>
                </li>
                <li style={styles.navItem}>
                    <a href="/MyBookings" style={styles.link}>My Bookings</a>
                </li>
                <li style={styles.navItem}>
                    {isLoggedIn ? (
                        <button style={styles.button} onClick={handleLoginClick}>
                            Log Out
                        </button>
                    ) : (
                        <>
                            <button style={styles.button} onClick={handleLoginClick}>
                                Log In
                            </button>
                            <button style={styles.button}>
                                <a href="/Register" style={styles.link}>Register</a>
                            </button>
                        </>
                    )}
                </li>
            </ul>
        </header>
    );

}
export default CustomerHeader;
