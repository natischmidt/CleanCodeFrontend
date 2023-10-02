import Header from "../reusableComponents/header";
import React from "react";
import {EmployeeTable} from "../components/EmployeeTable";
import Footer from "../reusableComponents/footer";

export default function EmployeePage() {
    return (
        <>
            <Header/>
            <h2>Employee Table</h2>
            <EmployeeTable />
            <Footer/>
        </>
    )
}