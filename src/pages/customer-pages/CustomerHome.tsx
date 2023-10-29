import {customerStyles} from "../../styles/styles";
import React, {useState} from "react";
import image from '/src/assets/customer-homepage-picture.png';
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
        height: '75vh',
    },
    imageSection: {
        flex: 1,
        backgroundImage: `url(${image})`,
        backgroundSize: '976px 938px',
        backgroundPosition: 'center',
        margin: '0 2px',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
    whiteSection: {
        backgroundColor: "#ffffff",
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        justifyContent: 'space-between', // Align content at top and bottom
        flex: 1, // Let the whiteSection take up all available space
    },
    textContainer: {
        marginTop: '40px',
        textAlign: 'center',
        color: 'black',
        flex: 1, // Allow textContainer to expand, pushing bookingSection to the bottom
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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
};

export const CustomerHomePage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const {userType, id} = useUserType();
    const selectedStyles =
        userType === "Customer" ? customerStyles : {};

    console.log(id + "check check 1-2-1-2-1, yeeeeabuddy Light weights!!")

    return (
        <>
            <CustomerHeader setLoggedIn={setLoggedIn} showLoggedIn/>
            <div style={{...selectedStyles}}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div style={styles.whiteSection}>
                            <div style={styles.textContainer}>
                                <h2 style={styles.headerText}>Welcome to Städafint AB <br/> - Where cleanliness meets
                                    quality and sustainability.</h2>
                                <p style={styles.subText}><br/>Since our founding nearly a century and a half ago, we
                                    have been a reliable partner in cleaning services. We stand for tradition,
                                    experience, and quality, values that have served us and our customers well over
                                    time.</p>
                                <p style={styles.subText}><br/>We are not just a cleaning company; we are a part of the
                                    communities we serve. With a dedicated workforce whose expertise spans several
                                    decades, we provide not only cleaning services but also security and quality of
                                    life. Our team consists of passionate, experienced, and dedicated employees who are
                                    masters in their field.</p>
                                <p style={styles.subText}><br/>Sustainability is not just a buzzword for us; it is part
                                    of our business philosophy. We use eco-friendly cleaning products and continuously
                                    work to minimize our ecological footprint. This also means we have efficient work
                                    processes that not only save time but also resources.</p>
                                <p style={styles.subText}><br />Our strength lies in our ability to understand our customers' unique needs and offer tailored solutions. We believe that every space, big or small, deserves the best possible care. Whether it's an office, a home, or a commercial space, you can trust Städafint AB to do the job with the utmost care and professionalism.</p>
                                {/*<p style={styles.subText}><br />Thank you for considering Städafint AB as your partner in cleanliness and sustainability. We look forward to being a part of your everyday life and continuing to set the standard for excellent and sustainable cleaning for generations to come.</p>*/}
                            </div>
                            <div style={styles.bookingSection}>
                                <div><p></p></div>
                                <BookingComponent/>
                            </div>

                        </div>
                        <div style={styles.imageSection}></div>
                    </div>
                </div>
            </div>
            <CustomerFooter/>
        </>
    );
};
