import Header from "../../reusableComponents/header";
import Footer from "../../reusableComponents/footer";
import Dashboard from "../../reusableComponents/dashboard";
import {customerStyles} from "../../styles/styles";
import React from "react";
import {useUserType} from "../../components/UserTypeContext";


export const CustomerHomePage: React.FC = () => {
    const { userType } = useUserType();
    const selectedStyles =
        userType === "Customer" ? customerStyles : {};


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

            <Header />
            <div style={{ ...selectedStyles }}>
                CUSTOMER PAGE
                <Dashboard userType="customer" userData={testUserData} />
            </div>
            <Footer />
        </>
    );
};
