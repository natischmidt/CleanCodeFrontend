import Header from "../../reusableComponents/header";
import AdminFooter from "./AdminFooter";
import Dashboard from "../../reusableComponents/dashboard";

export const AdminHome : React.FC = () => {

    const testUserData = {
        firstname: 'Test',
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
            <Dashboard userType="admin" userData={testUserData} />
            <AdminFooter/>
        </>
    )
}
