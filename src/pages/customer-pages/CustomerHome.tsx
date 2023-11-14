import {customerStyles} from "../../styles/styles";
import React, {useState} from "react";
import image from '/src/assets/water.png';
import {CSSProperties} from 'react';
import CustomerFooter from "../../components/layout/CustomerFooter";
import {useUserType} from "../../components/context/UserTypeContext";
import CustomerHeader from "../../components/layout/CustomerHeader";
import {BookingComponent} from "../../components/customer-components/BookingComponent";
import '../../styles/CustomerHome.css'

const styles: {
    container: {
        boxShadow: string;
        alignItems: string;
        flexDirection: string;
        display: string;
        justifyContent: string;
        marginTop: string
    };
    bookingSection: {
        alignItems: string;
        flexDirection: string;
        display: string;
        width: string;
        justifyContent: string
    };
    halfContainer: { display: string; width: string; height: string };
    imageSection: { boxShadow: string; margin: string; flex: number; backgroundRepeat: string };
    textContainer: {
        boxShadow: string;
        backgroundColor: string;
        borderRadius: string;
        color: string;
        textAlign: string;
        flex: number;
        marginTop: string
    }
} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "0%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
    halfContainer: {
        width: '100%',
        display: 'flex',
        height: '75.8vh',
    },
    imageSection: {
        flex: 1,
        margin: '0 2px',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    textContainer: {
        borderRadius: "2rem",
        marginTop: '40px',
        textAlign: 'center',
        color: 'black',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',

        backgroundColor: "rgba(230,250,250,0.75)",
        flex: 1, // Allow textContainer to expand, pushing bookingSection to the bottom
    },

    bookingSection: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
};

export const CustomerHomePage: React.FC = () => {
    const [, setLoggedIn] = useState(true);
    const {userType, id} = useUserType();
    const selectedStyles =
        userType === "CUSTOMER" ? customerStyles : {};

    return (
        <>
            <CustomerHeader setLoggedIn={setLoggedIn} showLoggedIn/>
            <div style={{...selectedStyles}}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div className="whiteSection">
                            <div style={styles.textContainer}>
                                <h2 className="header-text">Welcome to Städafint AB <br/>
                                </h2><h2 className="subHeaderText"> Where cleanliness meets
                                    quality and sustainability.</h2>
                                <p className="subText"><br/>Since our founding nearly a century and a half ago, we
                                    have been a reliable partner in cleaning services. We stand for tradition,
                                    experience, and quality, values that have served us and our customers well over
                                    time. We are not just a cleaning company; we are a part of the
                                    communities we serve.</p>
                                <p className="subText"><br/>Learn more →</p>
                                <BookingComponent/>
                            </div>
                            <div style={styles.bookingSection}>
                                <div><p></p></div>
                            </div>
                        </div>
                        {/*<div style={styles.imageSection}></div>*/}
                    </div>
                </div>
            </div>
            <CustomerFooter/>
        </>
    );
};
