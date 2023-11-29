import CustomerHeader from "../../components/layout/CustomerHeader";
import CustomerFooter from "../../components/layout/CustomerFooter";
import AddCustomerBookingOption from "../../components/customer-components/AddCustomerBookingOption";
import React, {useState} from "react";

export default function CustomerBookingPage() {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <div
            className="containerDiv"
            style={styles.container}>
            <div
                className="headerDiv"
                style={styles.header}>
                <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </div>
            <div
                className="middleDiv"
                style={styles.middle}>
                <AddCustomerBookingOption />
            </div>
            <div
                className="footerDiv"
                style={styles.footer}>
                <CustomerFooter />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex" as "flex",
        flexDirection: "column" as "column",
        height: "100vh", // 100% of the viewport height
    },
    header: {
        flex: "12%", // Takes 20% of the container's height
        backgroundColor: "#e0e0e0", // Add background color for clarity
    },
    middle: {
        flex: "76%", // Takes 60% of the container's height
        backgroundColor: "#f0f0f0", // Add background color for clarity
        overflowY: "auto" as "auto",
    },
    footer: {
        flex: "8.9%", // Takes 20% of the container's height
        backgroundColor: "#e0e0e0", // Add background color for clarity
    },
};


