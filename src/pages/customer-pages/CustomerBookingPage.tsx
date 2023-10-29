import CustomerHeader from "../../components/layout/CustomerHeader";
import CustomerFooter from "../../components/layout/CustomerFooter";
import AddCustomerBookingOption from "../../components/customer-components/AddCustomerBookingOption";
import React, {useState} from "react";


export default function CustomerBookingPage() {
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <>
            <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className="bookingCont">
                <AddCustomerBookingOption/>
            </div>
            <CustomerFooter/>
        </>
    )
}
