import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import {customerStyles} from "../../styles/styles";
import React from "react";
import {useUserType} from "../../components/UserTypeContext";
import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import image from "../assets/customer-homepage-picture.png";

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    halfContainer: {
        width: '100%',
        display: 'flex',
        height: '50vh',
    },
    imageSection: {
        flex: 1,
        background: `url(${image})`,
        backgroundSize: 'cover',
    },
    bookingSection: {
        flex: 1,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const CustomerHomePage: React.FC = () => {
    const { userType } = useUserType();
    const selectedStyles =
        userType === "Customer" ? customerStyles : {};

    return (
        <>
            <CustomerHeader />
            <div style={{ ...selectedStyles }}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div style={styles.imageSection}></div>
                        <div style={styles.bookingSection}>
                            <BookingComponent />
                        </div>
                    </div>
                </div>
            </div>
            <CustomerFooter />
        </>
    );
};