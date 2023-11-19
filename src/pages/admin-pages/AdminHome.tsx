import HeaderComp from "../../components/layout/HeaderComp";
import Dashboard from "../../components/dashboard/Dashboard";
import React from "react";
import {useUserType} from "../../components/context/UserTypeContext";
import { adminStyles } from "../../styles/styles";


export const AdminHome : React.FC = () => {
    const { userType} = useUserType();

    const selectedStyles =
        userType === "ADMIN" ? adminStyles : {};

    const testUserData = {
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@example.com',
        password: 'test',
        address: '123 Test',
        postalCode: '12456',
        city: 'Linkoping',
        SSnumber: '123456789',
        phoneNumber: '555-555-5555',
    };
    return (
        <>
            <HeaderComp/>
            <div style={{ ...selectedStyles }}>
            <Dashboard userType="admin" userData={testUserData} />
            </div>
        </>
    )
}
