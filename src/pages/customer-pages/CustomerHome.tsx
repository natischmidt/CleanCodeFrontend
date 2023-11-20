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
        backgroundColor: "#fefefe"
    },
    imageSection: {
        flex: 1,
        margin: '0 2px',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    textContainer: {
        borderRadius: "2rem",
        marginTop: '1rem',
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
                                <p className="subText"><br/>Since our foundation nearly a century and a half ago, we have
                                    been a reliable partner in cleaning services. We stand for tradition, experience, and
                                    quality, values that have served us and our customers well through the ages.</p>
                              {/*  <p className="subText"><br/>We are not just a cleaning company; we are part of the communities
                                    we serve. With a dedicated workforce, whose expertise spans several decades, we deliver not
                                    just cleaning services, we deliver safety and quality of life. Our team consists of passionate,
                                    experienced, and committed employees who are masters in their field.
                                </p>*/}
                            {/*    <p className="subText"><br/>Sustainability is not just a buzzword for us; it is part of
                                    our business philosophy. We use environmentally friendly cleaning products and are
                                    constantly working to minimize our ecological footprint. This also means that we have
                                    efficient work processes that not only save time but also resources.
                                </p>
                                <p className="subText"><br/>Our strength lies in our ability to understand our customers'
                                    unique needs and offer tailor-made solutions. We believe that every space, small or large,
                                    deserves the best possible care. Whether it's an office, a home, or a commercial space, you can
                                    trust that StädaAB will do the job with the utmost care and professionalism.
                                </p>*/}
                               {/* <p className="subText"><br/>Thank you for considering StädaAB as your partner in cleanliness
                                    and sustainability. We look forward to being a part of your everyday life and continuing to
                                    set the standard for excellent and sustainable cleaning for generations to come."

                                </p>*/}
                             {/*   <p className="subText"><br/>Learn more →</p>*/}
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
