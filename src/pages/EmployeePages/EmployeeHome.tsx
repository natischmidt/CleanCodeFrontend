import Header from "../../reusableComponents/header";
import EmployeeFooter from "./EmployeeFooter";
import {adminStyles, customerStyles, employeeStyles} from "../../styles/styles";
import React, {useState} from "react";




export default function EmployeeHomePage() {
    const [userType, setUserType] = useState("employee");

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
            <div className="custom-style-emp" style={pageStyles}>
            <Header/>
            {/*<Dashboard userType="employee" userData={ } />*/}
            <EmployeeFooter/>
            </div>
        </>
    )
}
