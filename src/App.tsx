import './App.css';
import { UserTypeProvider, useUserType } from './components/context/UserTypeContext';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { CustomerHomePage } from './pages/customer-pages/CustomerHome';
import { CustomerMyPages } from './pages/customer-pages/CustomerMyPages';
import CustomerBookingPage from './pages/customer-pages/CustomerBookingPage';
import KlarnaConfirmation from './klarna/KlarnaConfirmation';
import KlarnaModalPayment from './klarna/KlarnaModalPayment';
import LoginAdminOrEmployeeForm from './components/forms/LoginAdminOrEmployeeForm';
import EmployeeHomePage from './pages/employee-pages/EmployeeHome';
import CreateNewBooking from './components/forms/admin-forms/CreateBookingForm';
import BookingPage from './pages/BookingPage';
import CustomerPage from './pages/admin-pages/CustomerPage';
import AddUserOption from './components/admin-components/AddUserOption';
import AddPrivateCustomer from './components/forms/AddPrivateCustomerForm';
import AddBusinessCustomer from './components/forms/AddBusinessCustomerForm';
import { AdminHome } from './pages/admin-pages/AdminHome';
import EmployeePage from './pages/EmployeePage';
import AddAdmin from './components/forms/AddAdminForm';
import AddEmployee from './components/forms/AddEmployeeForm';
import React from 'react';
import image from '/src/assets/water.png';
import Routing from "./Routing";

function App() {
    return (
        <BrowserRouter>
            <UserTypeProvider>
                <div className="container">
                    <Routing />
                </div>
            </UserTypeProvider>
        </BrowserRouter>
    );
}

export default App;

// function Routing() {
//     const { userType } = useUserType();
//
//     const UnauthorizedAccess = () => (
//         <div style={styles.noAccessCont}>
//             <h2>Oops! It seems like you have landed on the wrong page.</h2>
//             <Link to="/">Back to the website!</Link>
//         </div>
//     );
//
//     const getRoutesBasedOnUserType = () => {
//         switch (userType) {
//             case 'ADMIN':
//                 return <AdminRoutes />;
//             case 'EMPLOYEE':
//                 return <EmployeeRoutes />;
//             case 'CUSTOMER':
//                 return <CustomerRoutes />;
//             default:
//                 return (
//                     <Routes>
//                         <Route path="/" element={<CustomerHomePage />}/>
//                         <Route path="/employee" element={<LoginAdminOrEmployeeForm />}/>
//                         <Route path="*" element={<UnauthorizedAccess />} />
//                         <Route path="/klarnaconfirmation/:jobId" element={<KlarnaConfirmation />} />
//                         <Route path="/customerbooking" element={<CustomerBookingPage />} />
//                     </Routes>
//                 );
//         }
//     };
//
//     return <BrowserRouter>{getRoutesBasedOnUserType()}</BrowserRouter>;
// }
//
// const CustomerRoutes = () => (
//     <Routes>
//         <Route path="/" element={<CustomerHomePage />} />
//         <Route path="/customermypages" element={<CustomerMyPages />} />
//         <Route path="/customerbooking" element={<CustomerBookingPage />} />
//
//         <Route path="/klarnapay/:jobId" element={<KlarnaModalPayment />} />
//     </Routes>
// );
//
// const EmployeeRoutes = () => (
//     <Routes>
//         <Route path="/employee" element={<LoginAdminOrEmployeeForm />} />
//         <Route path="/employeehome" element={<EmployeeHomePage />} />
//         <Route path="/createnewbooking" element={<CreateNewBooking />} />
//         <Route path="/booking" element={<BookingPage />} />
//         <Route path="/customers" element={<CustomerPage />} />
//
//         <Route path="/adduser" element={<AddUserOption />} />
//         <Route path="/addprivatecustomer" element={<AddPrivateCustomer />} />
//         <Route path="/addbusinesscustomer" element={<AddBusinessCustomer />} />
//     </Routes>
// );
//
// const AdminRoutes = () => (
//     <Routes>
//         <Route path="/employee" element={<LoginAdminOrEmployeeForm />} />
//         <Route path="/adminhome" element={<AdminHome />} />
//         <Route path="/createnewbooking" element={<CreateNewBooking />} />
//         <Route path="/booking" element={<BookingPage />} />
//         <Route path="/employees" element={<EmployeePage />} />
//         <Route path="/customers" element={<CustomerPage />} />
//
//         <Route path="/adduser" element={<AddUserOption />} />
//         <Route path="/addadmin" element={<AddAdmin />} />
//         <Route path="/addemployee" element={<AddEmployee />} />
//         <Route path="/addprivatecustomer" element={<AddPrivateCustomer />} />
//         <Route path="/addbusinesscustomer" element={<AddBusinessCustomer />} />
//     </Routes>
// );
//
// export default App;
//
// const styles = {
//     noAccessCont: {
//         backgroundImage: `url(${image})`,
//         backgroundSize: 'cover' as "cover",
//         backgroundPosition: 'center' as "center",
//         height: '100vh',
//         textAlign: 'center' as "center",
//         fontSize: "1.3rem",
//         display: 'flex',
//         flexDirection: 'column' as "column",
//         justifyContent: 'center' as "center",
//         alignItems: 'center' as "center",
//     }
// }
