import {customerStyles} from "../../styles/styles";
import React, {useState} from "react";
import image from '/src/assets/water.png';
import {CSSProperties} from 'react';
import CustomerFooter from "../../components/layout/CustomerFooter";
import {useUserType} from "../../components/context/UserTypeContext";
import CustomerHeader from "../../components/layout/CustomerHeader";
import {BookingComponent} from "../../components/customer-components/BookingComponent";


const styles: {
    container: CSSProperties;
    halfContainer: CSSProperties;
    imageSection: CSSProperties;
    bookingSection: CSSProperties;
    whiteSection: CSSProperties;
    textContainer: CSSProperties;
    headerText: CSSProperties;
    subHeaderText: CSSProperties;
    subText: CSSProperties;
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
    whiteSection: {
        backgroundImage: `url(${image})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        // borderRadius: "2rem",
        margin: '0 2px',
        marginBottom: "1rem",
        marginTop: "1rem",
        paddingLeft: "20%",
        paddingRight: "20%",
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Align content at top and bottom
        flex: 1, // Let the whiteSection take up all available space
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
    headerText: {
        fontSize: "3rem",
        fontWeight: 'bold',
        margin: '0',
    },
    subHeaderText: {
        fontSize: "1.5rem",
        fontWeight: 'bold',
        margin: '0',
    },
    subText: {
        fontSize: '1rem',
        padding: "5px 20px",
        margin: "0"
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

    console.log(id + "check check 1-2-1-2-1, yeeeeabuddy Light weights!!")

    return (
        <>
            <CustomerHeader setLoggedIn={setLoggedIn} showLoggedIn/>
            <div style={{...selectedStyles}}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div style={styles.whiteSection}>
                            <div style={styles.textContainer}>
                                <h2 style={styles.headerText}>Welcome to Städafint AB <br/>
                                </h2><h2 style={styles.subHeaderText}> Where cleanliness meets
                                    quality and sustainability.</h2>
                                <p style={styles.subText}><br/>Since our founding nearly a century and a half ago, we
                                    have been a reliable partner in cleaning services. We stand for tradition,
                                    experience, and quality, values that have served us and our customers well over
                                    time. We are not just a cleaning company; we are a part of the
                                    communities we serve.</p>
                                <p style={styles.subText}><br/>Learn more →</p>
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
