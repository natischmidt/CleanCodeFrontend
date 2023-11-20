import logo from "../../assets/stadaFint.png";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {UserTypeProvider, useUserType} from "../context/UserTypeContext";
import {GDPRModal} from "../customer-components/customer-modals/GDPRModal";
import {GDPRModal_employee} from "../modals/GDPRModal_employee";
import employee from "../../API/employee";
import '../../styles/HeaderComp.css'

export default function HeaderComp() {

    const gotoDashBoard = useNavigate()
    const goToBooking = useNavigate()
    const goToEmployees = useNavigate()
    const goToCustomers = useNavigate()
    const goToGDPR = useNavigate()
    const goToAddUser = useNavigate()
    const goToLogin = useNavigate()
    const {userType} = useUserType();
    const {id} = useUserType();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

    const closeGDRPModal = () => {
        setIsGDPRModalOpen(false);
    };

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await employee.logoutEmployee(id)
            sessionStorage.removeItem("jwt")
            sessionStorage.removeItem("refresh_token")
            goToLogin("/employee")
        } catch (error) {
            console.error('Error signing out employee/admin', error);
        }
    }

    const goBackToDashboard = () => {
        if (userType == "ADMIN") {
            gotoDashBoard(("/adminhome"))
        } else if (userType == "EMPLOYEE") {
            gotoDashBoard(("/employeehome"))
        }
    }
    const goBackToDashboardHam = () => {
        if (userType == "ADMIN") {
            gotoDashBoard(("/adminhome"))
        } else if (userType == "EMPLOYEE") {
            gotoDashBoard(("/employeehome"))
        }
    }

    return (
        <>
            <div className="headerContainer">
                <div className="logo">
                    <img id="logo3" src={logo} alt="logo3" style={styles.logo}/>
                </div>
                <div className="headerMenu">
                    <div className="menuButtons" style={styles.menuButtons}>
                        <button id="Employees" className="btn" onClick={() => {
                            goBackToDashboard()
                        }}>Home
                        </button>
                        {/*<button id="goBackToDashboard" style={styles.btn} onClick={() => goBackToDashboard()}>Home</button>*/}
                        <button id="Booking" className="btn" onClick={() => {
                            {
                                goToBooking(("/booking"));
                            }
                        }}>Bookings
                        </button>

                        {userType == "ADMIN" && <button id="Employees" className="btn" onClick={() => {
                            {
                                goToEmployees(("/employees"));
                            }
                        }}>Employees</button>}
                        <button id="Customers" className="btn" onClick={() => {
                            {
                                goToCustomers(("/customers"));
                            }
                        }}>Customers
                        </button>
                        <button id="AddUser" className="btn" onClick={() => {
                            {
                                goToAddUser(("/AddUser"));
                            }
                        }}>Create new user
                        </button>
                        <button id="SignOut" className="btn" onClick={handleLogout}>Sign Out</button>
                    </div>
                </div>
                <div>
                    {isGDPRModalOpen && (
                        <GDPRModal_employee onClose={closeGDRPModal}/>
                    )}
                </div>
                <div className="hamburger-text">
                    <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                        <li>
                            <Link to={{}} style={styles.link} onClick={(e) => {
                                e.preventDefault();
                                goBackToDashboard()
                            }}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/booking" style={styles.link}>
                                Bookings
                            </Link>
                        </li>
                        {userType == "ADMIN" && (
                            <li>
                                <Link to="/employees" style={styles.link}>
                                    Employees
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/customers" style={styles.link}>
                                Customers
                            </Link>
                        </li>
                        <li>
                            <Link to="/AddUser" style={styles.link}>
                                Create new user
                            </Link>
                        </li>
                        <li>
                            <Link to="/" style={styles.link} onClick={handleLogout}>
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

const styles = {
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
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        cursor: 'pointer',
    },
};
