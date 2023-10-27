import CustomerFooter from "../../components/layout/CustomerFooter";
import Dashboard from "../../components/dashboard/Dashboard";
import {customerStyles} from "../../styles/styles";
import React, {useEffect, useState} from "react";
import {useUserType} from "../../components/context/UserTypeContext";
import CustomerHeader from "../../components/layout/CustomerHeader";
import {DashboardUserData} from "../../components/dashboard/DashboardUserData";
import customer from "../../API/customer";

export const CustomerMyPages: React.FC = () => {
    const {userType, id } = useUserType();
    const [loggedIn, setLoggedIn] = useState(true);
    const [userData, setUserData] = useState<DashboardUserData>({
        firstname: "", lastname: "", email: "", password: "", address: "", postalCode:"", city:"",
        SSnumber: "", phoneNumber: "",});

    const selectedStyles = userType === "Customer" ? customerStyles : {};

    useEffect(() => {
        if (userType === "Customer" && id) {
            customer.fetchData(id)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error("Error fetching customer data: ", error);
                });
        }
    }, [id, userType]);

    return (
        <>
            <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div style={{ ...selectedStyles }}>
                <Dashboard userType="customer" userData={userData}/>
            </div>
            <CustomerFooter />
        </>
    );
};
