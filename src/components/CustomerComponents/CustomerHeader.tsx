import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LoginModal} from "./LoginModal";
import axios from "axios";
import {RegisterModal} from "./RegisterModal";

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

interface HeaderProps {
    showLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerHeader: React.FC <HeaderProps> = ({showLoggedIn,setLoggedIn}) => {


    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const goToCustomerHome = useNavigate()

    const handleLoginClick = () => {
        setLoggedIn(true);
        setIsLoginModalOpen(true)
    }

    const handleRegisterClick = () => {
        setLoggedIn(false);
        setIsLoginModalOpen(false)
        setIsRegisterModalOpen(true)
    }

    const handleLogoutClick = async (e : React.FormEvent) => {
        e.preventDefault();
        setLoggedIn(false);
        try {
            const Url = 'http://localhost:8080/api/auth/logoutEmployee';

            const response = await axios.post(Url);

            console.log('Employee/Admin has successfully logged out', response.data);

            goToCustomerHome("/CustomerHome")
            setLoggedIn(false);

        } catch (error) {
            console.error('Error signing out employee/admin', error);
        }
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>Städafint AB</div>
            <ul style={styles.navbar}>
                <li style={styles.navItem}>
                    <Link to="/CustomerHome" style={styles.link}>Home</Link>
                </li>
                {showLoggedIn && (
                    <li style={styles.navItem}>
                        <Link to="/CustomerMyPages" style={styles.link}>My Pages</Link>
                    </li>
                )}
                <li style={styles.navItem}>
                    <Link to="/CustomerBooking" style={styles.link}>Book</Link>
                </li>
                <li style={styles.navItem}>
                    {showLoggedIn ? (
                        <button style={styles.button} onClick={handleLogoutClick}>
                            Log Out
                        </button>
                    ) : (
                        <>
                            <button style={styles.button} onClick={handleLoginClick}>
                                Log In
                            </button>
                            <button style={styles.button} onClick={handleRegisterClick}>
                                Register
                            </button>
                        </>
                    )}
                </li>
            </ul>
            {isLoginModalOpen && (
                <LoginModal onClose={closeLoginModal} />
            )}
            {isRegisterModalOpen && (
                <RegisterModal onClose={closeRegisterModal} />
            )}
        </header>
    );
}
export default CustomerHeader;
