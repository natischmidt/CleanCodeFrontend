import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import {customerStyles} from "../../styles/styles";
import React, {useState} from "react";
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
        backgroundSize: '976px 938px',
        backgroundPosition: 'center',
        margin: '0 2px',
        backgroundRepeat: 'no-repeat',
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
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0',
    },
    subText: {
        fontSize: '1rem',
        padding: "5px 20px",
        margin: "0"
    },
    bookingSection: {
    },
};

export const CustomerHomePage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const { userType ,id} = useUserType();
    const selectedStyles =
        userType === "Customer" ? customerStyles : {};

    console.log(id + "check check 1-2-1-2-1, yeeeeabuddy")

    return (
        <>
            <CustomerHeader setLoggedIn={setLoggedIn} showLoggedIn/>
            <div style={{ ...selectedStyles }}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div style={styles.whiteSection}>
                            <div style={styles.textContainer}>
                                <h2 style={styles.headerText}>Welcome to Städafint AB <br /> - Where cleanliness meets quality and sustainability.</h2>
                                <p style={styles.subText}><br />Since our founding nearly a century and a half ago, we have been a reliable partner in cleaning services. We stand for tradition, experience, and quality, values that have served us and our customers well over time.</p>
                                <p style={styles.subText}><br />We are not just a cleaning company; we are a part of the communities we serve. With a dedicated workforce whose expertise spans several decades, we provide not only cleaning services but also security and quality of life. Our team consists of passionate, experienced, and dedicated employees who are masters in their field.</p>
                                <p style={styles.subText}><br />Sustainability is not just a buzzword for us; it is part of our business philosophy. We use eco-friendly cleaning products and continuously work to minimize our ecological footprint. This also means we have efficient work processes that not only save time but also resources.</p>
                                {/*<p style={styles.subText}><br />Our strength lies in our ability to understand our customers' unique needs and offer tailored solutions. We believe that every space, big or small, deserves the best possible care. Whether it's an office, a home, or a commercial space, you can trust Städafint AB to do the job with the utmost care and professionalism.</p>*/}
                                {/*<p style={styles.subText}><br />Thank you for considering Städafint AB as your partner in cleanliness and sustainability. We look forward to being a part of your everyday life and continuing to set the standard for excellent and sustainable cleaning for generations to come.</p>*/}

                            </div>
                        </div>
                        <div style={styles.imageSection}></div>
                    </div>
                    <div><p></p></div>
                    <div style={styles.bookingSection}>
                        <BookingComponent />
                    </div>
                </div>
            </div>

            <CustomerFooter />
        </>
    );
};
