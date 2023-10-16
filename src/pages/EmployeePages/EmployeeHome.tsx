import Header from "../../reusableComponents/header";
import EmployeeFooter from "./EmployeeFooter";
import {employeeStyles} from "../../styles/styles";
import React from "react";
import {useUserType} from "../../components/UserTypeContext";

export default function EmployeeHomePage() {

    const { userType,id  } = useUserType();

    const selectedStyles =
        userType === "Employee" ? employeeStyles : {};
    console.log("jajaja, test4future : _ : " +  id)
    return (
        <>

            <Header/>
            <div style={{ ...selectedStyles }}>
            {/*<Dashboard userType="employee" userData={ } />*/}
            </div>
        </>
    )
}
