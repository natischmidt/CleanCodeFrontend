import {customerStyles} from "../../styles/styles";
import React, {useState} from "react";
// import image from '/src/assets/water.png';
import CustomerFooter from "../../components/layout/CustomerFooter";
import {useUserType} from "../../components/context/UserTypeContext";
import CustomerHeader from "../../components/layout/CustomerHeader";
import {BookingComponent} from "../../components/customer-components/BookingComponent";
import '../../styles/CustomerHome.css'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as "column",
        alignItems: 'center' as "center",
        justifyContent: 'center' as "center",
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
        marginTop: '0rem',
        textAlign: 'center' as "center",
        color: 'black',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',

        backgroundColor: "rgba(230,250,250,0.75)",
        flex: 1,
    },
    bookingSection: {
        width: '100%',
        display: 'flex',
        alignItems: 'center' as "center",
        justifyContent: 'center' as "center",
        flexDirection: 'column' as "column",
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
                    </div>
                </div>
            </div>
            <CustomerFooter/>
        </>
    );
};
