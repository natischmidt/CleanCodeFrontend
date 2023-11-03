import CustomerFooter from "../../components/layout/CustomerFooter";
import Dashboard from "../../components/dashboard/Dashboard";
import {customerStyles} from "../../styles/styles";
import React, {useEffect, useState} from "react";
import {useUserType} from "../../components/context/UserTypeContext";
import CustomerHeader from "../../components/layout/CustomerHeader";
import {DashboardUserData} from "../../components/dashboard/DashboardUserData";
import customer from "../../API/customer";
import AddCustomerBookingOption from "../../components/customer-components/AddCustomerBookingOption";

export const CustomerMyPages: React.FC = () => {
    const {userType, id} = useUserType();
    const [loggedIn, setLoggedIn] = useState(true);
    const [userData, setUserData] = useState<DashboardUserData>({
        firstName: "", lastName: "", email: "", password: "", address: "", postalCode: "", city: "",
        SSnumber: "", phoneNumber: "",
    });

    const selectedStyles = userType === "CUSTOMER" ? customerStyles : {};

    useEffect(() => {
        if (userType === "CUSTOMER" && id) {
            customer.fetchData(id)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error("Error fetching customer data: ", error);
                });
        }
    }, [id, userType]);
    //
    // return (
    //     <>
    //         <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    //         <div className="bookingCont" style={{...styles.middleSection, ...selectedStyles}}>
    //             <Dashboard userType="customer" userData={userData}/>
    //         </div>
    //         <div style={styles.footer}>
    //             <CustomerFooter/>
    //         </div>
    //     </>
    // );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </div>
            <div style={styles.middle}>
                <Dashboard userType="customer" userData={userData}/>
            </div>
            <div style={styles.footer}>
                <CustomerFooter/>
            </div>
        </div>
    );

};

const styles = {
    container: {
        display: "flex",
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
