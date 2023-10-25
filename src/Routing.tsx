import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/AdminPages/loginpage";
import BookingPage from "./pages/bookingPage";
import EmployeePage from "./pages/AdminPages/employeePage";
import CustomerPage from "./pages/customerPage";
import GDPRPage from "./pages/AdminPages/gdpr";
import {AdminHome} from "./pages/AdminPages/AdminHome";
import AddUserPage from "./pages//AdminPages/adduser";
import AddAdmin from "./forms/addAdmin";
import AddPrivateCustomer from "./forms/addPrivateCustomer";
import AddBusinessCustomer from "./forms/addBusinessCustomer";
import AddEmployee from "./forms/addEmployee";
import UpdateBooking from "./adminForms/updateBooking";
// import CancelBooking from "./adminForms/cancelBooking";
import CreateNewBooking from "./adminForms/createBooking";
import GettingIdNumber from "./adminForms/gettingIdNumber";
import CancelWithNumber from "./adminForms/cancelWithNumber";
import EditEmployeeForm from "./forms/editEmployee";
import {CustomerMyPages} from "./pages/CustomerPages/CustomerMyPages"
import {CustomerHomePage} from "./pages/CustomerPages/CustomerHome";
import EmployeeHomePage from "./pages/EmployeePages/EmployeeHome";
import CustomerBookingPage from "./pages/CustomerPages/CustomerBookingPage";
import LoginAdminOrEmployeeForm from "./forms/loginAdminOrEmployee";
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
                    <Route path="/UpdateBooking" element={<UpdateBooking/>}/>

                    <Route path="/PayForBasic" element={<BasicCleanPayment />}/>
                    <Route path="/PayForAdvanced" element={<AdvancedCleanPayment/>}/>
                    <Route path="/PayForWindow" element={<WindowCleanPayment />}/>
                    {/*<Route path="/CancelBooking" element={<CancelBooking/>}/>*/}
                    <Route path="/GettingIdNumber" element={<GettingIdNumber/>}/>
                    <Route path="/CancelWithNumber" element={<CancelWithNumber/>}/>
                    <Route path="/sec" element={<SecurityFrontTestPage/>}/>
                    {/* <Route path="/Overview" element={<OverviewPage/>}/>
                    <Route path="/Transaction" element={<TransactionPage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
