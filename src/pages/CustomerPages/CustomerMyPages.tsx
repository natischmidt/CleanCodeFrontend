import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import Dashboard from "../../reusableComponents/dashboard";
import {customerStyles} from "../../styles/styles";
import React, {useEffect, useState} from "react";
import {useUserType} from "../../components/UserTypeContext";
import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import {DashboardUserData} from "../../reusableComponents/DashboardUserData";
import axios from "axios";

export const CustomerMyPages: React.FC = () => {
    const { userType, id } = useUserType();
    const [loggedIn, setLoggedIn] = useState(true);
    const [userData, setUserData] = useState<DashboardUserData>({
        firstname: "", lastname: "", email: "", password: "", address: "", SSnumber: "", phoneNumber: "",});


    const selectedStyles =
        userType === "Customer" ? customerStyles : {};

    useEffect(() => {
        if (userType === "Customer" && id) {
            fetchCustomerData(id)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error("Error fetching customer data: ", error);
                });
        }
    }, [id, userType]);

    const fetchCustomerData = async (customerId: string): Promise<DashboardUserData> => {
        try {
            const response = await axios.get(`http://localhost:8080/api/customer/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customer ${error}`);
        }
    };

    return (
        <>
            <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div style={{ ...selectedStyles }}>
                <Dashboard userType="customer" userData={userData} />
            </div>
            <CustomerFooter />
        </>
    );
};
