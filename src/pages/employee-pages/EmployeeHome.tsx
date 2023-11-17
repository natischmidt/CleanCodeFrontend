import HeaderComp from "../../components/layout/HeaderComp";
import {employeeStyles} from "../../styles/styles";
import React, {useEffect, useState} from "react";
import {useUserType} from "../../components/context/UserTypeContext";
import Dashboard from "../../components/dashboard/Dashboard";
import employee from "../../API/employee";

export default function EmployeeHomePage() {

    const {userType, id} = useUserType();
    const selectedStyles = userType === "EMPLOYEE" ? employeeStyles : {};
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")

    const employeeData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: '',
        address: address,
        city: city,
        postalCode: postalCode,
        SSnumber: '',
        phoneNumber: phonenumber,
    };

    useEffect(() => {
     employee.getEmployee(id).then(r => {
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
            <HeaderComp/>
            <div style={{...selectedStyles}}>
                <Dashboard userType="employee" userData={employeeData} />
            </div>
        </>
    )
}





