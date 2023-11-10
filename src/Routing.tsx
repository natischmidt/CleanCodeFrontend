import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProtectRoutes from './ProtectRoutes';

import BookingPage from "./pages/bookingPage";
import EmployeePage from "./pages/employeePage";
import CustomerPage from "./pages/admin-pages/customerPage";
import {AdminHome} from "./pages/admin-pages/AdminHome";
import AddUserPage from "./pages/admin-pages/adduser";
import AddAdmin from "./components/forms/AddAdminForm";
import AddPrivateCustomer from "./components/forms/AddPrivateCustomerForm";
import AddBusinessCustomer from "./components/forms/AddBusinessCustomerForm";
import AddEmployee from "./components/forms/AddEmployeeForm";
import UpdateBookingForm from "./components/forms/admin-forms/UpdateBookingForm";
import CreateNewBooking from "./components/forms/admin-forms/CreateBookingForm";
import GettingIdNumberForm from "./components/forms/admin-forms/GettingIdNumberForm";
import CancelWithNumberForm from "./components/forms/admin-forms/CancelWithNumberForm";
import {CustomerMyPages} from "./pages/customer-pages/CustomerMyPages"
import {CustomerHomePage} from "./pages/customer-pages/CustomerHome";
import EmployeeHomePage from "./pages/employee-pages/EmployeeHome";
import CustomerBookingPage from "./pages/customer-pages/CustomerBookingPage";
import LoginAdminOrEmployeeForm from "./components/forms/LoginAdminOrEmployeeForm";
import KlarnaConfirmation from "./klarna/KlarnaConfirmation";
import SecurityFrontTestPage from "./security/SecurityFrontTestPage";
import KlarnaModalPayment from "./klarna/KlarnaModalPayment";

function isCustomerAuthenticated() {

    // lägga till kod för avgöra om användaren är autentiserad

    return true; // Byt ut detta med autentiseringslogik
}

function isEmployeeAuthenticated() {

    // lägga till kod för avgöra om employee är autentiserad

    return true; // Byt ut detta med autentiseringslogik
}

function isAdminAuthenticated() {

    // lägga till kod för avgöra om admin är autentiserad

    return true; // Byt ut detta med autentiseringslogik
}

function Routing() {

    const isCusAuth = isCustomerAuthenticated();
    const isEmpAuth = isEmployeeAuthenticated();
    const isAdminAuth = isAdminAuthenticated();

    return (
        <>
            <BrowserRouter>
                <Routes>

                    {/*<ProtectRoutes isAuth={isCusAuth} path="/">*/}
                    {/*    <Route index element={<CustomerHomePage/>} />*/}
                    {/*    <Route path="/CustomerMyPages" element={<CustomerMyPages/>}/>*/}
                    {/*    <Route path="/CustomerBooking" element={<CustomerBookingPage/>}/>*/}
                    {/*</ProtectRoutes>*/}

                    <Route path="/" element={<CustomerHomePage/>}/>
                    <Route path="/CustomerMyPages" element={<CustomerMyPages/>}/>
                    <Route path="/CustomerBooking" element={<CustomerBookingPage/>}/>

                    {/*<ProtectRoutes isAuth={isEmpAuth} path="/Employee">*/}
                    {/*    <Route index element={<LoginAdminOrEmployeeForm/>} />*/}
                    {/*    <Route path="/AdminHome" element={<AdminHome/>}/>*/}
                    {/*    <Route path="/CreateNewBooking" element={<CreateNewBooking/>}/>*/}
                    {/*    <Route path="/Booking" element={<BookingPage/>}/>*/}
                    {/*    <Route path="/Employees" element={<EmployeePage/>}/>*/}
                    {/*    <Route path="/Customers" element={<CustomerPage/>}/>*/}
                    {/*    <Route path="/AddAdmin" element={<AddAdmin/>}/>*/}
                    {/*    <Route path="/AddEmployee" element={<AddEmployee/>}/>*/}
                    {/*</ProtectRoutes>*/}

                    <Route path="/Employee" element={<LoginAdminOrEmployeeForm/>} />
                    <Route path="/AdminHome" element={<AdminHome/>}/>
                    <Route path="/EmployeeHome" element={<EmployeeHomePage/>}/>
                    <Route path="/CreateNewBooking" element={<CreateNewBooking/>}/>
                    <Route path="/Booking" element={<BookingPage/>}/>
                    <Route path="/Employees" element={<EmployeePage/>}/>
                    <Route path="/Customers" element={<CustomerPage/>}/>

                    {/*<ProtectRoutes isAuth={isAdminAuth} path="/Employee">*/}
                    {/*    <Route index element={<LoginAdminOrEmployeeForm/>} />*/}
                    {/*    <Route path="/EmployeeHome" element={<EmployeeHomePage/>}/>*/}
                    {/*    <Route path="/CreateNewBooking" element={<CreateNewBooking/>}/>*/}
                    {/*    /!*<Route path="/Booking" element={<BookingPage/>}/>*!/*/}
                    {/*    <Route path="/Employees" element={<EmployeePage/>}/>*/}
                    {/*    <Route path="/Customers" element={<CustomerPage/>}/>*/}
                    {/*</ProtectRoutes>*/}

                    <Route path="/KlarnaConfirmation/:jobId" element={<KlarnaConfirmation/>}/>
                    <Route path="/KlarnaPay/:jobId" element={<KlarnaModalPayment />} />

                    <Route path="/AddUser" element={<AddUserPage/>}/>
                    <Route path="/AddAdmin" element={<AddAdmin/>}/>
                    <Route path="/AddEmployee" element={<AddEmployee/>}/>
                    <Route path="/AddPrivateCustomer" element={<AddPrivateCustomer/>}/>
                    <Route path="/AddBusinessCustomer" element={<AddBusinessCustomer/>}/>
                    <Route path="/UpdateBookingForm" element={<UpdateBookingForm/>}/>
                    <Route path="/GettingIdNumberForm" element={<GettingIdNumberForm/>}/>
                    <Route path="/CancelWithNumberForm" element={<CancelWithNumberForm/>}/>

                    <Route path="/sec" element={<SecurityFrontTestPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
