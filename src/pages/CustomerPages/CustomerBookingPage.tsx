import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import AddCustomerBookingOption from "../../components/CustomerComponents/addCustomerBookingOption";
export default function CustomerBookingPage() {

    return (
        <>
            <CustomerHeader showLoggedIn={true}/>
            <div className="bookingCont">
                <AddCustomerBookingOption/>
            </div>
            <CustomerFooter/>
        </>
    )
}
