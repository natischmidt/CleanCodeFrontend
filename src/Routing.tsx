import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginpage";
import BookingPage from "./pages/bookingoverview";
import EmployeePage from "./pages/employeePage";
import CustomerPage from "./pages/customerPage";
import GDPRPage from "./pages/gdpr";
import HomePage from "./pages/home";
import AddUserPage from "./pages/adduser";
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
import CustomerHomePage from "./pages/CustomerPages/CustomerHome";
import EmployeeHomePage from "./pages/EmployeePages/EmployeeHome";
//import OverviewPage from "./pages/overviewpage";
//import TransactionPage from "./pages/transactionoverview";

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/Home" element={<HomePage/>}/>
                    <Route path="/CustomerHome" element={<CustomerHomePage/>}/>
                    <Route path="/EmployeeHome" element={<EmployeeHomePage/>}/>
                    <Route path="/Booking" element={<BookingPage/>}/>
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
                    {/*<Route path="/CancelBooking" element={<CancelBooking/>}/>*/}
                    <Route path="/GettingIdNumber" element={<GettingIdNumber/>}/>
                    <Route path="/CancelWithNumber" element={<CancelWithNumber/>}/>
                    {/* <Route path="/Overview" element={<OverviewPage/>}/>
                    <Route path="/Transaction" element={<TransactionPage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
