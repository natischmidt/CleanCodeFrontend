import {useNavigate} from "react-router-dom";
import '../App.css'

const AddBookingOption = () => {

    const goToCreateNewBooking = useNavigate()
    const goToUpdateBooking = useNavigate()
    const goToCancelBooking = useNavigate()

    return (
        <div className="addBookOptCon">
            <button type="submit" className="addBookOptBtn" onClick={() => {{goToCreateNewBooking(("/CreateNewBooking"))}}}>
                Create new Booking
            </button>
            <button type="submit" className="addBookOptBtn" onClick={() => {{goToUpdateBooking(("/GettingIdNumber"))}}}>
                Update Booking
            </button>
            <button type="submit" className="addBookOptBtn" onClick={() => {{goToCancelBooking(("/CancelWithNumber"))}}}>
                Cancel Booking
            </button>
        </div>
    );
};
export default AddBookingOption;