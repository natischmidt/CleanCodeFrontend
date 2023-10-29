import Header from "../../components/layout/header";
import EmployeeFooter from "./EmployeeFooter";
import {employeeStyles} from "../../styles/styles";
import React, {useEffect, useState} from "react";
import {useUserType} from "../../components/context/UserTypeContext";
import Dashboard from "../../components/dashboard/Dashboard";
import axios from "axios";
import cancelWithNumber from "../../components/forms/admin-forms/CancelWithNumberForm";
import employee from "../../API/employee";

export default function EmployeeHomePage() {

    const {userType, id} = useUserType();
    const selectedStyles = userType === "Employee" ? employeeStyles : {};
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")

    const employeeData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: '',
        address: address,
        city: city,
        postalCode: postalCode,
        SSnumber: '',
        phoneNumber: phonenumber,
    };

    console.log("jajaja, test4future : _ : " + id)

    useEffect(() => {
     employee.getEmployee(id).then(r => {
            console.log(r.firstName)
            setFirstname(r.firstName)
            setLastname(r.lastName)
            setEmail(r.email)
            setPhonenumber(r.phoneNumber)
            setAddress(r.address)
            setCity(r.city)
            setPostalCode(r.postalCode)
        })
    }, [])

    return (
        <>

            <Header/>
            <div style={{...selectedStyles}}>

                <Dashboard userType="employee" userData={employeeData} />
            </div>
        </>
    )
}





