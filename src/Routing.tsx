import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginpage";
import BookingPage from "./pages/bookingoverview";
import EmployeePage from "./pages/employeeoverview";
import CustomerPage from "./pages/customeroverview";
import GDPRPage from "./pages/gdpr";
import HomePage from "./pages/home";
import AddUserPage from "./pages/adduser";
//import OverviewPage from "./pages/overviewpage";
//import TransactionPage from "./pages/transactionoverview";

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/Home" element={<HomePage/>}/>
                    <Route path="/Booking" element={<BookingPage/>}/>
                    <Route path="/Employees" element={<EmployeePage/>}/>
                    <Route path="/Customers" element={<CustomerPage/>}/>
                    <Route path="/GDPR" element={<GDPRPage/>}/>
                    <Route path="/AddUser" element={<AddUserPage/>}/>
                    {/* <Route path="/Overview" element={<OverviewPage/>}/>
                    <Route path="/Transaction" element={<TransactionPage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
