import HeaderComp from "../components/layout/HeaderComp";
import AddBookingOption from "../components/admin-components/AddBookingOption";
import CustomerFooter from "../components/layout/CustomerFooter";
import {useState} from "react";
import EditBookingForm from "../components/forms/EditBookingForm";
import BookingTable from "../components/tables/BookingTable";
import CreateKlarnaPayment from "../klarna/CreateKlarnaPayment";

export default function BookingPage() {

    const [showUpdateBooking, setShowUpdateBooking] = useState(false)
    const [showKlarna, setShowKlarna] = useState(false)
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

    const handleUpdate = (jobId: number) =>{
        setSelectedBookingId(jobId);
        setShowUpdateBooking(true);
    }

    const handleKlarna = (jobId: number) =>{
        setSelectedBookingId(jobId);
        setShowKlarna(true);
    }

    const handleUpdateComplete = () => {
        setShowUpdateBooking(false)
    }
    const handleKlarnaComplete = () => {
        setShowKlarna(false)
    }

    return (
        <>
            <HeaderComp/>
            {!showUpdateBooking && !showKlarna?<div className="bookingCont">
                    <AddBookingOption/> <BookingTable onUpdate={(jobId : number) => handleUpdate(jobId)}  />
            </div>  :
             <> </>
                // <EditBookingForm jobId={selectedBookingId} doneWithEdit={handleUpdateComplete} />
            }
            {showUpdateBooking && !showKlarna ?
                <EditBookingForm jobId={selectedBookingId} doneWithEdit={handleUpdateComplete} /> : <></> }
            {!showUpdateBooking && showKlarna ?
                <CreateKlarnaPayment jobId={selectedBookingId} doneWithEdit={handleKlarnaComplete}/> : <></>}
        </>
    )
}
