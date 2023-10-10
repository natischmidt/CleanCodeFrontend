import Header from "../../reusableComponents/header";
import Footer from "../../reusableComponents/footer";
import Dashboard from "../../reusableComponents/dashboard";
import { adminStyles, customerStyles, employeeStyles} from "../../styles/styles";
import React, {useState} from "react";



export const CustomerHomePage: React.FC = () => {
    const [userType, setUserType] = useState("customer");

    const testUserData = {
        firstname: 'Testkund',
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
            <div className="custom-style-customer" style={pageStyles}>
            <Header />
                CUSTOMER PAGE
                <Dashboard userType="customer" userData={testUserData} />
            <Footer />
            </div>
        </>
    );
};
// const customerStyles: React.CSSProperties = {
//     backgroundColor: "#f0f0f0",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
//     textAlign: "center",
// };
