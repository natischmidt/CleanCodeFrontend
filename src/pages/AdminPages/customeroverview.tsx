import React from "react";
import Header from "../../reusableComponents/header";
import {CustomerTable} from "../../components/CustomerTable";
import Footer from "../../reusableComponents/footer";

export default function CustomerPage() {
    return (
        <>
            <Header/>
            <h2>Customer Table</h2>
            <CustomerTable />
            <Footer/>
        </>
    )
}