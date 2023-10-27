import Header from "../../components/layout/header";
import Dashboard from "../../components/dashboard/Dashboard";
import React from "react";
import {useUserType} from "../../components/context/UserTypeContext";
import { adminStyles } from "../../styles/styles";

export const AdminHome : React.FC = () => {
    const { userType,id } = useUserType();

    const selectedStyles =
        userType === "Admin" ? adminStyles : {};

    const testUserData = {
        firstname: 'Test',
        lastname: 'Test',
        email: 'test@example.com',
        password: 'test',
        address: '123 Test',
        postalCode: '12456',
        city: 'Linkoping',
        SSnumber: '123456789',
        phoneNumber: '555-555-5555',
    };
    console.log("bara för att : " + id)
    return (
        <>
            <Header/>
            <div style={{ ...selectedStyles }}>
            <Dashboard userType="admin" userData={testUserData} />
            </div>
        </>
    )
}
