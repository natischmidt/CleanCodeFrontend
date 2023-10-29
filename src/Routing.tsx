import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/admin-pages/loginpage";
import BookingPage from "./pages/bookingPage";
import EmployeePage from "./pages/employeePage";
import CustomerPage from "./pages/admin-pages/customerPage";
import GDPRPage from "./pages/admin-pages/gdpr";
import {AdminHome} from "./pages/admin-pages/AdminHome";
import AddUserPage from "./pages/admin-pages/adduser";
import AddAdmin from "./components/forms/AddAdminForm";
import AddPrivateCustomer from "./components/forms/AddPrivateCustomerForm";
import AddBusinessCustomer from "./components/forms/AddBusinessCustomerForm";
import AddEmployee from "./components/forms/AddEmployeeForm";
import UpdateBookingForm from "./components/forms/admin-forms/UpdateBookingForm";
// import CancelBooking from "./admin-forms/cancelBooking";
import CreateNewBooking from "./components/forms/admin-forms/CreateBookingForm";
import GettingIdNumberForm from "./components/forms/admin-forms/GettingIdNumberForm";
import CancelWithNumberForm from "./components/forms/admin-forms/CancelWithNumberForm";
import EditEmployeeForm from "./components/forms/EditEmployeeForm";
import {CustomerMyPages} from "./pages/customer-pages/CustomerMyPages"
import {CustomerHomePage} from "./pages/customer-pages/CustomerHome";
import EmployeeHomePage from "./pages/employee-pages/EmployeeHome";
import CustomerBookingPage from "./pages/customer-pages/CustomerBookingPage";
import LoginAdminOrEmployeeForm from "./components/forms/LoginAdminOrEmployeeForm";
import KlarnaConfirmation from "./klarna/KlarnaConfirmation";
import TestParentKlarnaComp from "./klarna/TestParentKlarnaComp";
import SecurityFrontTestPage from "./security/SecurityFrontTestPage";
import BasicCleanPayment from "./klarna/BasicCleanPayment";
import WindowCleanPayment from "./klarna/WindowCleanPayment";
import AdvancedCleanPayment from "./klarna/AdvancedCleanPayment";
//import OverviewPage from "./pages/overviewpage";
//import TransactionPage from "./pages/transactionoverview";

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginAdminOrEmployeeForm/>} />
                    <Route path="/AdminHome" element={<AdminHome/>}/>
                    <Route path="/CustomerHome" element={<CustomerHomePage/>}/>
                    <Route path="/CustomerMyPages" element={<CustomerMyPages/>}/>
                    <Route path="/CustomerBooking" element={<CustomerBookingPage/>}/>
                    <Route path="/EmployeeHome" element={<EmployeeHomePage/>}/>
                    <Route path="/Booking" element={<BookingPage/>}/>
                    <Route path="/KlarnaConfirmation" element={<KlarnaConfirmation/>}/>
                    <Route path="/klarnatest" element={<TestParentKlarnaComp/>}/>
                    <Route path="/Employees" element={<EmployeePage/>}/>
                    <Route path="/Customers" element={<CustomerPage/>}/>
                    <Route path="/GDPR" element={<GDPRPage/>}/>
                    <Route path="/AddUser" element={<AddUserPage/>}/>
                    <Route path="/AddAdmin" element={<AddAdmin/>}/>
                    <Route path="/AddEmployee" element={<AddEmployee/>}/>
                    <Route path="/AddPrivateCustomer" element={<AddPrivateCustomer/>}/>
                    <Route path="/AddBusinessCustomer" element={<AddBusinessCustomer/>}/>
                    <Route path="/CreateNewBooking" element={<CreateNewBooking/>}/>
                    <Route path="/UpdateBookingForm" element={<UpdateBookingForm/>}/>

                    <Route path="/PayForBasic" element={<BasicCleanPayment />}/>
                    <Route path="/PayForAdvanced" element={<AdvancedCleanPayment/>}/>
                    <Route path="/PayForWindow" element={<WindowCleanPayment />}/>
                    {/*<Route path="/CancelBooking" element={<CancelBooking/>}/>*/}
                    <Route path="/GettingIdNumberForm" element={<GettingIdNumberForm/>}/>
                    <Route path="/CancelWithNumberForm" element={<CancelWithNumberForm/>}/>
                    <Route path="/sec" element={<SecurityFrontTestPage/>}/>
                    {/* <Route path="/Overview" element={<OverviewPage/>}/>
                    <Route path="/Transaction" element={<TransactionPage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
