import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import AddCustomerBookingOption from "../../components/CustomerComponents/addCustomerBookingOption";
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
