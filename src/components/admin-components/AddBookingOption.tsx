import {useNavigate} from "react-router-dom";
import '../../App.css'

export default function AddBookingOption() {

    const goToCreateNewBooking = useNavigate()
    const goToUpdateBooking = useNavigate()

    return (
        <div className="addBookOptCon" style={styles.container}>
            <div className="h1" style={styles.h1}>
                <h1>Bookings</h1>
                <div className="Btns" style={styles.menuBtns}>
                    <button type="submit" style={styles.button} className="addBookOptBtn" onClick={() => {{goToCreateNewBooking(("/CreateNewBooking"))}}}>
                        Create new booking
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center' as "center",
        justifyContent: 'center' as "center",
        marginTop: '2%',
        color: '#000001',
    },
    menuBtns: {
        display: "flex",
        marginTop: '10%',
    },
    button: {
        backgroundColor: '#b3d9e3',
        // marginLeft: '5%',
        height: '60px',
        fontWeight: 'normal',
        width: "250px"
    },
    h1: {
        justifyContent: "center" as 'center',
        textAlign: "center" as 'center'
    }
}
