import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import {customerStyles} from "../../styles/styles";
import React from "react";
import {useUserType} from "../../components/UserTypeContext";
import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import image from '/src/assets/customer-homepage-picture.png';
import { CSSProperties } from 'react';
import {BookingComponent} from "../../components/CustomerComponents/BookingComponent";


const styles: {
    container: CSSProperties;
    halfContainer: CSSProperties;
    imageSection: CSSProperties;
    bookingSection: CSSProperties;
    whiteSection: CSSProperties;
    textContainer: CSSProperties;
    headerText: CSSProperties;
    subText: CSSProperties;
} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : "5%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    halfContainer: {
        width: '100%',
        display: 'flex',
        height: '50vh',
    },
    imageSection: {
        flex: 1,
        backgroundImage: `url(${image})`,
        backgroundSize: '676px 738px',
        backgroundPosition: 'center',
        margin: '0 2px',
    },
    whiteSection: {
        flex: 1,
        background: 'white',
    },
    textContainer: {
        marginTop :'100px',
        textAlign: 'center',
        color : 'black',

    },
    headerText: {
        fontSize: '50px',
        fontWeight: 'bold',
        margin: '0',
    },
    subText: {
        fontSize: '25px',
    },
    bookingSection: {
    },
};

export const CustomerHomePage: React.FC = () => {
    const { userType ,id} = useUserType();
    const selectedStyles =
        userType === "Customer" ? customerStyles : {};

    console.log(id + "check check 1-2-1-2-1, yeeeeabuddy")

    return (
        <>
            <CustomerHeader showLoggedIn={false}/>
            <div style={{ ...selectedStyles }}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div style={styles.whiteSection}>
                            <div style={styles.textContainer}>
                                <h1 style={styles.headerText}>Städafint AB magiskt rent</h1>
                                <p style={styles.subText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div style={styles.imageSection}></div>
                    </div>
                    <div style={styles.bookingSection}>
                        <BookingComponent />
                    </div>
                </div>
            </div>

            <CustomerFooter />
        </>
    );
};