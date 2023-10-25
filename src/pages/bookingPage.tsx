import Header from "../reusableComponents/header";
import AddBookingOption from "../components/addBookingOption";
import CustomerFooter from "../components/CustomerComponents/CustomerFooter";
import {useState} from "react";
import EditBookingForm from "../forms/editBooking";
import BookingTable from "../components/tabels/BookingTable";
import CreateKlarnaPayment from "../klarna/CreateKlarnaPayment";

export default function BookingPage() {

    const [showUpdateBooking, setShowUpdateBooking] = useState(false)
    const [showKlarna, setShowKlarna] = useState(false)
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

    const handleUpdate = (jobId: number) =>{
        console.log("jobId inside myOnUpdateFunction:", jobId);
        setSelectedBookingId(jobId);
        setShowUpdateBooking(true);
    }

    const handleKlarna = (jobId: number) =>{
        console.log("KLARNA:", jobId);
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
            <Header/>
            {!showUpdateBooking && !showKlarna?<div className="bookingCont">
                    <AddBookingOption/> <BookingTable onUpdate={(jobId : number) => handleUpdate(jobId)} onKlarna={(jobId : number) => handleKlarna(jobId)} />
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