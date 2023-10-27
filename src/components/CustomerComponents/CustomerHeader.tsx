import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LoginModal} from "./LoginModal";
import customer from "../../API/customer";
import {RegisterModal} from "./RegisterModal";
import '../../styles/HeaderStyles.css'
import {useUserType} from "../UserTypeContext";

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
    navItem: {
        margin: '0 10px',
        color: 'black',
        fontWeight: 'bold',
        marginRight: '35px',
    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        cursor: 'pointer',
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
    }
};

interface HeaderProps {
    showLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

    const CustomerHeader: React.FC <HeaderProps> = ({showLoggedIn}) => {
        const {loggedIn, setLoggedIn, setUserType, setId} = useUserType();
        const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true)
    }

    const handleRegisterClick = () => {
        setLoggedIn(false);
        setIsLoginModalOpen(false)
        setIsRegisterModalOpen(true)
    }

    const handleLogoutClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoggedIn(false);
        customer.handleLogoutClick();
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>Städafint AB</div>
            <ul className="navbar">
                <li style={styles.navItem}>
                    <Link to="/CustomerHome" style={styles.link}>
                        Home
                    </Link>
                </li>
                {(
                    <li style={styles.navItem}>
                        <Link to="/CustomerBooking" style={styles.link}>
                            Book
                        </Link>
                    </li>
                )}
                {loggedIn && (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/CustomerMyPages" style={styles.link}>
                                My Pages
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <button style={styles.button} onClick={handleLogoutClick}>
                                Log Out
                            </button>
                        </li>
                    </>
                )}
                <li style={styles.navItem}>
                    {!loggedIn && (
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
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal}/>}
            {isRegisterModalOpen && <RegisterModal onClose={closeRegisterModal}/>}
            <div className="hamburger-text">
                <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/CustomerHome" style={styles.link}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/CustomerBooking" style={styles.link}>
                            Book
                        </Link>
                    </li>
                    {!loggedIn && (
                        <>
                            <li style={styles.link} onClick={handleLoginClick}>Log in
                            </li>
                            <li>
                                <li style={styles.link} onClick={handleRegisterClick}>Register</li>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li>
                                <Link to="/CustomerMyPages" style={styles.link}>
                                    My Pages
                                </Link>
                            </li>
                            <li>
                                <Link to="/CustomerBooking" style={styles.link}>
                                    Book
                                </Link>
                            </li>
                            <li style={styles.link} onClick={handleLogoutClick}>Log out
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}
export default CustomerHeader;
