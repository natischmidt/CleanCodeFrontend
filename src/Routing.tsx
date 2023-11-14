import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProtectRoutes from './ProtectRoutes';

import BookingPage from "./pages/BookingPage";
import EmployeePage from "./pages/EmployeePage";
import CustomerPage from "./pages/admin-pages/CustomerPage";
import {AdminHome} from "./pages/admin-pages/AdminHome";
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
import KlarnaModalPayment from "./klarna/KlarnaModalPayment";
import AddUserOption from "./components/admin-components/AddUserOption";

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
                    {/*    <Route path="/customermypages" element={<CustomerMyPages/>}/>*/}
                    {/*    <Route path="/customerbooking" element={<CustomerBookingPage/>}/>*/}
                    {/*</ProtectRoutes>*/}

                    <Route path="/" element={<CustomerHomePage/>}/>
                    <Route path="/customermypages" element={<CustomerMyPages/>}/>
                    <Route path="/customerbooking" element={<CustomerBookingPage/>}/>

                    {/*<ProtectRoutes isAuth={isEmpAuth} path="/employee">*/}
                    {/*    <Route index element={<LoginAdminOrEmployeeForm/>} />*/}
                    {/*    <Route path="/adminhome" element={<AdminHome/>}/>*/}
                    {/*    <Route path="/createnewbooking" element={<CreateNewBooking/>}/>*/}
                    {/*    <Route path="/booking" element={<BookingPage/>}/>*/}
                    {/*    <Route path="/employees" element={<EmployeePage/>}/>*/}
                    {/*    <Route path="/customers" element={<CustomerPage/>}/>*/}
                    {/*    <Route path="/addadmin" element={<AddAdmin/>}/>*/}
                    {/*    <Route path="/addemployee" element={<AddEmployee/>}/>*/}
                    {/*</ProtectRoutes>*/}

                    <Route path="/employee" element={<LoginAdminOrEmployeeForm/>} />
                    <Route path="/adminhome" element={<AdminHome/>}/>
                    <Route path="/employeehome" element={<EmployeeHomePage/>}/>
                    <Route path="/createnewbooking" element={<CreateNewBooking/>}/>
                    <Route path="/booking" element={<BookingPage/>}/>
                    <Route path="/employees" element={<EmployeePage/>}/>
                    <Route path="/customers" element={<CustomerPage/>}/>

                    {/*<ProtectRoutes isAuth={isAdminAuth} path="/employee">*/}
                    {/*    <Route index element={<LoginAdminOrEmployeeForm/>} />*/}
                    {/*    <Route path="/employeehome" element={<EmployeeHomePage/>}/>*/}
                    {/*    <Route path="/createnewbooking" element={<CreateNewBooking/>}/>*/}
                    {/*    /!*<Route path="/booking" element={<BookingPage/>}/>*!/*/}
                    {/*    <Route path="/employees" element={<EmployeePage/>}/>*/}
                    {/*    <Route path="/customers" element={<CustomerPage/>}/>*/}
                    {/*</ProtectRoutes>*/}

                    <Route path="/klarnaconfirmation/:jobId" element={<KlarnaConfirmation/>}/>
                    <Route path="/klarnapay/:jobId" element={<KlarnaModalPayment />} />

                    <Route path="/adduser" element={<AddUserOption/>}/>
                    <Route path="/addadmin" element={<AddAdmin/>}/>
                    <Route path="/addemployee" element={<AddEmployee/>}/>
                    <Route path="/addprivatecustomer" element={<AddPrivateCustomer/>}/>
                    <Route path="/addbusinesscustomer" element={<AddBusinessCustomer/>}/>
                    <Route path="/updatebookingform" element={<UpdateBookingForm/>}/>
                    <Route path="/gettingidnumberform" element={<GettingIdNumberForm/>}/>
                    <Route path="/cancelwithnumberform" element={<CancelWithNumberForm/>}/>


                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
