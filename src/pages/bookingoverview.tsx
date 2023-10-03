import Header from "../reusableComponents/header";
import AddBookingOption from "../components/addBookingOption";
import {BookingTable} from "../components/BookingTable";
// import CancelWithNumber from "../adminForms/cancelWithNumber";
// import CancelBooking from "../adminForms/cancelBooking";

export default function BookingPage() {
    return (
        <>
            <Header/>
            <AddBookingOption/>
            <BookingTable/>
        </>
    )
}