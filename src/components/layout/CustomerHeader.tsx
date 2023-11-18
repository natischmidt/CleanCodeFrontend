import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LoginModal} from "../customer-components/customer-modals/LoginModal";
import customer from "../../API/customer";
import {RegisterModal} from "../customer-components/customer-modals/RegisterModal";
import {useUserType} from "../context/UserTypeContext";


interface HeaderProps {
    showLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerHeader: React.FC<HeaderProps> = ({showLoggedIn}) => {
    const {loggedIn, setLoggedIn, setUserType, setId, id} = useUserType();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const goToHome = useNavigate()


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
        try {
            await customer.logout(id);
            goToHome("/")
        } catch (e) {
            console.error(e)
        }
        setLoggedIn(false);
        setId(null);
        setUserType(null);
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
            <div style={styles.logo}><img src="src/assets/stadaFint.png" alt="Logo" style={styles.logo}/></div>

            <ul className="navbar">
                <li style={styles.navItem}>
                    <Link to="/" style={styles.link}>
                        Home
                    </Link>
                </li>
                {(
                    <li style={styles.navItem}>
                        <Link to="/customerbooking" style={styles.link}>
                            Book
                        </Link>
                    </li>
                )}
                {loggedIn && (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/customermypages" style={styles.link}>
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

                        <div style={styles.link}>
                            <button style={styles.button} onClick={handleLoginClick}>Log In</button>
                            <button style={styles.button}
                                    onClick={handleRegisterClick}>
                                Register
                            </button>
                        </div>

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
                <ul style={{padding: "10px"}} className={`menu ${menuOpen ? 'open' : ''}`}>
                    <li style={{fontSize: "1.2rem"}}>
                        <Link to="/" style={styles.link}>
                            Home
                        </Link>
                    </li>
                    <li style={{fontSize: "1.2rem"}}>
                        <Link to="/customerbooking" style={styles.link}>
                            Book
                        </Link>
                    </li>
                    {!loggedIn && (
                        <>
                            <li style={{...styles.link, fontSize: "1.2rem"}} onClick={handleLoginClick}>Log in
                            </li>

                            <li style={{...styles.link, fontSize: "1.2rem"}} onClick={handleRegisterClick}>Register</li>

                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li style={{fontSize: "1.2rem"}}>
                                <Link to="/customermypages" style={styles.link}>
                                    My Pages
                                </Link>
                            </li>
                            {/*<li>*/}
                            {/*    /!*<Link to="/customerbooking" style={styles.link}>*!/*/}
                            {/*    /!*    Book*!/*/}
                            {/*    /!*</Link>*!/*/}
                            {/*</li>*/}
                            <li style={{...styles.link, fontSize: "1.2rem"}} onClick={handleLogoutClick}>Log out
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}
export default CustomerHeader;
const styles = {
    header: {
        backgroundColor: '#a0c1cc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginTop: '0rem',
        height: '6rem',
    },
    logo: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '24px',
        height: '5rem',
    },
    navItem: {
        margin: '0 10px',
        color: 'black',
        fontWeight: 'bold',
        marginRight: '35px',
        fontSize: "1.2rem"
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
