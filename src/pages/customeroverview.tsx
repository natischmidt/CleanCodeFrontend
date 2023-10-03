import React from "react";
import Header from "../reusableComponents/header";
// import Footer from "../reusableComponents/footer";
import {CustomerTable} from "../components/CustomerTable";

export default function CustomerPage() {
    return (
        <>
            <Header/>
            <h2>Customer Table</h2>
            <CustomerTable />
        </>
    )
}