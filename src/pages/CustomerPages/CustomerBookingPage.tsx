
import {useState} from "react";
import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import EditBookingForm from "../../forms/editBooking";
import AddCustomerBookingOption from "../../components/CustomerComponents/addCustomerBookingOption";

export default function CustomerBookingPage() {

    const [showUpdateBooking, setShowUpdateBooking] = useState(false)
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

    const handleUpdateComplete = () => {
        setShowUpdateBooking(false)
    }

    return (
        <>
            <CustomerHeader/>
            {!showUpdateBooking ? <div className="bookingCont">
                    <AddCustomerBookingOption/>
                </div> :
                <EditBookingForm jobId={selectedBookingId} doneWithEdit={handleUpdateComplete}/>
            }
            <CustomerFooter/>
        </>
    )
}
