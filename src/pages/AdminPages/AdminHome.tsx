import Header from "../../reusableComponents/header";
import AdminFooter from "./AdminFooter";
import Dashboard from "../../reusableComponents/dashboard";
import React, {useState} from "react";
import {adminStyles, customerStyles, employeeStyles} from "../../styles/styles";

export const AdminHome : React.FC = () => {
    const [userType, setUserType] = useState("admin");



    const testUserData = {
        firstname: 'Test',
        lastname: 'Test',
        email: 'test@example.com',
        password: 'test',
        address: '123 Test',
        SSnumber: '123456789',
        phoneNumber: '555-555-5555',
    };

    let pageStyles: React.CSSProperties;

    //this can be replaced with a context to check the usertype instead
    if (userType === "admin") {
        pageStyles = adminStyles;
    } else if (userType === "user") {
        pageStyles = employeeStyles;
    } else {
        pageStyles = customerStyles;
    }

    return (
        <>
            <div className="custom-style-admin" style={pageStyles}>
            <Header/>
            <Dashboard userType="admin" userData={testUserData} />
            <AdminFooter/>
                </div>
        </>
    )
}
