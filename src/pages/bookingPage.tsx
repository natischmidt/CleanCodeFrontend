import Header from "../reusableComponents/header";
import AddBookingOption from "../components/addBookingOption";

import Footer from "../reusableComponents/footer";
import BookingTable2 from "../components/tabels/BookingTable2";
import {useState} from "react";
import EditBookingForm from "../forms/editBooking";


export default function BookingPage() {

    const [showUpdateBooking, setShowUpdateBooking] = useState(false)
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

    const handleUpdate = (jobId: number) =>{
        console.log("jobId inside myOnUpdateFunction:", jobId);
        setSelectedBookingId(jobId);
        setShowUpdateBooking(true);
    }
    const handleUpdateComplete = () => {
        setShowUpdateBooking(false)
    }

    return (
        <>
            <Header/>
            {! showUpdateBooking ?<div className="bookingCont">
                    <AddBookingOption/> && <BookingTable2 onUpdate={(jobId : number) => handleUpdate(jobId) } />
            </div>  :
            <EditBookingForm jobId={selectedBookingId} doneWithEdit={handleUpdateComplete} />
            }
            {/*<Footer/>*/}
        </>
    )
}