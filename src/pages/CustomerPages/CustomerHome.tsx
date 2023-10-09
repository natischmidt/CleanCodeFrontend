import Header from "../../reusableComponents/header";
import Footer from "../../reusableComponents/footer";
import Dashboard from "../../reusableComponents/dashboard";
import React from "react";


export const  CustomerHomePage : React.FC = () => {

    const testUserData = {
        firstname: 'Testkund',
        lastname: 'Test',
        email: 'test@example.com',
        password: 'test',
        address: '123 Test',
        SSnumber: '123456789',
        phoneNumber: '555-555-5555',
    };
    return (
        <>
            <Header/>
            CUSTOMER PAGE
            <Dashboard userType="customer" userData={ testUserData} />
            <Footer/>
        </>
    )
}
